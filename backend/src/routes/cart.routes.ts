import { Router } from "express";
import { CartController } from "../controllers/cart.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const cartRoutes = Router();
const cartController = new CartController();

cartRoutes.get("/", authenticationMiddleware, cartController.getProducts);
cartRoutes.put("/", authenticationMiddleware, cartController.finishCart);

export { cartRoutes };
