import type { OrderStatus } from "../order";

export interface OverviewData {
	totalSales: string;
	totalOrders: number;
	totalProducts: number;
	totalProductStock: number;
}

export interface AlertData {
	outOfStockProducts: number;
	lowStockProducts: number;
	pendingOrders: number;
}

interface RecentOrders {
	user: string;
	id: number;
	status: OrderStatus;
	totalPrice: string;
	orderCode: string;
	createdAt: string;
}

export type RecentOrdersData = RecentOrders[];
