import { UnauthorizedError } from "../errors/UnauthorizedError";
import { logoutAndRedirectToLogin } from "./logout";

interface UserStorage {
	username: string;
	token: string;
}

function unauthorized(message: string): never {
	logoutAndRedirectToLogin();
	throw new UnauthorizedError(message);
}

export function getUserStorage(): UserStorage {
	const userStorage = localStorage.getItem("user");

	if (!userStorage) {
		unauthorized("Usuário não autenticado");
	}

	try {
		return JSON.parse(userStorage) as UserStorage;
	} catch {
		unauthorized("Sessão inválida");
	}
}
