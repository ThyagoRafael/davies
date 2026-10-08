interface ProductsListData {
	imageUrl: string;
	name: string;
	price: string;
	stock: number;
	id: number;
}

export type ProductsList = ProductsListData[];

export interface ProductData {
	name: string;
	description: string;
	price: string;
	stock: number;
	productImages: {
		position: number;
		id: number;
		url: string;
	}[];
}

export interface CreateProductData {
	name: string;
	price: string;
	stock: number;
	productImages: { url: string }[];
	id: number;
}
