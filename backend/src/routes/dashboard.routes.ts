import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";
import { authenticationMiddleware, authorizationMiddleware } from "../middlewares/auth.middleware.js";

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.use(authenticationMiddleware);
dashboardRoutes.use(authorizationMiddleware);

dashboardRoutes.get("/dashboard/overview", dashboardController.overview);
dashboardRoutes.get("/dashboard/alert", dashboardController.alert);
dashboardRoutes.get("/dashboard/recent-orders", dashboardController.recentOrders);

export { dashboardRoutes };
