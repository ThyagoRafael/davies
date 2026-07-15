import { useState } from "react";
import StepIndicator from "../../components/checkout/StepIndicator";
import AddressStep from "../../components/checkout/AddressStep";
import PaymentStep from "../../components/checkout/PaymentStep";
import ConfirmationStep from "../../components/checkout/ConfirmationStep";
import type { Address } from "../../types/api/address";
import type { UserCard } from "../../types/api/userCard";

export default function Checkout() {
	const [actualStep, setActualStep] = useState<1 | 2 | 3>(3);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");
	const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);

	return (
		<section>
			<header>
				<h1>Pedido</h1>
				<StepIndicator actualStep={actualStep} />
			</header>

			<hr />

			{actualStep === 1 && (
				<AddressStep
					selectedAddress={selectedAddress}
					onSelectAddress={setSelectedAddress}
					onNext={() => setActualStep(2)}
				/>
			)}

			{actualStep === 2 && (
				<PaymentStep
					paymentMethod={paymentMethod}
					selectedCard={selectedCard}
					onChangePaymentMethod={setPaymentMethod}
					onSelectCard={setSelectedCard}
					onBack={() => setActualStep(1)}
					onNext={() => setActualStep(3)}
				/>
			)}

			{actualStep === 3 && <ConfirmationStep onBack={() => setActualStep(2)} />}
		</section>
	);
}
