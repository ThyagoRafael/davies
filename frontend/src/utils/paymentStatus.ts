import type { PaymentStatus } from "../types/api/payment";

const PAYMENT_STATUS_LABELS: Record<PaymentStatus, string> = {
	pending: "Aguardando pagamento",
	paid: "Pagamento aprovado",
	failed: "Pagamento recusado",
	expired: "Pagamento expirado",
	canceled: "Pagamento cancelado",
};

export function getPaymentStatusLabel(status: PaymentStatus): string {
	return PAYMENT_STATUS_LABELS[status];
}
