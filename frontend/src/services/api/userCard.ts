import { api } from ".";
import type { UserCard } from "../../types/api/userCard";

export async function getUserCards() {
	return [];
}

export async function createUserCard(data: { holderName: string; paymentMethodId: string }): Promise<UserCard> {
	const response = await api.post("/paymentCards", data);

	return response.data;
}
