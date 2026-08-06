import { Customer } from "mercadopago";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { mercadoPagoClient } from "../lib/mercadoPago.js";
import { MercadoPagoCustomerService } from "./mercadoPagoCustomer.service.js";

export class PaymentCardService {
	private customerClient = new Customer(mercadoPagoClient);
	private mercadoPagoCustomerService = new MercadoPagoCustomerService();

	async register(userId: number, holderName: string, cardToken: string) {
		const mpCustomerId = await this.mercadoPagoCustomerService.getOrCreate(userId);

		const card = await this.customerClient.createCard({
			customerId: mpCustomerId,
			body: {
				token: cardToken,
			},
		});

		if (!card.id || !card.last_four_digits) {
			throw new AppError("Método de pagamento inválido", 400);
		}

		return prisma.userPaymentCard.create({
			data: {
				userId,
				holderName,
				cardToken: card.id,
				lastDigits: card.last_four_digits,
				cardBrand: card.payment_method?.id ?? "unknown",
				validateMonth: String(card.expiration_month),
				validateYear: String(card.expiration_year),
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
