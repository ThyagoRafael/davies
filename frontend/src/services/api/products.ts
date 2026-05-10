import { api } from "./index";

export async function getAllProducts() {
	const response = await api.get("/products");
	return response.data;
}
