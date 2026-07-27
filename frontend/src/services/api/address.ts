import { api } from ".";
import type { AddressFormData } from "../../types/api/address";

export async function getUserAddresses() {
	const response = await api.get("/addresses");

	return response.data;
}

export async function createAddress(addressData: AddressFormData) {
	const response = await api.post("/addresses", addressData);

	return response.data;
}
