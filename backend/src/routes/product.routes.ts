import { Router } from "express";
import { ProductController } from "../controllers/product.controller.js";

const productRoutes = Router();
const productController = new ProductController();

productRoutes.get("/", productController.getAll);
productRoutes.get("/:productId", productController.getOne);

export { productRoutes };
