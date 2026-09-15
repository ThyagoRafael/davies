import { Router } from "express";
import { ProductImagesController } from "../controllers/productImages.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const productImageRoutes = Router({ mergeParams: true });
const productImagesController = new ProductImagesController();

productImageRoutes.put("/images", authenticationMiddleware, authorizationMiddleware, productImagesController.update);

export { productImageRoutes };
