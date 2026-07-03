import server from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";

const port = env.PORT || 3000;

const httpServer = server.listen(port, () => {
	console.log(`Servidor iniciado na porta ${port}`);
});

httpServer.on("error", (err: NodeJS.ErrnoException) => {
	console.error(err);
	process.exit(1);
});

const shutdown = async () => {
	console.log("Encerrando servidor...");

	httpServer.close(async () => {
		await prisma.$disconnect();
		process.exit(0);
	});
};

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

process.on("uncaughtException", (err) => {
	console.error(err);
	process.exit(1);
});

process.on("unhandledRejection", (reason) => {
	console.error(reason);
	process.exit(1);
});
