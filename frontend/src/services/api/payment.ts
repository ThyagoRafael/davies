import { api } from ".";
import type { PaymentStatus } from "../../types/api/payment";

export async function getPaymentStatus(orderId: number): Promise<{ status: PaymentStatus }> {
	const { data } = await api.get(`/payments/${orderId}/status`);
	return data;
}
