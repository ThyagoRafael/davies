import type { Address } from "./address";
import type { Payment } from "./payment";
import type { UserCard, UserCardData } from "./userCard";

export type OrderStatus = "pending" | "shipped" | "delivered" | "canceled";

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
	unitPrice: string;
	quantity: number;
	imageUrl: string | undefined;
}

interface OrderDataDetails {
	id: number;
	orderCode: string;
	status: OrderStatus;
	itemsPrice: string;
	shippingPrice: string;
	totalPrice: string;
	createdAt: string;
	deliveredAt: string;
	shippedAt: string;
}

export interface OrderDetails {
	order: OrderDataDetails;
	card: UserCardData;
	payment: Payment;
	address: Address;
	orderItems: OrderItem[];
}
