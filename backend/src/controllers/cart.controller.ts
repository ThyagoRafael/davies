import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { Prisma } from "../generated/prisma/client.js";

export class CartController {
	getProducts = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
			include: {
				cartItems: {
					orderBy: {
						createdAt: "desc",
					},
					include: {
						product: {
							include: {
								productImages: {
									where: {
										position: 0,
									},
								},
							},
						},
					},
				},
			},
		});

		if (!cart) {
			return res.status(200).json({
				items: [],
				total: 0,
			});
		}

		const items = cart.cartItems.map((item) => {
			return {
				id: item.product.id,
				name: item.product.name,
				price: item.product.price,
				stock: item.product.stock,
				imageUrl: item.product.productImages[0]?.url,
				quantity: item.quantity,
				subtotal: item.subtotal,
			};
		});

		const total = cart.cartItems.reduce((acc, item) => {
			return acc.plus(item.product.price.mul(item.quantity));
		}, new Prisma.Decimal(0));

		res.status(200).json({ items, total });
	};

	finishCart = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
		});

		if (!cart) {
			throw new AppError("Erro ao tentar finalizar o carrinho");
		}

		await prisma.cart.update({
			where: {
				id: cart.id,
			},
			data: {
				status: "finished",
			},
		});

		res.status(200).json({ message: "Carrinho finalizado com sucesso" });
	};
}
