import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import AddressCard from "./AddressCard";
import OrderItemsContainer from "./OrderItemsContainer";
import PaymentCard from "./PaymentCard";
import PriceCard from "./PriceCard";

interface ConfirmationStepProps {
	selectedAddress: Address | null;
	paymentMethod: "pix" | "card";
	selectedCard: UserCard | null;
	onBack: () => void;
}

export default function ConfirmationStep({
	selectedAddress,
	paymentMethod,
	selectedCard,
	onBack,
}: ConfirmationStepProps) {
	return (
		<section>
			<PriceCard />

			<PaymentCard
				paymentMethod={paymentMethod}
				selectedCard={selectedCard}
			/>

			<AddressCard selectedAddress={selectedAddress} />

			<OrderItemsContainer />

			<footer>
				<button>Confirmar pedido</button>
				<button onClick={onBack}>Voltar para pagamento</button>
			</footer>
		</section>
	);
}
