import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./OrderItemCard.module.css";
import type { OrderItem } from "../../../../types/api/order";

interface OrderItemCardProps {
	item: OrderItem;
}

export default function OrderItemCard({ item }: OrderItemCardProps) {
	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<img
					src={item.imageUrl}
					alt={item.name}
				/>
			</div>
			<div className={styles.descriptionContainer}>
				<h3>{item.name}</h3>

				<footer className={styles.descriptionFooter}>
					<p>Quantidade: {item.quantity}</p>
					<strong>{formatPrice(item.unitPrice)}</strong>
				</footer>
			</div>
		</div>
	);
}
