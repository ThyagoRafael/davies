import { Router } from "express";
import { ProductImagesController } from "../controllers/productImages.controller.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const productImageRoutes = Router({ mergeParams: true });
const productImagesController = new ProductImagesController();

productImageRoutes.post(
	"/images",
	authenticationMiddleware,
	authorizationMiddleware,
	uploadMiddleware.array("images", 8),
	productImagesController.upload,
);
productImageRoutes.put("/images", authenticationMiddleware, authorizationMiddleware, productImagesController.update);

export { productImageRoutes };
