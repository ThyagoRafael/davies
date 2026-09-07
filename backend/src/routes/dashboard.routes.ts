import { Router } from "express";
import { DashboardController } from "../controllers/dashboard.controller.js";

const dashboardRoutes = Router();
const dashboardController = new DashboardController();

dashboardRoutes.get("/overview", dashboardController.overview);
dashboardRoutes.get("/alert", dashboardController.alert);

export { dashboardRoutes };
