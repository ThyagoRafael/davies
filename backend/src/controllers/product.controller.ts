import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

import { AppError } from "../errors/AppError.js";

export class ProductController {
	create = async (req: Request, res: Response) => {
		const bodyData = {
			name: req.body.name,
			description: req.body.description,
			price: req.body.price,
			stock: req.body.stock,
		};

		if (Object.values(bodyData).some((value) => value === "" || value === undefined || value === null)) {
			throw new AppError("Todos os campos são obrigatórios", 400);
		}

		if (bodyData.price <= 0) {
			throw new AppError("O preço deve ser maior que 0", 400);
		}

		if (bodyData.stock <= 0) {
			throw new AppError("O estoque deve ser maior que 0", 400);
		}

		const newProduct = await prisma.product.create({ data: bodyData });

		res.status(201).json(newProduct);
	};

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
