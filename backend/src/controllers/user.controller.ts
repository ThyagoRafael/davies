import type { Request, Response } from "express";
import { prisma } from "../config/prisma.js";

import { encryptPassword, verifyPassword } from "../helpers/bcrypt.js";
import { AppError } from "../errors/AppError.js";
import { generateToken } from "../helpers/auth.js";

export class UserController {
	register = async (req: Request, res: Response) => {
		const passwordHash = await encryptPassword(req.body.password);

		const bodyData = {
			name: req.body.name,
			email: req.body.email,
			passwordHash,
			cpf: req.body.cpf,
			phone: req.body.phone || null,
		};

		const emailExists = await prisma.user.findUnique({ where: { email: bodyData.email } });

		if (emailExists) {
			throw new AppError("Esse email já está cadastrado", 400);
		}

		const cpfExists = await prisma.user.findUnique({ where: { cpf: bodyData.cpf } });

		if (cpfExists) {
			throw new AppError("Esse CPF já está cadastrado", 400);
		}

		const phoneExists = await prisma.user.findUnique({ where: { phone: bodyData.phone } });

		if (phoneExists) {
			throw new AppError("Esse telefone já está cadastrado", 400);
		}

		const savedUser = await prisma.user.create({ data: bodyData, select: { email: true } });

		res.status(201).json(savedUser);
	};

	login = async (req: Request, res: Response) => {
		const bodyData = {
			email: req.body.email,
			password: req.body.password,
		};

		const userExists = await prisma.user.findUnique({ where: { email: bodyData.email } });

		if (!userExists) {
			throw new AppError("Esse email não está cadastrado", 404);
		}

		const isValidPassword = await verifyPassword(bodyData.password, userExists.passwordHash);

		if (!isValidPassword) {
			throw new AppError("A senha está incorreta", 401);
		}

		const token = generateToken(userExists.id, userExists.role);

		res.status(200).json({ username: userExists.name, token });
	};
}
