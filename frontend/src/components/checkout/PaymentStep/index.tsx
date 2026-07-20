import { useState } from "react";
import PixPayment from "./PixPayment";
import CardPayment from "./CardPayment";
import type { UserCard } from "../../../types/api/userCard";
import styles from "./PaymentStep.module.css";

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
	const [isCardFormOpen, setIsCardFormOpen] = useState(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleAddCard = () => {
		setIsCardFormOpen(true);
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
		setIsCardFormOpen(false);
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
		<section className={styles.container}>
			<nav className={styles.navBar}>
				<button
					onClick={() => {
						onChangePaymentMethod("pix");
					}}
					disabled={paymentMethod === "pix"}
					className={`${paymentMethod === "pix" ? styles.selected : ""}`}
				>
					PIX
				</button>
				<button
					onClick={() => {
						onChangePaymentMethod("card");
					}}
					disabled={paymentMethod === "card"}
					className={`${paymentMethod === "card" ? styles.selected : ""}`}
				>
					Cartão
				</button>
			</nav>

			{paymentMethod === "pix" ? (
				<PixPayment />
			) : (
				<CardPayment
					cards={userCards}
					isForm={isCardFormOpen}
					selectedCard={selectedCard}
					loading={loading}
					onAddCard={handleAddCard}
					onSaveCard={handleSaveCard}
					onSelect={handleSelectCard}
					onCancel={() => setIsCardFormOpen(false)}
				/>
			)}

			{!isCardFormOpen && (
				<div className={styles.buttonsContainer}>
					<button
						onClick={handleNext}
						className={styles.primaryButton}
					>
						Ir para confirmação
					</button>
					<button
						onClick={onBack}
						className={styles.secondaryButton}
					>
						Voltar para endereço
					</button>
				</div>
			)}
		</section>
	);
}
