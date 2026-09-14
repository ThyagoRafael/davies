import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";

export class AdminProductController {
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

	list = async (req: Request, res: Response) => {
		const products = await prisma.product.findMany({
			select: {
				id: true,
				name: true,
				stock: true,
				price: true,

				productImages: {
					orderBy: {
						position: "asc",
					},
					take: 1,
					select: {
						url: true,
					},
				},
			},
		});

		const formattedProducts = products.map((product) => {
			const { productImages, ...productData } = product;

			return {
				...productData,
				imageUrl: productImages[0]?.url ?? "",
			};
		});

		res.status(200).json(formattedProducts);
	};

	details = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);

		const product = await prisma.product.findUnique({
			where: { id: productId },
			select: {
				name: true,
				description: true,
				price: true,
				stock: true,

				productImages: {
					orderBy: { position: "asc" },
					select: {
						id: true,
						url: true,
						position: true,
					},
				},
			},
		});

		if (!product) {
			throw new AppError("Produto não encontrado", 404);
		}

		res.status(200).json(product);
	};

	update = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);
		const { name, description, price, stock } = req.body;
		let updateData = {};

		const product = await prisma.product.findUnique({ where: { id: productId } });

		if (!product) {
			throw new AppError("Produto não encontrado", 404);
		}

		if (name) updateData = { name };
		if (description) updateData = { ...updateData, description };
		if (price) updateData = { ...updateData, price };
		if (stock) updateData = { ...updateData, stock };

		if (Object.values(updateData).length === 0) {
			throw new AppError("Nenhuma ", 400);
		}

		const updatedProduct = await prisma.product.update({ where: { id: product.id }, data: updateData });

		res.status(200).json(updatedProduct);
	};

	destroy = async (req: Request, res: Response) => {
		const productId = Number(req.params.productId);

		const product = await prisma.product.findUnique({ where: { id: productId } });

		if (!product) {
			throw new AppError("Produto não encontrado", 404);
		}

		const deletedProductId = await prisma.product.delete({ where: { id: product.id }, select: { id: true } });

		res.status(200).json(deletedProductId);
	};
}
