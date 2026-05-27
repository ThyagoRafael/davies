import { Router } from "express";
import { ShippingAddressController } from "../controllers/shippingaddress.controller.js";
import { authenticationMiddleware } from "../middlewares/auth.middleware.js";

const addressRoutes = Router();
const addressController = new ShippingAddressController();

addressRoutes.post("/", authenticationMiddleware, addressController.create);
addressRoutes.get("/", authenticationMiddleware, addressController.list);
addressRoutes.get("/:addressId", authenticationMiddleware, addressController.detail);
addressRoutes.patch("/:addressId", authenticationMiddleware, addressController.update);
addressRoutes.delete("/:addressId", authenticationMiddleware, addressController.destroy);

export { addressRoutes };
