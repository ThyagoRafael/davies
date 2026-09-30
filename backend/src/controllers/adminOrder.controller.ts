import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import type { OrderStatus } from "../generated/prisma/enums.js";

export class AdminOrderController {
	list = async (req: Request, res: Response) => {
		const orders = await prisma.order.findMany({
			select: {
				id: true,
				orderCode: true,
				status: true,
				createdAt: true,
				totalPrice: true,

				user: {
					select: {
						name: true,
					},
				},
			},
			orderBy: {
				createdAt: "desc",
			},
		});

		const formattedOrders = orders.map((order) => ({
			...order,
			user: order.user.name,
		}));

		res.status(200).json(formattedOrders);
	};

	updateStatus = async (req: Request, res: Response) => {
		const orderId = Number(req.params.orderId);

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

		let status: OrderStatus;

		switch (order.status) {
			case "pending":
				status = "processing";
				break;

			case "processing":
				status = "shipped";
				break;

			case "shipped":
				status = "delivered";
				break;

			case "delivered":
				throw new AppError("Pedido já foi entregue", 400);

			case "canceled":
				throw new AppError("Pedido já foi cancelado", 400);

			default:
				throw new AppError("Status do pedido inválido", 400);
		}

		const updatedStatus = await prisma.order.update({
			where: { id: orderId },
			data: {
				status,
			},
			select: {
				status: true,
			},
		});

		res.status(200).json({ newStatus: updatedStatus.status });
	};
}
