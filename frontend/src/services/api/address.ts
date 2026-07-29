import { api } from ".";
import type { Address, AddressFormData } from "../../types/api/address";

export async function getUserAddresses(): Promise<Address[]> {
	const response = await api.get("/addresses");

	return response.data;
}

export async function createAddress(addressData: AddressFormData): Promise<Address> {
	const response = await api.post("/addresses", addressData);

	return response.data;
}

export async function updateAddress(addressId: number, addressData: AddressFormData): Promise<Address> {
	const response = await api.patch(`/addresses/${addressId}`, addressData);

	return response.data;
}

export async function deleteAddress(addressId: number): Promise<{ message: string }> {
	const response = await api.delete(`/addresses/${addressId}`);

	return response.data;
}
