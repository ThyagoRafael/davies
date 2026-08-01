export interface CartProduct {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageUrl: string;
	quantity: number;
	subtotal: string;
}

export interface CartData {
	items: CartProduct[];
	shippingPrice: string;
	itemsPrice: string;
	totalPrice: string;
}
