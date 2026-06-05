import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/checkout", authenticationMiddleware, orderController.checkout);
orderRoutes.get("/", authenticationMiddleware, orderController.list);
orderRoutes.get("/:orderId", authenticationMiddleware, orderController.detail);
orderRoutes.patch("/:orderId", authenticationMiddleware, orderController.shipOrder);
orderRoutes.patch("/:orderId", authenticationMiddleware, orderController.deliverOrder);
orderRoutes.patch("/:orderId", authenticationMiddleware, orderController.cancelOrder);

export { orderRoutes };
