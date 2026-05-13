import axios from "axios";
import { api } from ".";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { AppError } from "../../errors/AppError";
import { getUserStorage } from "../../helpers/getUserStorage";

export async function getCartData() {
	try {
		const user = getUserStorage();

		const response = await api.get("/cart", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

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
