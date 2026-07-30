import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import AddressCard from "./AddressCard";
import OrderItemsContainer from "./OrderItemsContainer";
import PaymentCard from "./PaymentCard";
import PriceCard from "./PriceCard";
import styles from "./ConfirmationStep.module.css";
import type { CartData } from "../../../types/cart/CartData";

interface ConfirmationStepProps {
	selectedAddress: Address | null;
	paymentMethod: "pix" | "card";
	selectedCard: UserCard | null;
	cartData: CartData | null;
	onBack: () => void;
	onFinishOrder: () => void;
}

export default function ConfirmationStep({
	selectedAddress,
	paymentMethod,
	selectedCard,
	cartData,
	onBack,
	onFinishOrder,
}: ConfirmationStepProps) {
	return (
		<section className={styles.container}>
			{cartData && <PriceCard cartPrice={cartData.total} />}

			<PaymentCard
				paymentMethod={paymentMethod}
				selectedCard={selectedCard}
			/>

			<AddressCard selectedAddress={selectedAddress} />

			{cartData && <OrderItemsContainer cartItems={cartData.items} />}

			<footer className={styles.footerButtons}>
				<button
					className={styles.primaryButton}
					onClick={onFinishOrder}
				>
					Confirmar pedido
				</button>
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
