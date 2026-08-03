import { api } from ".";
import type { Order } from "../../types/api/order";

export async function finishOrder(addressId: number): Promise<Order> {
	const response = await api.post("/orders/checkout", {
		shippingAddressId: addressId,
	});

	return response.data;
}

export async function getOrderById(orderId: number) {
	const response = await api.get(`/orders/${orderId}`);

	return response.data;
}
