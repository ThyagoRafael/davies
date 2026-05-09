import { Router } from "express";
import { CartItemController } from "../controllers/cartItem.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const cartItemRoutes = Router();
const cartItemController = new CartItemController();

cartItemRoutes.post("/:productId", authenticationMiddleware, cartItemController.addToCart);
cartItemRoutes.put("/:productId", authenticationMiddleware, cartItemController.updateCartItem);
cartItemRoutes.delete("/:productId", authenticationMiddleware, cartItemController.deleteCartItem);
cartItemRoutes.delete("/", authenticationMiddleware, cartItemController.deleteAllCartItems);

export { cartItemRoutes };
