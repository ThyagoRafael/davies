import type { UserCard } from "../../../../../types/api/userCard";
import styles from "./CardItem.module.css";

interface CardItemProps {
	card: UserCard;
	checked: boolean;
	onSelect: (card: UserCard) => void;
}

export default function CardItem({ card, checked, onSelect }: CardItemProps) {
	return (
		<label className={`${styles.cardContainer} ${checked ? styles.checked : ""}`}>
			<input
				type="radio"
				name="selected-card"
				checked={checked}
				onChange={() => onSelect(card)}
			/>
			<div className={styles.details}>
				<strong className={styles.detailsHeader}>
					{card.cardBrand} ****{card.lastDigits}
				</strong>

				<div className={styles.detailsDescription}>
					<span className={styles.holderName}>{card.holderName}</span>
					<span className={styles.separator}>-</span>
					<span className={styles.expiryDate}>Expira em {card.expiryDate}</span>
				</div>
			</div>
		</label>
	);
}
