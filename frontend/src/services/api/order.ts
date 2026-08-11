import { api } from ".";
import type { Order } from "../../types/api/order";
import type { Payment } from "../../types/api/payment";
import type { UserCard } from "../../types/api/userCard";

export async function finishOrder(
	addressId: number,
	paymentMethod: "card" | "pix",
	cardId?: number,
): Promise<{ order: Order; card: UserCard; payment: Payment }> {
	const response = await api.post("/orders/checkout", {
		shippingAddressId: addressId,
		paymentMethod,
		userPaymentCardId: cardId ?? null,
	});

	return response.data;
}

export async function getOrderDataById(orderId: number) {
	const response = await api.get(`/orders/${orderId}`);
	console.log(response.data);

	return response.data;
}
