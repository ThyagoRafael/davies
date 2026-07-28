import { prisma } from "../config/prisma.js";
import type { Request, Response } from "express";
import { stripe } from "../lib/stripe.js";
import { getOrCreateStripeCustomer } from "../services/stripeCustomer.service.js";
import { AppError } from "../errors/AppError.js";

export class PaymentCard {
	async register(req: Request, res: Response) {
		const userId = req.user!.id;
		const { holderName, paymentMethodId } = req.body;

		if (!holderName || !paymentMethodId) {
			throw new AppError("holderName e paymentMethodId são obrigatórios", 400);
		}

		const stripeCustomerId = await getOrCreateStripeCustomer(userId);

		const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
			customer: stripeCustomerId,
		});

		if (!paymentMethod.card) {
			throw new AppError("Método de pagamento inválido", 400);
		}

		const newPaymentCard = await prisma.userPaymentCard.create({
			data: {
				userId,
				holderName,
				cardToken: paymentMethod.id,
				lastDigits: paymentMethod.card.last4,
				cardBrand: paymentMethod.card.brand,
				validateMonth: paymentMethod.card.exp_month.toString(),
				validateYear: paymentMethod.card.exp_year.toString(),
			},
		});

		return res.status(201).json(newPaymentCard);
	}

	async list() {}
}
