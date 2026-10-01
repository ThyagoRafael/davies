import { api } from "..";
import type { ProductsList } from "../../../types/api/admin/products";

export async function getProductsList(): Promise<ProductsList> {
	const { data } = await api.get("/admin/products");

	return data;
}
