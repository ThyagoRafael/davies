import { prisma } from "../config/prisma.js";

export class PaymentCardService {
	list(userId: number) {
		return prisma.userPaymentCard.findMany({
			where: {
				userId,
			},
		});
	}
}
