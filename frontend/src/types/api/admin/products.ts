interface ProductsListData {
	imageUrl: string;
	name: string;
	price: string;
	stock: number;
	id: number;
}

export type ProductsList = ProductsListData[];
