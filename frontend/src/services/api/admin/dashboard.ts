import { api } from "..";
import type { AlertData, OverviewData, RecentOrdersData } from "../../../types/api/admin/dashboard";

export async function getOverviewData(): Promise<OverviewData> {
	const { data } = await api.get("/admin/dashboard/overview");

	return data;
}

export async function getAlertData(): Promise<AlertData> {
	const { data } = await api.get("/admin/dashboard/alert");

	return data;
}

export async function getRecentOrdersData(): Promise<RecentOrdersData> {
	const { data } = await api.get("/admin/dashboard/recent-orders");

	return data;
}
