import { getOrderStatusLabel } from "./orderStatus";
import { getPaymentStatusLabel } from "./paymentStatus";
import type { OrderStatus } from "../types/api/order";
import type { PaymentStatus } from "../types/api/payment";

function formatDate(date: string): string {
	return new Date(date).toLocaleDateString("pt-BR");
}

export function getOrderDisplayStatus(
	orderStatus: OrderStatus,
	paymentStatus: PaymentStatus,
	deliveredAt: string | null,
): string {
	if (paymentStatus === "pending" || paymentStatus === "failed" || paymentStatus === "expired") {
		return getPaymentStatusLabel(paymentStatus);
	}

	if (orderStatus === "delivered" && deliveredAt) {
		return `Entregue em ${formatDate(deliveredAt)}`;
	}

	return getOrderStatusLabel(orderStatus);
}
