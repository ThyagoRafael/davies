import { env } from "../config/env.js";
import { MercadoPagoConfig } from "mercadopago";

export const mercadoPagoClient = new MercadoPagoConfig({
	accessToken: env.MP_ACCESS_TOKEN,
	options: {
		timeout: 5000,
	},
});
