import { Router } from "express";
import { OrderController } from "../controllers/order.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const orderRoutes = Router();
const orderController = new OrderController();

orderRoutes.post("/checkout", authenticationMiddleware, orderController.checkout);
orderRoutes.get("/", authenticationMiddleware, orderController.list);
orderRoutes.get("/:orderId", authenticationMiddleware, orderController.detail);
orderRoutes.patch("/:orderId/ship", authenticationMiddleware, authorizationMiddleware, orderController.shipOrder);
orderRoutes.patch("/:orderId/deliver", authenticationMiddleware, authorizationMiddleware, orderController.deliverOrder);
orderRoutes.patch("/:orderId/cancel", authenticationMiddleware, orderController.cancelOrder);

export { orderRoutes };
