import axios from "axios";
import { api } from ".";
import { UnauthorizedError } from "../../errors/UnauthorizedError";
import { AppError } from "../../errors/AppError";
import type { UpdateAction } from "../../types/cartItem/updateAction";
import { getUserStorage } from "../../helpers/getUserStorage";

export async function addToCart(productId: number) {
	try {
		const user = getUserStorage();

		const response = await api.post(`/cart/items/${productId}`, null, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new AppError(error.message, 401);
		}

		if (axios.isAxiosError(error)) {
			throw new AppError(error.response?.data.message || "Erro ao buscar carrinho", error.response?.status || 500);
		}

		throw error;
	}
}

export async function updateQuantityItem(action: UpdateAction, productId: number) {
	try {
		const user = getUserStorage();

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
		if (error instanceof UnauthorizedError) {
			throw new AppError(error.message, 401);
		}

		if (axios.isAxiosError(error)) {
			throw new AppError(error.response?.data.message || "Erro ao buscar carrinho", error.response?.status || 500);
		}

		throw error;
	}
}

export async function deleteItem(productId: number) {
	try {
		const user = getUserStorage();

		const response = await api.delete(`/cart/items/${productId}`, {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new AppError(error.message, 401);
		}

		if (axios.isAxiosError(error)) {
			throw new AppError(error.response?.data.message || "Erro ao buscar carrinho", error.response?.status || 500);
		}

		throw error;
	}
}

export async function deleteAllItems() {
	try {
		const user = getUserStorage();

		const response = await api.delete("/cart/items", {
			headers: {
				Authorization: `Bearer ${user.token}`,
			},
		});

		return response.data;
	} catch (error) {
		if (error instanceof UnauthorizedError) {
			throw new AppError(error.message, 401);
		}

		if (axios.isAxiosError(error)) {
			throw new AppError(error.response?.data.message || "Erro ao buscar carrinho", error.response?.status || 500);
		}

		throw error;
	}
}
