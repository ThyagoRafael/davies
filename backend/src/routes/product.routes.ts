import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.post("/", authenticationMiddleware, authorizationMiddleware, productController.create);
productRoutes.get("/", productController.getAll);
productRoutes.get("/:productId", productController.getOne);

export { productRoutes };
