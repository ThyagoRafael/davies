import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import AddressCard from "./AddressCard";
import OrderItemsContainer from "./OrderItemsContainer";
import PaymentCard from "./PaymentCard";
import PriceCard from "./PriceCard";
import styles from "./ConfirmationStep.module.css";

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
		<section className={styles.container}>
			<PriceCard />

			<PaymentCard
				paymentMethod={paymentMethod}
				selectedCard={selectedCard}
			/>

			<AddressCard selectedAddress={selectedAddress} />

			<OrderItemsContainer />

			<footer className={styles.footerButtons}>
				<button className={styles.primaryButton}>Confirmar pedido</button>
				<button
					onClick={onBack}
					className={styles.secondaryButton}
				>
					Voltar para pagamento
				</button>
			</footer>
		</section>
	);
}
