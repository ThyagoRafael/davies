import { Router } from "express";
import { AdminDashboardController } from "../controllers/adminDashboard.controller.js";
import { AdminOrderController } from "../controllers/adminOrder.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const adminRoutes = Router();
const adminDashboardController = new AdminDashboardController();
const adminOrderController = new AdminOrderController();

adminRoutes.use(authenticationMiddleware);
adminRoutes.use(authorizationMiddleware);

adminRoutes.get("/dashboard/overview", adminDashboardController.overview);
adminRoutes.get("/dashboard/alert", adminDashboardController.alert);
adminRoutes.get("/dashboard/recent-orders", adminDashboardController.recentOrders);

adminRoutes.get("/orders", adminOrderController.list);
adminRoutes.patch("/orders/:orderId", adminOrderController.updateStatus);

export { adminRoutes };
