import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import styles from "./Details.module.css";
import PriceCard from "../../../../components/order/PriceCard";
import AddressCard from "../../../../components/order/AddressCard";
import OrderItemsContainer from "../../../../components/order/OrderItemsContainer";
import { useEffect, useState } from "react";
import type { OrderDetails } from "../../../../types/api/order";
import { getOrderDetails } from "../../../../services/api/order";
import { getErrorMessage } from "../../../../utils/getErrorMessage";
import { getOrderDisplayStatus } from "../../../../utils/orderDisplayStatus";

export default function OrderDetails() {
	const { orderId } = useParams();
	const [orderDetails, setOrderDetails] = useState<OrderDetails>();

	useEffect(() => {
		async function loadOrderData() {
			try {
				const data = await getOrderDetails(Number(orderId));

				setOrderDetails(data);
			} catch (error) {
				alert(getErrorMessage(error));
			}
		}

		loadOrderData();
	}, [orderId]);

	return (
		<section className={styles.container}>
			<div className={styles.linkContainer}>
				<Link to="/usuario/pedidos">
					<FaArrowLeft />
					<span>Seus pedidos</span>
				</Link>
			</div>

			<header className={styles.header}>
				<h1>Detalhes do pedido</h1>
			</header>

			{orderDetails ? (
				<section className={styles.detailsContainer}>
					<header className={styles.detailsHeader}>
						<div className={styles.orderInfo}>
							<h2>{getOrderDisplayStatus(orderDetails.order.status, orderDetails.payment.status)}</h2>

							<div>
								<p>Pedido realizado em {new Date(orderDetails.order.createdAt).toLocaleDateString("pt-BR")}</p>
								<p>Código do pedido #{orderDetails.order.orderCode}</p>
							</div>
						</div>

						<PriceCard
							priceData={{
								itemsPrice: orderDetails.order.itemsPrice,
								shippingPrice: orderDetails.order.shippingPrice,
								totalPrice: orderDetails.order.totalPrice,
							}}
						/>
					</header>

					<section className={styles.detailsSection}>
						<h2>Pagamento</h2>

						<article className={styles.paymentCard}>
							<header className={styles.paymentHeader}>
								<h3>
									Cartão - {orderDetails.card.cardBrand} ****{orderDetails.card.lastDigits}
								</h3>
							</header>

							<p className={styles.cardHolder}>{orderDetails.card.holderName}</p>
						</article>
					</section>

					<AddressCard selectedAddress={orderDetails.address} />

					<OrderItemsContainer items={orderDetails.orderItems} />
				</section>
			) : (
				<p>Erro no carregamento do pedido</p>
			)}
		</section>
	);
}
