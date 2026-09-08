import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export class AdminOrderController {
	listOrders = async (req: Request, res: Response) => {
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
}
