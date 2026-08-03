import { Link, useLocation, useParams } from "react-router-dom";
import approved from "../../../assets/approved.png";
import styles from "./OrderConfirmation.module.css";
import { useEffect, useState } from "react";
import type { Order } from "../../../types/api/order";
import { getOrderById } from "../../../services/api/order";
import { getErrorMessage } from "../../../utils/getErrorMessage";

export default function OrderConfirmation() {
	const location = useLocation() as { state?: { orderData?: Order } };
	const { orderId } = useParams<{ orderId: string }>();
	const [orderData, setOrderData] = useState<Order | null>(location.state?.orderData ?? null);

	useEffect(() => {
		if (orderData) return;

		if (!orderId) return;

		const fetchOrder = async () => {
			try {
				const data = await getOrderById(Number(orderId));

				setOrderData(data);
			} catch (error) {
				alert(getErrorMessage(error));
			}
		};

		fetchOrder();
	}, [orderId, orderData]);

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
								<h2>Pedido #{orderData.orderCode}</h2>
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
								<h3>Cartão - Visa ****0000</h3>
								<span>Esperando aprovação</span>
							</header>

							<p className={styles.cardHolder}>João R A Batista</p>
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
