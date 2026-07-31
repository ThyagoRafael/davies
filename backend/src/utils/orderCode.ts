import { sqids } from "../lib/sqids.js";

export function generateOrderCode(orderId: number): string {
	return `PED-${sqids.encode([orderId])}`;
}
