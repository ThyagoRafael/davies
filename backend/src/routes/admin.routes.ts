import { Router } from "express";
import { AdminController } from "../controllers/admin.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const adminRoutes = Router();
const adminController = new AdminController();

adminRoutes.use(authenticationMiddleware);
adminRoutes.use(authorizationMiddleware);

adminRoutes.get("/dashboard/overview", adminController.dashboardOverview);
adminRoutes.get("/dashboard/alert", adminController.dashboardAlert);
adminRoutes.get("/dashboard/recent-orders", adminController.dashboardRecentOrders);

adminRoutes.get("/orders", adminController.listOrders);

export { adminRoutes };
