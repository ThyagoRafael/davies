import { useEffect, useState } from "react";
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
	onBack: () => void;
	onNext: () => void;
}

export default function PaymentStep({ onBack, onNext }: PaymentStepProps) {
	const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");
	const [paymentView, setPaymentView] = useState<"card-list" | "card-form" | "pix">("card-list");
	const [userCards, setUserCards] = useState<UserCard[]>([]);
	const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const loadUserCards = async () => {
			try {
				setLoading(true);

				const userCards: UserCard[] = [];

				setUserCards(userCards);

				if (userCards.length > 0) {
					setSelectedCard(userCards[0]);
				}
			} catch (error) {
				alert("Erro ao carregar a lista de endereços");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		loadUserCards();
	}, []);

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
		setUserCards((prev) => [...prev, card]);
		setSelectedCard(card);
		setPaymentView("card-list");
	};

	const handleSelectCard = (card: UserCard) => {
		setSelectedCard(card);
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
						setPaymentMethod("pix");
						setPaymentView("pix");
					}}
					disabled={paymentView === "pix"}
				>
					PIX
				</button>
				<button
					onClick={() => {
						setPaymentMethod("card");
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
