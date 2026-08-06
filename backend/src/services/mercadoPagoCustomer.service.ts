import { Customer } from "mercadopago";
import { prisma } from "../config/prisma.js";
import { AppError } from "../errors/AppError.js";
import { mercadoPagoClient } from "../lib/mercadoPago.js";

export class MercadoPagoCustomerService {
	private customerClient = new Customer(mercadoPagoClient);

	async getOrCreate(userId: number): Promise<string> {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { email: true, name: true, mpCustomerId: true },
		});

		if (!user) {
			throw new AppError("Usuário não encontrado", 404);
		}

		if (user.mpCustomerId) {
			return user.mpCustomerId;
		}

		const existing = await this.customerClient.search({
			options: { email: user.email },
		});

		let customerId = existing.results?.[0]?.id;

		if (!customerId) {
			const [firstName = "", ...rest] = (user.name ?? "").split(" ");

			const created = await this.customerClient.create({
				body: {
					email: user.email,
					first_name: firstName,
					last_name: rest.join(" "),
				},
			});
			customerId = created.id;
		}

		if (!customerId) {
			throw new AppError("Não foi possível criar o cliente no Mercado Pago", 500);
		}

		await prisma.user.update({
			where: { id: userId },
			data: { mpCustomerId: customerId },
		});

		return customerId;
	}
}
