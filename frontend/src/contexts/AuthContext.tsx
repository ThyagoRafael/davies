import { createContext } from "react";

export interface User {
	username: string;
	token: string;
}

export interface AuthContextData {
	user: User | null;
	login: (user: User) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextData | undefined>(undefined);
