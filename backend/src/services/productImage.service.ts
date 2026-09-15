import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { deleteFromCloudinary, uploadToCloudinary } from "../helpers/cloudinary.js";
import type { CloudinaryUploadResponse } from "../types/cloudinary.js";
import type { ImagesMeta } from "../validations/product.validation.js";

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
		} catch (error) {
			console.log(error);

			if (uploadedImages.length > 0) {
				await Promise.all(uploadedImages.map((image) => deleteFromCloudinary(image.public_id)));
			}

			throw new AppError("Erro no upload das imagens", 400);
		}
	};
}
