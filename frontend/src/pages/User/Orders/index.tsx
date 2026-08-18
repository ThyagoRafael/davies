import { useEffect, useState } from "react";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./Orders.module.css";
import type { OrdersList } from "../../../types/api/order";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getOrdersList } from "../../../services/api/order";

export default function Orders() {
	const [orders, setOrders] = useState<OrdersList>([]);

	useEffect(() => {
		async function loadOrders() {
			try {
				const data = await getOrdersList();

				setOrders(data);
			} catch (error) {
				alert(getErrorMessage(error));
			}
		}

		loadOrders();
	}, []);

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1>Seus pedidos</h1>
			</header>

			{orders.length > 0 ? (
				<ul className={styles.ordersContainer}>
					{orders.map((order) => (
						<li key={order.id}>
							<article className={styles.orderCard}>
								<div className={styles.orderHeader}>
									<h2>Pedido #{order.orderCode}</h2>
									<p role="status">{order.status}</p>
								</div>

								<div className={styles.orderContent}>
									<div className={styles.itemsContent}>
										<p className={styles.quantity}>
											{order.quantityItems > 1
												? `${order.quantityItems} itens`
												: `${order.quantityItems} item`}
										</p>
										<p
											className={styles.preview}
											title={order.productsName.join(", ")}
										>
											{order.productsName.join(", ")}
										</p>
									</div>

									<strong>{formatPrice(order.totalPrice)}</strong>
								</div>
							</article>
						</li>
					))}
				</ul>
			) : (
				<p className={styles.empty}>Não há pedidos</p>
			)}
		</section>
	);
}
