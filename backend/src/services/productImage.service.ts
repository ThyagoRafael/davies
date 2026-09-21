import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import type { ProductImage } from "../generated/prisma/client.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../helpers/cloudinary.js";
import type { CloudinaryUploadResponse } from "../types/cloudinary.js";
import type { ImagesAction, ImagesMeta } from "../validations/product.validation.js";

export class ProductImagesService {
	upload = async (productId: number, files: Express.Multer.File[], imagesMeta: ImagesMeta) => {
		let uploadedImages: CloudinaryUploadResponse[] = [];

		try {
			const results = await Promise.all(
				files.map((file) => {
					return uploadToCloudinary(file.buffer);
				}),
			);

			uploadedImages = results;

			await Promise.all(
				results.map((uploaded, index) => {
					const file = files[index];

					if (!file) {
						throw new AppError("Arquivo não encontrado durante o upload", 400);
					}

					const meta = imagesMeta.find((meta) => meta.tempId === file.fieldname);

					if (!meta) {
						throw new AppError(`Metadados não encontrados para o arquivo ${file.fieldname}`, 400);
					}

					return prisma.productImage.create({
						data: {
							url: uploaded.secure_url,
							publicId: uploaded.public_id,
							position: meta.position,
							productId,
						},
					});
				}),
			);
		} catch {
			if (uploadedImages.length > 0) {
				await Promise.all(uploadedImages.map((image) => deleteFromCloudinary(image.public_id)));
			}

			throw new AppError("Erro no upload das imagens", 400);
		}
	};

	update = async (productId: number, files: Express.Multer.File[], imagesAction: ImagesAction) => {
		const { destroy, reorder } = imagesAction;

		const newImages = reorder.filter((image): image is { tempId: string; position: number } => "tempId" in image);

		// 1. Deletar imagens
		if (destroy.length > 0) {
			const images = await prisma.productImage.findMany({
				where: {
					id: { in: destroy },
					productId,
				},
			});

			if (images.length !== destroy.length) {
				throw new AppError("Uma ou mais imagens não pertencem ao produto", 400);
			}

			await prisma.productImage.deleteMany({
				where: {
					id: { in: destroy },
					productId,
				},
			});

			await Promise.all(images.map((image) => deleteFromCloudinary(image.publicId)));
		}

		// 2. Validar os arquivos das novas imagens
		const fileTempIds = new Set(files.map((file) => file.fieldname));

		for (const image of newImages) {
			if (!fileTempIds.has(image.tempId)) {
				throw new AppError(`Arquivo não encontrado para a imagem ${image.tempId}`, 400);
			}
		}

		const metaTempIds = new Set(newImages.map((image) => image.tempId));

		for (const file of files) {
			if (!metaTempIds.has(file.fieldname)) {
				throw new AppError(`Metadados não encontrados para o arquivo ${file.fieldname}`, 400);
			}
		}

		// 3. Validar cobertura do reorder ANTES de subir qualquer arquivo
		const existingImages = await prisma.productImage.findMany({
			where: { productId, id: { notIn: destroy } },
			select: { id: true },
		});

		const existingIds = new Set(existingImages.map((image) => image.id));

		const reorderExistingIds = new Set(
			reorder.filter((image): image is { id: number; position: number } => "id" in image).map((image) => image.id),
		);

		const sameSize = existingIds.size === reorderExistingIds.size;
		const allCovered = [...existingIds].every((id) => reorderExistingIds.has(id));

		if (existingIds.size + newImages.length !== reorder.length || !sameSize || !allCovered) {
			throw new AppError("O reorder precisa incluir todas as imagens restantes do produto", 400);
		}

		// 4. Só agora faz upload
		const createdImages = await this.uploadNewImages(productId, files, newImages);

		const tempIdToId = new Map(createdImages.map((image) => [image.tempId, image.id]));

		const finalReorder = reorder.map((image) => {
			if ("id" in image) {
				return image;
			}

			const id = tempIdToId.get(image.tempId);

			if (!id) {
				throw new AppError(`Não foi possível encontrar a imagem ${image.tempId}`, 400);
			}

			return {
				id,
				position: image.position,
			};
		});

		// 5. Reorder final
		if (finalReorder.length > 0) {
			await prisma.$transaction(async (tx) => {
				for (const image of finalReorder) {
					await tx.productImage.update({
						where: { id: image.id },
						data: { position: -image.id - 1000000 },
					});
				}

				for (const image of finalReorder) {
					await tx.productImage.update({
						where: { id: image.id },
						data: { position: image.position },
					});
				}
			});
		}
	};

	uploadNewImages = async (productId: number, files: Express.Multer.File[], imagesMeta: ImagesMeta) => {
		const uploadedImages: CloudinaryUploadResponse[] = [];

		try {
			const results = await Promise.all(files.map((file) => uploadToCloudinary(file.buffer)));

			uploadedImages.push(...results);

			const createdImages = await prisma.$transaction(async (tx) => {
				return await Promise.all(
					results.map(async (uploaded, index) => {
						const file = files[index];

						if (!file) {
							throw new AppError("Arquivo não encontrado durante o upload", 400);
						}

						const meta = imagesMeta.find((image) => image.tempId === file.fieldname);

						if (!meta) {
							throw new AppError(`Metadados não encontrados para o arquivo ${file.fieldname}`, 400);
						}

						const image = await tx.productImage.create({
							data: {
								url: uploaded.secure_url,
								publicId: uploaded.public_id,
								position: meta.position * -1 - 1000,
								productId,
							},
						});

						return {
							tempId: meta.tempId,
							id: image.id,
							position: meta.position * -1 - 1000,
						};
					}),
				);
			});

			return createdImages;
		} catch (error) {
			console.log(error);

			if (uploadedImages.length > 0) {
				await Promise.all(uploadedImages.map((image) => deleteFromCloudinary(image.public_id)));
			}

			throw new AppError("Erro no upload das imagens", 400);
		}
	};

	deleteAllImages = async (productImages: Pick<ProductImage, "id" | "publicId">[]) => {
		try {
			if (productImages.length <= 0) return;

			await Promise.all(productImages.map((image) => deleteFromCloudinary(image.publicId)));
		} catch {
			throw new AppError("Erro na deleção das imagens", 400);
		}
	};
}
