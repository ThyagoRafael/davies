import type { UserCard } from "../../../../../types/api/userCard";

interface CardItemProps {
	card: UserCard;
	checked: boolean;
	onSelect: (card: UserCard) => void;
}

export default function CardItem({ card, checked, onSelect }: CardItemProps) {
	return (
		<>
			<label>
				<input
					type="radio"
					name="selected-card"
					checked={checked}
					onChange={() => onSelect(card)}
				/>
				<div>
					<strong>
						{card.cardBrand} ****{card.lastDigits}
					</strong>

					<div>
						<p>{card.holderName}</p>
						<p>Expira em {card.expiryDate}</p>
					</div>
				</div>
			</label>
		</>
	);
}
