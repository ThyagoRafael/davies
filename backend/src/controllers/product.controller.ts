import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

import { AppError } from "../errors/AppError.js";

export class ProductController {
	getAll = async (req: Request, res: Response) => {
		const products = await prisma.product.findMany({
			omit: {
				description: true,
				stock: true,
			},
			orderBy: { id: "asc" },
			include: {
				productImages: {
					where: { position: 0 },
					select: {
						url: true,
					},
				},
			},
		});

		res.status(200).json(products);
	};

	getOne = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);

		const product = await prisma.product.findUnique({
			where: { id: productId },
			include: {
				productImages: {
					orderBy: { position: "asc" },
				},
			},
		});

		if (!product) {
			throw new AppError("Produto não encontrado", 404);
		}

		res.status(200).json(product);
	};
}
