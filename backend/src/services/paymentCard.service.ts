import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { stripe } from "../lib/stripe.js";
import { StripeCustomerService } from "./stripeCustomer.service.js";

export class PaymentCardService {
	private stripeCustomerService = new StripeCustomerService();

	async register(userId: number, holderName: string, paymentMethodId: string) {
		const stripeCustomerId = await this.stripeCustomerService.getOrCreate(userId);

		const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
			customer: stripeCustomerId,
		});

		if (!paymentMethod.card) {
			throw new AppError("Método de pagamento inválido", 400);
		}

		return prisma.userPaymentCard.create({
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
	}

	list(userId: number) {
		return prisma.userPaymentCard.findMany({
			where: {
				userId,
			},
		});
	}
}
