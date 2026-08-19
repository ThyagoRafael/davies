import { formatPrice } from "../../../utils/formatPrice";
import styles from "./PriceCard.module.css";

interface PriceData {
	itemsPrice: string;
	shippingPrice: string;
	totalPrice: string;
}

interface PriceCardProps {
	priceData: PriceData;
}

export default function PriceCard({ priceData }: PriceCardProps) {
	return (
		<dl className={styles.container}>
			<div className={styles.dataContainer}>
				<div className={styles.dataGroup}>
					<dt>Itens</dt>
					<dd>{formatPrice(priceData.itemsPrice)}</dd>
				</div>
				<div className={styles.dataGroup}>
					<dt>Frete</dt>
					<dd>{formatPrice(priceData.shippingPrice)}</dd>
				</div>
			</div>
			<div className={styles.totalGroup}>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatPrice(priceData.totalPrice)}</strong>
				</dd>
			</div>
		</dl>
	);
}
