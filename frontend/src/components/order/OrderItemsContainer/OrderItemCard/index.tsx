import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./OrderItemCard.module.css";
import type { CartProduct } from "../../../../types/cart/CartData";

interface OrderItemCardProps {
	cartItem: CartProduct;
}

export default function OrderItemCard({ cartItem }: OrderItemCardProps) {
	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<img
					src={cartItem.imageUrl}
					alt={cartItem.name}
				/>
			</div>
			<div className={styles.descriptionContainer}>
				<h3>{cartItem.name}</h3>

				<footer className={styles.descriptionFooter}>
					<p>Quantidade: {cartItem.quantity}</p>
					<strong>{formatPrice(cartItem.price)}</strong>
				</footer>
			</div>
		</div>
	);
}
