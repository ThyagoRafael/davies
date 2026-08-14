import { env } from "./env.js";
import { type SignOptions } from "jsonwebtoken";

interface AuthConfig {
	secret: string;
	expiresIn: SignOptions["expiresIn"];
}

const authConfig: AuthConfig = {
	secret: env.JWT_SECRET,
	expiresIn: "3h",
};

export { authConfig };
