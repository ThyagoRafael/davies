import type { OrderStatus } from "../types/api/order";

const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
	pending: "Pedido em processamento",
	shipped: "Pedido enviado",
	delivered: "Pedido entregue",
	canceled: "Pedido cancelado",
};

export function getOrderStatusLabel(status: OrderStatus): string {
	return ORDER_STATUS_LABELS[status];
}
