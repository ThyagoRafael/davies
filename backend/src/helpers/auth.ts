import jwt, { type JwtPayload, type SignOptions } from "jsonwebtoken";
import { authConfig } from "../config/auth.js";
import { AppError } from "../errors/AppError.js";
import type { Role } from "../types/role.js";

interface TokenPayload extends JwtPayload {
	userId: number;
	role: Role;
}

const options: SignOptions = {
	...(authConfig.expiresIn && { expiresIn: authConfig.expiresIn }),
};

export function generateToken(userId: number, role: Role) {
	try {
		const token = jwt.sign({ userId, role }, authConfig.secret, options);

		return token;
	} catch {
		throw new Error("Erro na geração de token");
	}
}

export async function validateToken(token: string) {
	try {
		const decoded = await jwt.verify(token, authConfig.secret);

		return decoded as TokenPayload;
	} catch {
		throw new AppError("Usuário não autorizado", 401);
	}
}
