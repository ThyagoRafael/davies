import type { OrderStatus } from "../types/api/order";

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
	pending: "Em processamento",
	shipped: "Enviado",
	delivered: "Entregue",
	canceled: "Cancelado",
};

export function getOrderStatusLabel(status: OrderStatus): string {
	return ORDER_STATUS_LABELS[status];
}
