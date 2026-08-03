interface UserStorage {
	username: string;
	token: string;
}

export function getUserStorage(): UserStorage | null {
	const userStorage = localStorage.getItem("user");

	if (!userStorage) {
		return null;
	}

	try {
		return JSON.parse(userStorage) as UserStorage;
	} catch {
		localStorage.removeItem("user");
		return null;
	}
}
