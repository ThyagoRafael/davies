import { type Request, type Response, type NextFunction } from "express";
import { AppError } from "../errors/AppError.js";

export function errorMiddleware(err: unknown, req: Request, res: Response, _next: NextFunction) {
	console.log(err);

	if (err instanceof AppError) {
		res.status(err.statusCode).json({ message: err.message });
		return;
	}

	res.status(500).json({ message: "Erro inesperado no servidor" });
}
