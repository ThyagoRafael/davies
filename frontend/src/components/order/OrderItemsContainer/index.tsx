import type { OrderItem } from "../../../types/api/order";
import OrderItemCard from "./OrderItemCard";
import styles from "./OrderItemsContainer.module.css";

interface OrderItemsContainerProps {
	items: OrderItem[];
}

export default function OrderItemsContainer({ items }: OrderItemsContainerProps) {
	return (
		<section className={styles.container}>
			<header>
				<h2>Itens do pedido</h2>
			</header>

			<ul className={styles.list}>
				{items.map((item) => (
					<li key={item.id}>
						<OrderItemCard item={item} />
					</li>
				))}
			</ul>
		</section>
	);
}
