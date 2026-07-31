import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { Prisma } from "../generated/prisma/client.js";
import { generateOrderCode } from "../utils/orderCode.js";

export class OrderController {
	checkout = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const shippingAddressId = Number(req.body.shippingAddressId);

		const order = await prisma.$transaction(async (tx) => {
			const cart = await tx.cart.findFirst({
				where: {
					userId,
					status: "active",
				},
				include: {
					cartItems: {
						include: {
							product: true,
						},
					},
				},
			});

			if (!cart) {
				throw new AppError("Carrinho não encontrado", 404);
			}

			if (cart.cartItems.length <= 0) {
				throw new AppError("Carrinho sem produtos", 400);
			}

			for (const item of cart.cartItems) {
				if (item.quantity > item.product.stock) {
					throw new AppError(`Estoque insuficiente para ${item.product.name}`, 400);
				}
			}

			const shippingAddress = await tx.shippingAddress.findUnique({
				where: {
					id: shippingAddressId,
					userId,
				},
			});

			if (!shippingAddress) {
				throw new AppError("Endereço não encontrado", 404);
			}

			const itemsPrice = cart.cartItems.reduce((acc, item) => {
				return acc.plus(item.product.price.mul(item.quantity));
			}, new Prisma.Decimal(0));

			const shippingPrice = new Prisma.Decimal(0);

			const createdOrder = await tx.order.create({
				data: {
					orderCode: "pending",
					status: "pending",
					shippingAddressId: shippingAddress.id,
					userId,
					itemsPrice,
					shippingPrice,
					totalPrice: itemsPrice.plus(shippingPrice),
				},
			});

			const order = await tx.order.update({
				where: { id: createdOrder.id },
				data: { orderCode: generateOrderCode(createdOrder.id) },
			});

			await tx.orderItem.createMany({
				data: cart.cartItems.map((item) => ({
					orderId: order.id,
					productId: item.productId,
					quantity: item.quantity,
					unitPrice: item.product.price,
					subtotal: item.product.price.mul(item.quantity),
				})),
			});

			for (const item of cart.cartItems) {
				await tx.product.update({
					where: {
						id: item.productId,
					},
					data: {
						stock: {
							decrement: item.quantity,
						},
					},
				});
			}

			await tx.cart.update({
				where: {
					id: cart.id,
				},
				data: {
					status: "finished",
				},
			});

			return order;
		});

		res.status(201).json(order);
	};

	list = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const orders = await prisma.order.findMany({
			where: {
				userId,
			},
		});

		res.status(200).json(orders);
	};

	detail = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		const order = await prisma.order.findFirst({
			where: {
				id: orderId,
				userId,
			},
		});

		if (!order) {
			throw new AppError("Pedido não encontrado", 404);
		}

		res.status(200).json(order);
	};

	shipOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "shipped",
			},
		});

		res.status(200).json({ message: "Pedido foi enviado" });
	};

	deliverOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "delivered",
			},
		});

		res.status(200).json({ message: "Pedido foi entregue" });
	};

	cancelOrder = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		await prisma.order.update({
			where: {
				id: orderId,
				userId,
			},
			data: {
				status: "canceled",
			},
		});

		res.status(200).json({ message: "Pedido cancelado com sucesso" });
	};
}
