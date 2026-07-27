import axios from "axios";
import { api } from ".";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { AppError } from "../../errors/AppError";

export async function getCartData() {
	try {
		const response = await api.get("/cart");

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
