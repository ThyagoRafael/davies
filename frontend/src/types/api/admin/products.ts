type ProductStatus = "active" | "inactive";

interface ProductsListData {
	imageUrl: string;
	status: ProductStatus;
	name: string;
	price: string;
	stock: number;
	id: number;
}

export type ProductsList = ProductsListData[];

export interface ProductData {
	id: number;
	name: string;
	description: string;
	price: string;
	stock: number;
	status: ProductStatus;
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

export interface UpdateProductData {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageUrl: string;
}

export interface ToggleProductStatusData {
	id: number;
	status: ProductStatus;
}
