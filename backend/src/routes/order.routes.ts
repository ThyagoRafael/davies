import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/checkout", authenticationMiddleware, orderController.checkout);
orderRoutes.get("/", authenticationMiddleware, orderController.list);

export { orderRoutes };
