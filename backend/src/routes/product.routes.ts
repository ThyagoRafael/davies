import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post("/", authenticationMiddleware, authorizationMiddleware, productController.create);
productRoutes.get("/", productController.getAll);
productRoutes.get("/:productId", productController.getOne);
productRoutes.put("/:productId", authenticationMiddleware, authorizationMiddleware, productController.update);
productRoutes.delete("/:productId", authenticationMiddleware, authorizationMiddleware, productController.destroy);

export { productRoutes };
