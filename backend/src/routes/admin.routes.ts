import { Router } from "express";
import { AdminDashboardController } from "../controllers/adminDashboard.controller.js";
import { AdminOrderController } from "../controllers/adminOrder.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";
import { AdminProductController } from "../controllers/adminProduct.controller.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";

const adminRoutes = Router();
const adminDashboardController = new AdminDashboardController();
const adminOrderController = new AdminOrderController();
const adminProductController = new AdminProductController();

adminRoutes.use(authenticationMiddleware);
adminRoutes.use(authorizationMiddleware);

adminRoutes.get("/dashboard/overview", adminDashboardController.overview);
adminRoutes.get("/dashboard/alert", adminDashboardController.alert);
adminRoutes.get("/dashboard/recent-orders", adminDashboardController.recentOrders);

adminRoutes.get("/orders", adminOrderController.list);
adminRoutes.patch("/orders/:orderId", adminOrderController.updateStatus);

adminRoutes.post("/products", uploadMiddleware.any(), adminProductController.create);
adminRoutes.get("/products", adminProductController.list);
adminRoutes.get("/products/:productId", adminProductController.details);
adminRoutes.patch("/products/:productId", uploadMiddleware.any(), adminProductController.update);
adminRoutes.delete("/products/:productId", adminProductController.destroy);

export { adminRoutes };
