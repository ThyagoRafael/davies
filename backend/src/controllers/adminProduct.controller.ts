import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

export class AdminProductController {
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

		res.status(200).json(products);
	};
}
