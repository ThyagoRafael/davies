import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { stripe } from "../lib/stripe.js";
import { mapStripeStatus } from "../services/stripe/mapStatus.js";

export class PaymentController {
	async getStatus(req: Request, res: Response) {
		const userId = req.user!.id;
		const orderId = Number(req.params.orderId);

		const payment = await prisma.payment.findFirst({
			where: { orderId, order: { userId } },
		});

		if (!payment) throw new AppError("Pagamento não encontrado", 404);
		if (!payment.externalId) {
			return res.json({ status: payment.status });
		}

		const intent = await stripe.paymentIntents.retrieve(payment.externalId);
		const newStatus = mapStripeStatus(intent);

		if (newStatus !== payment.status) {
			await prisma.payment.update({ where: { id: payment.id }, data: { status: newStatus } });
		}

		res.json({ status: newStatus });
	}
}
