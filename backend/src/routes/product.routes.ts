import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", productController.list);
productRoutes.get("/:productId", productController.details);

export { productRoutes };
