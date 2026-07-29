import type { UserCard, UserCardFormData } from "../../../../types/api/userCard";
import CardForm from "./CardForm";
import CardList from "./CardList";

interface CardPayment {
	cards: UserCard[];
	isForm: boolean;
	selectedCard: UserCard | null;
	loading: boolean;
	onAddCard: () => void;
	onSaveCard: (cardData: UserCardFormData) => void;
	onSelect: (card: UserCard) => void;
	onCancel: () => void;
}

export default function CardPayment({
	cards,
	isForm,
	selectedCard,
	loading,
	onAddCard,
	onSaveCard,
	onSelect,
	onCancel,
}: CardPayment) {
	return (
		<div>
			{isForm ? (
				<CardForm
					onSubmit={onSaveCard}
					onCancel={onCancel}
					loading={loading}
				/>
			) : (
				<CardList
					cards={cards}
					selectedCard={selectedCard}
					onAddCard={onAddCard}
					onSelect={onSelect}
				/>
			)}
		</div>
	);
}
