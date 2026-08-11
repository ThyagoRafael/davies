import Stripe from "stripe";
import type { PaymentStatus } from "../../generated/prisma/enums.js";

export function mapStripeStatus(intent: Stripe.PaymentIntent): PaymentStatus {
	switch (intent.status) {
		case "succeeded":
			return "paid";
		case "processing":
		case "requires_action":
		case "requires_confirmation":
		case "requires_capture":
			return "pending";
		case "requires_payment_method":
			return "failed";
		case "canceled":
			return intent.cancellation_reason === "abandoned" ? "expired" : "canceled";
		default:
			return "pending";
	}
}
