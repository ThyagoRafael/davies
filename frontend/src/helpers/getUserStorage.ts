import { UnauthorizedError } from "../errors/UnauthorizedError";

interface UserStorage {
	username: string;
	token: string;
}

export function getUserStorage(): UserStorage {
	const userStorage = localStorage.getItem("user");

	if (!userStorage) {
		throw new UnauthorizedError("Usuário não autenticado");
	}

	try {
		return JSON.parse(userStorage) as UserStorage;
	} catch {
		localStorage.removeItem("user");

		throw new UnauthorizedError("Sessão inválida");
	}
}
