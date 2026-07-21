import { useEffect, useState } from "react";
import StepIndicator from "../../components/checkout/StepIndicator";
import AddressStep from "../../components/checkout/AddressStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import ConfirmationStep from "../../components/checkout/ConfirmationStep";
import type { Address } from "../../types/api/address";
import type { UserCard } from "../../types/api/userCard";
import { getUserAddresses } from "../../services/api/address";
import { getUserCards } from "../../services/api/userCard";
import styles from "./Checkout.module.css";

export default function Checkout() {
	const [actualStep, setActualStep] = useState<1 | 2 | 3>(1);
	const [userAddresses, setUserAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [userCards, setUserCards] = useState<UserCard[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");
	const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);

	useEffect(() => {
		const loadData = async () => {
			try {
				const [addresses, cards] = await Promise.all([getUserAddresses(), getUserCards()]);

				setUserAddresses(addresses);
				setUserCards(cards);

				if (addresses.length > 0) {
					setSelectedAddress(addresses[0]);
				}

				if (cards.length > 0) {
					setSelectedCard(cards[0]);
				}
			} catch (error) {
				console.error(error);
			}
		};

		loadData();
	}, []);

	return (
		<section className={styles.container}>
			<header>
				<h1>Pedido</h1>
				<StepIndicator actualStep={actualStep} />
			</header>

			<hr className={styles.line} />

			{actualStep === 1 && (
				<AddressStep
					addresses={userAddresses}
					selectedAddress={selectedAddress}
					onSelectAddress={setSelectedAddress}
					onChangeAddresses={setUserAddresses}
					onNext={() => setActualStep(2)}
				/>
			)}

			{actualStep === 2 && (
				<PaymentStep
					userCards={userCards}
					paymentMethod={paymentMethod}
					selectedCard={selectedCard}
					onChangeUserCards={setUserCards}
					onChangePaymentMethod={setPaymentMethod}
					onSelectCard={setSelectedCard}
					onBack={() => setActualStep(1)}
					onNext={() => setActualStep(3)}
				/>
			)}

			{actualStep === 3 && (
				<ConfirmationStep
					selectedAddress={selectedAddress}
					paymentMethod={paymentMethod}
					selectedCard={selectedCard}
					onBack={() => setActualStep(2)}
				/>
			)}
		</section>
	);
}
