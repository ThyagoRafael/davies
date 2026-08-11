import express from "express";
import { routes } from "./routes/index.js";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import cors from "cors";
import { stripeWebhook } from "./webhooks/stripe.webhook.js";

class App {
	server: express.Express;

	constructor() {
		this.server = express();
		this.webhooks();
		this.middlewares();
		this.routes();
		this.error();
	}

	webhooks() {
		this.server.post("/api/webhooks/stripe", express.raw({ type: "application/json" }), stripeWebhook);
	}

	middlewares() {
		this.server.use(cors({ origin: "http://localhost:5173" }));
		this.server.use(express.json());
	}

	routes() {
		this.server.use("/api", routes);
	}

	error() {
		this.server.use(errorMiddleware);
	}
}

export default new App().server;
