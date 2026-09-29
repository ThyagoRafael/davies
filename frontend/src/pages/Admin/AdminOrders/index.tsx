import { Link } from "react-router-dom";
import { formatMoney } from "../../../utils/formatMoney";
import { getOrderStatusLabel } from "../../../utils/orderStatus";
import styles from "./AdminOrders.module.css";
import { useEffect, useState } from "react";
import type { OrdersData } from "../../../types/api/admin/orders";
import { getOrdersData } from "../../../services/api/admin/orders";

export default function AdminOrders() {
	const [ordersData, setOrdersData] = useState<OrdersData>([]);

	useEffect(() => {
		async function fetchOrdersData() {
			const data = await getOrdersData();

			setOrdersData(data);
		}

		fetchOrdersData();
	}, []);

	return (
		<main className={styles.container}>
			<header>
				<h1>Pedidos</h1>
			</header>

			<ul className={styles.ordersList}>
				{ordersData.map((order) => (
					<li key={order.id}>
						<Link
							to={`/admin/pedidos/${order.id}`}
							className={styles.orderCard}
						>
							<div className={styles.orderCardHeader}>
								<h3>{order.orderCode}</h3>
								<p>{getOrderStatusLabel(order.status)}</p>
							</div>

							<div className={styles.orderCardContent}>
								<p>{order.user}</p>

								<div>
									<p>{new Date(order.createdAt).toLocaleDateString("PT-BR")}</p>
									<p>
										<strong>{formatMoney(order.totalPrice)}</strong>
									</p>
								</div>
							</div>
						</Link>
					</li>
				))}
			</ul>
		</main>
	);
}
