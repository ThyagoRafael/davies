import { api } from ".";
import type { OrderData } from "../../types/api/order";

export async function finishOrder(
	addressId: number,
	paymentMethod: "card" | "pix",
	cardId?: number,
): Promise<OrderData> {
	const response = await api.post("/orders/checkout", {
		shippingAddressId: addressId,
		paymentMethod,
		userPaymentCardId: cardId ?? null,
	});

	return response.data;
}

export async function getOrderDataById(orderId: number): Promise<OrderData> {
	const response = await api.get(`/orders/${orderId}`);

	return response.data;
}
