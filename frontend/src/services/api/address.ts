import { api } from ".";

export async function getUserAddresses() {
	const response = await api.get("/addresses");

	return response.data;
}
