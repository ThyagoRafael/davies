import OrderItemCard from "./OrderItemCard";
import styles from "./OrderItemsContainer.module.css";

export default function OrderItemsContainer() {
	return (
		<section className={styles.container}>
			<header>
				<h2>Itens do pedido</h2>
			</header>

			<ul className={styles.list}>
				<li>
					<OrderItemCard />
				</li>
				<li>
					<OrderItemCard />
				</li>
			</ul>
		</section>
	);
}
