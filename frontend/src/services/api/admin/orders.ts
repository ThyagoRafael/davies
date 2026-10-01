import { api } from "..";
import type { OrdersData } from "../../../types/api/admin/orders";
import type { OrderStatus } from "../../../types/api/order";

export async function getOrdersData(): Promise<OrdersData> {
	const { data } = await api.get("/admin/orders");

	return data;
}

export async function updateOrderStatus(orderId: number): Promise<{ newStatus: OrderStatus }> {
	const { data } = await api.patch(`/admin/orders/${orderId}`);

	return data;
}
