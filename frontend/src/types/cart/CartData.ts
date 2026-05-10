interface CartProducts {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageUrl: string;
	quantity: number;
	subtotal: string;
}

export interface CartData {
	items: CartProducts[];
	total: string;
}
