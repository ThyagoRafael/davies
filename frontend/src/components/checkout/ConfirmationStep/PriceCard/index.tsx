import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./PriceCard.module.css";

export default function PriceCard() {
	return (
		<dl className={styles.container}>
			<div className={styles.dataContainer}>
				<div className={styles.dataGroup}>
					<dt>Itens</dt>
					<dd>{formatPrice("150.00")}</dd>
				</div>
				<div className={styles.dataGroup}>
					<dt>Frete</dt>
					<dd>{formatPrice("20.00")}</dd>
				</div>
			</div>
			<div className={styles.totalGroup}>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatPrice("170.00")}</strong>
				</dd>
			</div>
		</dl>
	);
}
