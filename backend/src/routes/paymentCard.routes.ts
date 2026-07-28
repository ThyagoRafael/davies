import { Router } from "express";
import { PaymentCardController } from "../controllers/paymentCard.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const paymentCardRoutes = Router();
const paymentCardController = new PaymentCardController();

paymentCardRoutes.get("/", authenticationMiddleware, paymentCardController.list);
paymentCardRoutes.post("/", authenticationMiddleware, paymentCardController.register);

export { paymentCardRoutes };
