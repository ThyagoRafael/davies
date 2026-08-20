import type { Payment } from "./payment";
import type { UserCard } from "./userCard";

type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

export interface Order {
	id: number;
	orderCode: string;
	status: OrderStatus;
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

interface OrdersListData {
	id: number;
	orderCode: string;
	status: OrderStatus;
	totalPrice: string;
	quantityItems: number;
	productsName: string[];
}

export type OrdersList = OrdersListData[];

export interface OrderItem {
	id: number;
	name: string;
	price: string;
	quantity: number;
	imageUrl: string | undefined;
}
