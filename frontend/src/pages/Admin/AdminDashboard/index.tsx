import { FaArrowRight } from "react-icons/fa";
import { formatMoney } from "../../../utils/formatMoney";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";
import { useEffect, useState } from "react";
import type { AlertData, OverviewData, RecentOrdersData } from "../../../types/api/admin/dashboard";
import { getAlertData, getOverviewData, getRecentOrdersData } from "../../../services/api/admin/dashboard";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getOrderStatusLabel } from "../../../utils/orderStatus";

export default function AdminDashboard() {
	const [overviewData, setOverviewData] = useState<OverviewData>({
		totalOrders: 0,
		totalProducts: 0,
		totalProductStock: 0,
		totalSales: "0",
	});
	const [alertData, setAlertData] = useState<AlertData>({
		lowStockProducts: 0,
		outOfStockProducts: 0,
		pendingOrders: 0,
	});
	const [recentOrdersData, setRecentOrdersData] = useState<RecentOrdersData>([]);

	useEffect(() => {
		getOverviewData()
			.then(setOverviewData)
			.catch((error) => getErrorMessage(error));

		getAlertData()
			.then(setAlertData)
			.catch((error) => getErrorMessage(error));

		getRecentOrdersData()
			.then(setRecentOrdersData)
			.catch((error) => getErrorMessage(error));
	}, []);

	return (
		<main className={styles.container}>
			<section className={styles.section}>
				<h2>Resumo</h2>

				<ul className={styles.contentList}>
					<li className={styles.listItem}>
						<h3>Total de vendas (em reais)</h3>
						<p>{formatMoney(overviewData.totalSales)}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de pedidos</h3>
						<p>{overviewData.totalOrders}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de produtos</h3>
						<p>{overviewData.totalProducts}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de produtos (por estoque)</h3>
						<p>{overviewData.totalProductStock}</p>
					</li>
				</ul>
			</section>

			<section className={styles.section}>
				<h2>Alertas</h2>

				<ul className={styles.contentList}>
					<li className={`${styles.alertItem} ${alertData.outOfStockProducts > 0 ? styles.danger : ""}`}>
						<h3>Produtos sem estoque</h3>
						<p>{alertData.outOfStockProducts}</p>
					</li>
					<li className={`${styles.alertItem} ${alertData.lowStockProducts > 0 ? styles.danger : ""}`}>
						<h3>Produtos com estoque baixo</h3>
						<p>{alertData.lowStockProducts}</p>
					</li>
					<li className={`${styles.alertItem} ${alertData.pendingOrders > 0 ? styles.danger : ""}`}>
						<h3>Pedidos pendentes</h3>
						<p>{alertData.pendingOrders}</p>
					</li>
				</ul>
			</section>

			<section className={styles.section}>
				<h2>Últimos pedidos</h2>

				<ul className={styles.contentList}>
					{recentOrdersData.map((order) => (
						<li
							className={styles.orderCard}
							key={order.id}
						>
							<div className={styles.orderCardTitle}>
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
						</li>
					))}
				</ul>

				<div className={styles.linkContainer}>
					<Link
						to="/admin/pedidos"
						className={styles.link}
					>
						<span>Ver todos os pedidos</span>
						<FaArrowRight size={14} />
					</Link>
				</div>
			</section>
		</main>
	);
}
