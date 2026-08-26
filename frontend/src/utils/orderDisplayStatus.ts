import { getOrderStatusLabel } from "./orderStatus";
import { getPaymentStatusLabel } from "./paymentStatus";
import type { OrderStatus } from "../types/api/order";
import type { PaymentStatus } from "../types/api/payment";

export function getOrderDisplayStatus(orderStatus: OrderStatus, paymentStatus: PaymentStatus): string {
	if (paymentStatus === "pending" || paymentStatus === "failed" || paymentStatus === "expired") {
		return getPaymentStatusLabel(paymentStatus);
	}

	return getOrderStatusLabel(orderStatus);
}
