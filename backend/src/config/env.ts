import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
	PORT: z.coerce.number().default(3000),
	DATABASE_URL: z.string(),
	JWT_SECRET: z.string(),
	CLOUDINARY_NAME: z.string(),
	CLOUDINARY_KEY: z.string(),
	CLOUDINARY_SECRET: z.string(),
	MP_ACCESS_TOKEN: z.string(),
	STRIPE_SECRET_KEY: z.string(),
});

export const env = envSchema.parse(process.env);
