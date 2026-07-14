import type { UserCard } from "../../../../../types/api/userCard";
import CardItem from "../CardItem";

interface CardListProps {
	cards: UserCard[];
	selectedCard: UserCard | null;
	onAddCard: () => void;
	onSelect: (card: UserCard) => void;
}

export default function CardList({ cards, selectedCard, onAddCard, onSelect }: CardListProps) {
	return (
		<section>
			{cards.length > 0 ? (
				<ul>
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
				<p>Não há cartões disponíveis</p>
			)}
			<button onClick={onAddCard}>Adicionar um novo pagamento</button>
		</section>
	);
}
