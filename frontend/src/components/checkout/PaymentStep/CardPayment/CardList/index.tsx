import type { UserCard } from "../../../../../types/api/userCard";
import CardItem from "../CardItem";
import styles from "./CardList.module.css";

interface CardListProps {
	cards: UserCard[];
	selectedCard: UserCard | null;
	onAddCard: () => void;
	onSelect: (card: UserCard) => void;
}

export default function CardList({ cards, selectedCard, onAddCard, onSelect }: CardListProps) {
	return (
		<section className={styles.container}>
			{cards.length > 0 ? (
				<ul className={styles.list}>
					{cards.map((card) => (
						<li key={card.id}>
							<CardItem
								card={card}
								checked={selectedCard?.id === card.id}
								onSelect={onSelect}
							/>
						</li>
					))}
				</ul>
			) : (
				<p className={styles.empty}>Não há cartões disponíveis</p>
			)}
			<button
				onClick={onAddCard}
				className={styles.terciaryButton}
			>
				Adicionar um novo pagamento
			</button>
		</section>
	);
}
