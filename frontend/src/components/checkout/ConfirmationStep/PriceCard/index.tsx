import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./PriceCard.module.css";

interface PriceCardProps {
	cartPrice: string;
}

export default function PriceCard({ cartPrice }: PriceCardProps) {
	return (
		<dl className={styles.container}>
			<div className={styles.dataContainer}>
				<div className={styles.dataGroup}>
					<dt>Itens</dt>
					<dd>{formatPrice(cartPrice)}</dd>
				</div>
			</div>
			<div className={styles.totalGroup}>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatPrice(cartPrice)}</strong>
				</dd>
			</div>
		</dl>
	);
}
