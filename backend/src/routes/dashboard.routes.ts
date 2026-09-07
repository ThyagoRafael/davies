import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get("/dashboard/overview", dashboardController.overview);
dashboardRoutes.get("/dashboard/alert", dashboardController.alert);
dashboardRoutes.get("/dashboard/recent-orders", dashboardController.recentOrders);

export { dashboardRoutes };
