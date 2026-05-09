import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";
import { validateToken } from "../helpers/auth.js";

export async function authenticationMiddleware(req: Request, res: Response, next: NextFunction) {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		throw new AppError("O token não foi enviado", 401);
	}

	const [, token] = authHeader.split(" ");

	if (!token) {
		throw new AppError("O token está mal formatado", 400);
	}

	const decodedToken = await validateToken(token);

	req.user = {
		id: decodedToken.userId,
		role: decodedToken.role,
	};

	next();
}

export async function authorizationMiddleware(req: Request, res: Response, next: NextFunction) {
	const userRole = req.user!.role;

	if (userRole !== "admin") {
		throw new AppError("Usuário não tem permissão para acessar esse recurso", 403);
	}

	next();
}
