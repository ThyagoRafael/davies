import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { isEmptyField } from "../helpers/isEmptyField.js";

export class ShippingAddressController {
	create = async (req: Request, res: Response) => {
		const newAddressData = {
			userId: req.user!.id,
			street: req.body.street,
			number: req.body.number,
			addressComplement: req.body.addressComplement,
			city: req.body.city,
			state: req.body.state,
			zipCode: req.body.zipCode,
		};

		const requiredFields = ["street", "number", "city", "state", "zipCode"] as const;
		const hasEmptyFields = requiredFields.some((field) => isEmptyField(newAddressData[field]));

		if (hasEmptyFields) {
			throw new AppError("Preencha todos os campos obrigatórios", 400);
		}

		const newAddress = await prisma.shippingAddress.create({ data: newAddressData });

		res.status(201).json(newAddress);
	};
}
