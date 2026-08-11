import { Router } from "express";
import { PaymentController } from "../controllers/payment.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const paymentsRoutes = Router();
const paymentController = new PaymentController();

paymentsRoutes.get("/:orderId/status", authenticationMiddleware, paymentController.getStatus);

export { paymentsRoutes };
