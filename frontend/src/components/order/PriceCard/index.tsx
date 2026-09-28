import { formatMoney } from "../../../utils/formatMoney";
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
					<dd>{formatMoney(priceData.itemsPrice)}</dd>
				</div>
				<div className={styles.dataGroup}>
					<dt>Frete</dt>
					<dd>{formatMoney(priceData.shippingPrice)}</dd>
				</div>
			</div>
			<div className={styles.totalGroup}>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatMoney(priceData.totalPrice)}</strong>
				</dd>
			</div>
		</dl>
	);
}
