import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { deleteFromCloudinary } from "../helpers/cloudinary.js";
export class ProductImagesController {
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
