import type { UserCard } from "../../../../types/api/userCard";
import CardForm from "./CardForm";
import CardList from "./CardList";

interface CardFormData {
	holderName: string;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
}

interface CardPayment {
	cards: UserCard[];
	isForm: boolean;
	selectedCard: UserCard | null;
	loading: boolean;
	onAddCard: () => void;
	onSaveCard: (cardData: CardFormData) => void;
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
