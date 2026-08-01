import type { CartData } from "../../../../types/cart/CartData";
import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./PriceCard.module.css";

interface PriceCardProps {
	cartData: CartData;
}

export default function PriceCard({ cartData }: PriceCardProps) {
	return (
		<dl className={styles.container}>
			<div className={styles.dataContainer}>
				<div className={styles.dataGroup}>
					<dt>Itens</dt>
					<dd>{formatPrice(cartData.itemsPrice)}</dd>
				</div>
				<div className={styles.dataGroup}>
					<dt>Frete</dt>
					<dd>{formatPrice(cartData.shippingPrice)}</dd>
				</div>
			</div>
			<div className={styles.totalGroup}>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatPrice(cartData.totalPrice)}</strong>
				</dd>
			</div>
		</dl>
	);
}
