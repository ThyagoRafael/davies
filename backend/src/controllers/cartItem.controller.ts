import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { Prisma } from "../generated/prisma/client.js";

type Action = "increment" | "decrement";

export class CartItemController {
	addToCart = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const productId = Number(req.params.productId);

		let cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
		});

		if (!cart) {
			cart = await prisma.cart.create({
				data: {
					status: "active",
					userId,
				},
			});
		}

		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
		});

		if (!product) {
			throw new Error("O produto não existe");
		}

		await prisma.cartItem.upsert({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
			update: {
				quantity: {
					increment: 1,
				},
			},
			create: {
				cartId: cart.id,
				productId,
				quantity: 1,
				subtotal: product.price,
			},
		});

		res.status(201).json({ message: "Produto adicionado ao carrinho" });
	};

	updateCartItem = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const productId = Number(req.params.productId);
		const action: Action = req.body.action;
		const actionValues = ["increment", "decrement"];

		if (!actionValues.includes(action)) {
			throw new AppError("Ação não reconhecida");
		}

		const cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
			include: {
				cartItems: {
					include: {
						product: {
							select: {
								price: true,
								stock: true,
							},
						},
					},
				},
			},
		});

		if (!cart) {
			throw new AppError("Erro no carrinho", 400);
		}

		const cartItem = cart.cartItems.find((item) => item.productId === productId);

		if (!cartItem) {
			throw new AppError("Item não encontrado", 404);
		}

		if (action === "decrement" && cartItem.quantity <= 1) {
			throw new AppError("Item já está com a quantidade mínima", 400);
		}

		if (action === "increment" && cartItem.quantity >= cartItem.product.stock) {
			throw new AppError("Item já está com a quantidade máxima", 400);
		}

		const newQuantity = action === "increment" ? cartItem.quantity + 1 : cartItem.quantity - 1;

		const product = await prisma.product.findUnique({
			where: {
				id: productId,
			},
			select: {
				price: true,
			},
		});

		if (!product) {
			throw new Error("Produto não encontrado");
		}

		const newSubtotal = product.price.mul(newQuantity);

		await prisma.cartItem.update({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
			data: {
				quantity: newQuantity,
				subtotal: newSubtotal,
			},
		});

		const updatedCart = await prisma.cart.findUnique({
			where: {
				id: cart.id,
			},
			include: {
				cartItems: {
					include: {
						product: {
							select: { price: true },
						},
					},
				},
			},
		});

		const total = updatedCart!.cartItems.reduce((acc, item) => {
			return acc.plus(item.product.price.mul(item.quantity));
		}, new Prisma.Decimal(0));

		res.status(200).json({ quantity: newQuantity, subtotal: newSubtotal, total });
	};

	deleteCartItem = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const productId = Number(req.params.productId);

		const cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
			include: {
				cartItems: {
					include: {
						product: {
							select: {
								price: true,
							},
						},
					},
				},
			},
		});

		if (!cart) {
			throw new AppError("Erro no carrinho");
		}

		await prisma.cartItem.delete({
			where: {
				cartId_productId: {
					cartId: cart.id,
					productId,
				},
			},
		});

		const updatedCart = await prisma.cart.findUnique({
			where: {
				id: cart.id,
			},
			include: {
				cartItems: {
					include: {
						product: {
							select: { price: true },
						},
					},
				},
			},
		});

		const total = updatedCart!.cartItems.reduce((acc, item) => {
			return acc.plus(item.product.price.mul(item.quantity));
		}, new Prisma.Decimal(0));

		res.status(200).json({ message: "Produto deletado do carrinho", total });
	};

	deleteAllCartItems = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const cart = await prisma.cart.findFirst({
			where: {
				userId,
				status: "active",
			},
			include: {
				cartItems: true,
			},
		});

		if (!cart) {
			throw new AppError("Erro no carrinho");
		}

		if (cart.cartItems.length === 0) {
			return res.status(200).json({ message: "Não há itens no carrinho" });
		}

		await prisma.cartItem.deleteMany({
			where: {
				cartId: cart.id,
			},
		});

		res.status(200).json({ message: "Todos os itens do carrinho foram removidos" });
	};
}
