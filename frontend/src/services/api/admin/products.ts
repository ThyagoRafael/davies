import { api } from "..";
import type {
	CreateProductData,
	ProductData,
	ProductsList,
	ToggleProductStatusData,
	UpdateProductData,
} from "../../../types/api/admin/products";

export async function getProductsList(): Promise<ProductsList> {
	const { data } = await api.get("/admin/products");

	return data;
}

export async function getProductData(productId: number): Promise<ProductData> {
	const { data } = await api.get(`/admin/products/${productId}`);

	return data;
}

export async function createProduct(body: FormData): Promise<CreateProductData> {
	const { data } = await api.post("/admin/products", body);

	return data;
}

export async function updateProduct(productId: number, body: FormData): Promise<UpdateProductData> {
	const { data } = await api.patch(`/admin/products/${productId}`, body);

	return data;
}

export async function toggleProductStatus(productId: number): Promise<ToggleProductStatusData> {
	const { data } = await api.patch(`/admin/products/${productId}/status`);

	return data;
}
