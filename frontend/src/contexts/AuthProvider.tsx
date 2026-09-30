import { useState, type ReactNode } from "react";
import { getUserStorage } from "../helpers/getUserStorage";
import { type User, AuthContext } from "./AuthContext";

interface AuthProviderProps {
	children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
	const [user, setUser] = useState<User | null>(() => getUserStorage());

	function login(user: User) {
		localStorage.setItem("user", JSON.stringify(user));
		setUser(user);
	}

	function logout() {
		localStorage.removeItem("user");
		setUser(null);
	}

	return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}
