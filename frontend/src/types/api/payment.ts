export type PaymentStatus = "pending" | "paid" | "failed" | "expired" | "canceled";

export interface Payment {
	method: "card" | "pix";
	status: PaymentStatus;
}
