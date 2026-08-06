import type { Request, Response } from "express";
import { AppError } from "../errors/AppError.js";
import { PaymentCardService } from "../services/paymentCard.service.js";

export class PaymentCardController {
	private paymentCardService = new PaymentCardService();

	register = async (req: Request, res: Response) => {
		const userId = req.user!.id;
		const { holderName, cardToken } = req.body;

		if (!holderName || !cardToken) {
			throw new AppError("holderName e paymentMethodId são obrigatórios", 400);
		}

		const newPaymentCard = await this.paymentCardService.register(userId, holderName, cardToken);

		return res.status(201).json(newPaymentCard);
	};

	list = async (req: Request, res: Response) => {
		const userId = req.user!.id;

		const paymentCards = await this.paymentCardService.list(userId);

		res.status(200).json(paymentCards);
	};
}
