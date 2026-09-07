import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export class DashboardController {
	overview = async (req: Request, res: Response) => {
		const totalSales = await prisma.order.aggregate({
			where: {
				status: "delivered",
			},
			_sum: {
				totalPrice: true,
			},
		});

		const totalOrders = await prisma.order.count();

		const totalProductStock = await prisma.product.aggregate({
			_sum: {
				stock: true,
			},
		});

		res.status(200).json({
			totalSales: totalSales._sum.totalPrice,
			totalOrders,
			totalProductStock: totalProductStock._sum.stock,
		});
	};
}
