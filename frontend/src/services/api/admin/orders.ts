import { api } from "..";
import type { OrdersData } from "../../../types/api/admin/orders";

export async function getOrdersData(): Promise<OrdersData> {
	const { data } = await api.get("/admin/orders");

	return data;
}
