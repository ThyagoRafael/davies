import { Link } from "react-router-dom";
import type { OrderStatus } from "../../../types/api/order";
import { formatMoney } from "../../../utils/formatMoney";
import { getOrderStatusLabel } from "../../../utils/orderStatus";
import styles from "./AdminOrders.module.css";

interface OrderMock {
	id: number;
	orderCode: string;
	status: OrderStatus;
	customerName: string;
	orderDate: string;
	price: string;
}

const ordersMock: OrderMock[] = [
	{
		id: 1,
		orderCode: "PED-12345",
		status: "pending",
		customerName: "Nome do cliente",
		orderDate: "20/02/2027",
		price: "200.00",
	},
	{
		id: 2,
		orderCode: "PED-12346",
		status: "processing",
		customerName: "Nome do cliente",
		orderDate: "20/02/2027",
		price: "200.00",
	},
	{
		id: 3,
		orderCode: "PED-12347",
		status: "processing",
		customerName: "Nome do cliente",
		orderDate: "20/02/2027",
		price: "200.00",
	},
];

export default function AdminOrders() {
	return (
		<main className={styles.container}>
			<header>
				<h1>Pedidos</h1>
			</header>

			<ul className={styles.ordersList}>
				{ordersMock.map((order) => (
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
								<p>{order.customerName}</p>

								<div>
									<p>{order.orderDate}</p>
									<p>
										<strong>{formatMoney(order.price)}</strong>
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
