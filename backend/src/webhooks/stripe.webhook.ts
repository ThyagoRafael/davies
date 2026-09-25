import type { Request, Response } from "express";
import Stripe from "stripe";
import { prisma } from "../config/prisma.js";
import { stripe } from "../lib/stripe.js";
import { mapStripeStatus } from "../services/stripe/mapStatus.js";

export async function stripeWebhook(req: Request, res: Response) {
	const sig = req.headers["stripe-signature"] as string;

	let event: Stripe.Event;
	try {
		event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
	} catch {
		return res.status(400).send("Webhook signature inválida");
	}

	try {
		if (
			event.type === "payment_intent.succeeded" ||
			event.type === "payment_intent.payment_failed" ||
			event.type === "payment_intent.canceled"
		) {
			const intent = event.data.object as Stripe.PaymentIntent;
			const orderId = Number(intent.metadata.orderId);

			await prisma.$transaction(async (tx) => {
				await tx.payment.updateMany({
					where: { externalId: intent.id },
					data: { status: mapStripeStatus(intent) },
				});

				if (event.type === "payment_intent.succeeded") {
					await tx.order.update({
						where: { id: orderId },
						data: { status: "processing" },
					});
				}
			});
		}
	} catch (error) {
		console.error("Erro processando webhook Stripe:", error);
		return res.status(500).json({ received: false });
	}

	res.json({ received: true });
}
