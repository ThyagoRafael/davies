import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { uploadToCloudinary, deleteFromCloudinary } from "../helpers/cloudinary.js";
import { type CloudinaryUploadResponse } from "../types/cloudinary.js";

export class ProductImagesController {
	upload = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);
		const files = req.files as Express.Multer.File[];
		const tempIds: string[] = Array.isArray(req.body.tempIds)
			? req.body.tempIds
			: req.body.tempIds
				? [req.body.tempIds]
				: [];
		let uploadedImages: CloudinaryUploadResponse[] = [];

		if (files.length !== tempIds.length) {
			throw new AppError("Arquivos e tempIds não correspondem", 400);
		}

		try {
			const results = await Promise.all(
				files.map((file) => {
					return uploadToCloudinary(file.buffer);
				}),
			);

			uploadedImages = results;

			const lastImage = await prisma.productImage.findFirst({
				where: { productId },
				orderBy: { position: "desc" },
				select: { position: true },
			});

			const startPosition = lastImage ? lastImage.position + 1 : 0;

			const createdImages: { tempId: string; id: number }[] = [];

			for (const [index, file] of results.entries()) {
				const tempId = tempIds[index];

				if (!tempId) {
					throw new AppError("tempId não encontrado para o arquivo", 400);
				}

				const image = await prisma.productImage.create({
					data: {
						url: file.secure_url,
						publicId: file.public_id,
						position: startPosition + index,
						productId,
					},
				});

				createdImages.push({
					tempId,
					id: image.id,
				});
			}

			res.status(201).json(createdImages);
		} catch (error) {
			console.log(error);

			if (uploadedImages.length > 0) {
				await Promise.all(uploadedImages.map((image) => deleteFromCloudinary(image.public_id)));
			}

			throw new AppError("Erro no upload das imagens", 400);
		}
	};

	update = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);
		const allResults: Record<string, string> = {};

		const product = await prisma.product.findUnique({ where: { id: productId } });

		if (!product) {
			throw new AppError("O produto não foi encontrado", 404);
		}

		const destroy = Array.isArray(req.body.destroy) ? (req.body.destroy as number[]) : [];

		const reorder = Array.isArray(req.body.reorder) ? (req.body.reorder as { id: number; position: number }[]) : [];

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

			allResults.delete = "As imagens foram deletadas com sucesso";
		}

		if (reorder.length > 0) {
			const ids = reorder.map((image) => image.id);

			const count = await prisma.productImage.count({
				where: {
					id: { in: ids },
					productId,
				},
			});

			if (count !== reorder.length) {
				throw new AppError("Reorder contém imagens inválidas", 400);
			}

			await prisma.$transaction(async (tx) => {
				for (const image of reorder) {
					await tx.productImage.update({
						where: { id: image.id },
						data: { position: image.position * -1 - 1000 },
					});
				}

				for (const image of reorder) {
					await tx.productImage.update({
						where: { id: image.id },
						data: { position: image.position },
					});
				}
			});

			allResults.reorder = "As imagens foram reordenadas com sucesso";
		}

		res.status(200).json(allResults);
	};
}
