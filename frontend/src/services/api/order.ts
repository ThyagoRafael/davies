import { api } from ".";

export async function finishOrder(addressId: number) {
	const response = await api.post("/order/checkout", {
		addressId,
	});

	return response.data;
}
