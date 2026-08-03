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
