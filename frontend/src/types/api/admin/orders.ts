import type { OrderStatus } from "../order";

interface Order {
	user: string;
	id: number;
	status: OrderStatus;
	totalPrice: string;
	orderCode: string;
	createdAt: string;
}

export type OrdersData = Order[];
