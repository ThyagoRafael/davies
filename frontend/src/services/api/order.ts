import { api } from ".";
import type { Order } from "../../types/api/order";

export async function finishOrder(addressId: number): Promise<Order> {
	const response = await api.post("/order/checkout", {
		addressId,
	});

	return response.data;
}

export async function getOrderById(orderId: number) {
	const response = await api.get(`/order/${orderId}`);

	return response.data;
}
