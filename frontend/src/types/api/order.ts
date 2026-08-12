import type { Payment } from "./payment";
import type { UserCard } from "./userCard";

type StatusOrder = "pending" | "shipped" | "delivered" | "canceled";

export interface Order {
	id: number;
	orderCode: string;
	status: StatusOrder;
	shippingAddressId: number;
	itemsPrice: string;
	shippingPrice: string;
	totalPrice: string;
}

export interface OrderData {
	order: Order;
	card: UserCard;
	payment: Payment;
	clientSecret?: string;
}
