import { useState } from "react";
import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import type { UserCard } from "../../../types/api/userCard";

interface CardFormData {
	holderName: string;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
}

interface PaymentStepProps {
	userCards: UserCard[];
	paymentMethod: "pix" | "card";
	selectedCard: UserCard | null;
	onChangeUserCards: (userCard: UserCard[]) => void;
	onChangePaymentMethod: (paymentMethod: "pix" | "card") => void;
	onSelectCard: (selectedCard: UserCard | null) => void;
	onBack: () => void;
	onNext: () => void;
}

export default function PaymentStep({
	userCards,
	paymentMethod,
	selectedCard,
	onChangeUserCards,
	onChangePaymentMethod,
	onSelectCard,
	onBack,
	onNext,
}: PaymentStepProps) {
	const [paymentView, setPaymentView] = useState<"card-list" | "card-form" | "pix">("card-list");
	const [loading, setLoading] = useState<boolean>(false);

	const handleAddCard = () => {
		setPaymentView("card-form");
	};

	const handleSaveCard = (data: CardFormData) => {
		try {
			setLoading(true);

			const card: UserCard = {
				cardBrand: "Visa",
				cardToken: "asjniaucis",
				expiryDate: data.expiryDate,
				holderName: data.holderName,
				lastDigits: data.cardNumber.slice(-4),
				id: userCards.length + 1,
			};

			handleCardSaved(card);
		} catch {
			alert("Não foi possível salvar o endereço.");
		} finally {
			setLoading(false);
		}
	};

	const handleCardSaved = (card: UserCard) => {
		const updated = [...userCards, card];

		onChangeUserCards(updated);
		onSelectCard(card);
		setPaymentView("card-list");
	};

	const handleSelectCard = (card: UserCard) => {
		onSelectCard(card);
	};

	const handleNext = () => {
		if (paymentMethod === "card" && !selectedCard) {
			alert("Selecione uma forma de pagamento");
			return;
		}

		onNext();
	};

	return (
		<section>
			<nav>
				<button
					onClick={() => {
						onChangePaymentMethod("pix");
						setPaymentView("pix");
					}}
					disabled={paymentView === "pix"}
				>
					PIX
				</button>
				<button
					onClick={() => {
						onChangePaymentMethod("card");
						setPaymentView("card-list");
					}}
					disabled={paymentView !== "pix"}
				>
					Cartão
				</button>
			</nav>

			{paymentView === "pix" ? (
				<PixPayment />
			) : (
				<CardPayment
					cards={userCards}
					isForm={paymentView === "card-form"}
					selectedCard={selectedCard}
					loading={loading}
					onAddCard={handleAddCard}
					onSaveCard={handleSaveCard}
					onSelect={handleSelectCard}
					onCancel={() => setPaymentView("card-list")}
				/>
			)}

			{paymentView !== "card-form" && (
				<div>
					<button onClick={handleNext}>Ir para confirmação</button>
					<button onClick={onBack}>Voltar para endereço</button>
				</div>
			)}
		</section>
	);
}
