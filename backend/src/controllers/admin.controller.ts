import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export class AdminController {
	dashboardOverview = async (req: Request, res: Response) => {
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

	dashboardAlert = async (req: Request, res: Response) => {
		const outOfStockProducts = await prisma.product.count({
			where: {
				stock: 0,
			},
		});

		const lowStockProducts = await prisma.product.count({
			where: {
				stock: {
					lte: 5,
				},
			},
		});

		const pendingOrders = await prisma.order.count({
			where: {
				status: "pending",
			},
		});

		res.status(200).json({ outOfStockProducts, lowStockProducts, pendingOrders });
	};

	dashboardRecentOrders = async (req: Request, res: Response) => {
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
			take: 5,
		});

		const formattedOrders = orders.map((order) => ({
			...order,
			user: order.user.name,
		}));

		res.status(200).json(formattedOrders);
	};

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
