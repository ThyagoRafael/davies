import { Link, useLocation, useParams } from "react-router-dom";
import approved from "../../../assets/approved.png";
import styles from "./OrderConfirmation.module.css";
import { useEffect, useState } from "react";
import type { OrderData } from "../../../types/api/order";
import { getOrderDataById } from "../../../services/api/order";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { PaymentStatus } from "../../../types/api/payment";
import { getPaymentStatus } from "../../../services/api/payment";

export default function OrderConfirmation() {
	const location = useLocation() as { state?: OrderData };
	const { orderId } = useParams<{ orderId: string }>();
	const [orderData, setOrderData] = useState<OrderData | null>(location.state ?? null);

	const paymentStatusText: Record<PaymentStatus, string> = {
		pending: "Aguardando pagamento",
		paid: "Pagamento aprovado",
		failed: "Pagamento falhou",
		expired: "Pagamento expirado",
		canceled: "Pagamento cancelado",
	};

	useEffect(() => {
		if (orderData) return;

		if (!orderId) return;

		const fetchOrder = async () => {
			try {
				const data = await getOrderDataById(Number(orderId));

				setOrderData(data);
			} catch (error) {
				alert(getErrorMessage(error));
			}
		};

		fetchOrder();
	}, [orderId, orderData]);

	useEffect(() => {
		if (!orderData) return;
		if (orderData.payment.status !== "pending") return;

		let tries = 0;
		const maxTries = 10;

		const interval = setInterval(async () => {
			tries++;
			try {
				const { status } = await getPaymentStatus(orderData.order.id);

				if (status !== "pending") {
					setOrderData((prev) => (prev ? { ...prev, payment: { ...prev.payment, status } } : prev));
					clearInterval(interval);
				}
			} catch {
				// Try again
			}

			if (tries >= maxTries) clearInterval(interval);
		}, 2000);

		return () => clearInterval(interval);
	}, [orderData]);

	return (
		<section className={styles.container}>
			{orderData ? (
				<>
					<header className={styles.header}>
						<h1>Pedido confirmado</h1>

						<div className={styles.confirmation}>
							<img
								src={approved}
								alt=""
								aria-hidden="true"
							/>

							<div className={styles.confirmationContent}>
								<h2>Pedido #{orderData.order.orderCode}</h2>
								<p>O pedido foi efetuado com sucesso</p>
							</div>
						</div>
					</header>

					<hr className={styles.divider} />

					<section className={styles.paymentSection}>
						<header className={styles.sectionHeader}>
							<h2>Pagamento</h2>
							<p>Você receberá um email após a confirmação do pagamento</p>
						</header>

						<article className={styles.paymentCard}>
							<header className={styles.paymentHeader}>
								<h3>
									Cartão - {orderData.card.cardBrand} ****{orderData.card.lastDigits}
								</h3>
								<span>{paymentStatusText[orderData.payment.status]}</span>
							</header>

							<p className={styles.cardHolder}>{orderData.card.holderName}</p>
						</article>
					</section>

					<div className={styles.linkContainer}>
						<Link to={"/"}>Voltar para a vitrine</Link>
					</div>
				</>
			) : (
				<p>Pedido não encontrado</p>
			)}
		</section>
	);
}
