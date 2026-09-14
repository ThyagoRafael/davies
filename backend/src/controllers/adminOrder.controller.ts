import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import type { OrderStatus } from "../generated/prisma/enums.js";
import { AppError } from "../errors/AppError.js";

export class AdminOrderController {
	list = async (req: Request, res: Response) => {
		const orders = await prisma.order.findMany({
			select: {
				id: true,
				orderCode: true,
				status: true,
				totalPrice: true,
				createdAt: true,
				updatedAt: true,

				shippingAddress: {
					omit: {
						id: true,
						userId: false,
					},
				},

				user: {
					select: {
						name: true,
						cpf: true,
					},
				},
			},
		});

		res.status(200).json(orders);
	};

	updateStatus = async (req: Request, res: Response) => {
		const orderId = Number(req.params.orderId);
		const { status } = req.body as { status: OrderStatus };

		const order = await prisma.order.findUnique({
			where: {
				id: orderId,
			},
			select: {
				status: true,
			},
		});

		if (!order) {
			throw new AppError("Pedido não encontrado", 404);
		}

		if (order.status === "shipped" && (status === "pending" || status === "shipped")) {
			throw new AppError("Não é possível voltar o status do pedido", 400);
		}

		if (order.status === "delivered") {
			throw new AppError("Pedido já foi entregue", 400);
		}

		if (order.status === "canceled") {
			throw new AppError("Pedido já foi cancelado", 400);
		}

		const updatedStatus = await prisma.order.update({
			where: { id: orderId },
			data: {
				status,
			},
			select: {
				id: true,
				status: true,
			},
		});

		res.status(200).json(updatedStatus);
	};
}
