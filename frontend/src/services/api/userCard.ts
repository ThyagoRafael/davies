import { api } from ".";
import type { UserCard } from "../../types/api/userCard";

export async function getUserCards() {
	const response = await api.get("/paymentCards");

	return response.data;
}

export async function createUserCard(data: { holderName: string; paymentMethodId: string }): Promise<UserCard> {
	const response = await api.post("/paymentCards", data);

	return response.data;
}
