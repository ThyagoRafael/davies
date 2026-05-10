import axios from "axios";
import { api } from ".";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { AppError } from "../../errors/AppError";
import type { UpdateAction } from "../../types/cartItem/updateAction";

export async function updateQuantityItem(action: UpdateAction, productId: number) {
	try {
		const userStorage = localStorage.getItem("user");

		if (!userStorage) {
			throw new UnauthorizedError("Usuário não autenticado");
		}

		const user = JSON.parse(userStorage);

		const response = await api.put(
			`/cart/items/${productId}`,
			{ action },
			{
				headers: {
					Authorization: `Bearer ${user.token}`,
					"Content-Type": "application/json",
				},
			},
		);

		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error)) {
			throw new AppError(error.response?.data.message || "Erro ao buscar carrinho", error.response?.status || 500);
		}

		if (error instanceof UnauthorizedError) {
			throw new AppError(error.message, 401);
		}

		throw error;
	}
}
