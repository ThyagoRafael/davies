import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import AddressCard from "../../order/AddressCard";
import OrderItemsContainer from "../../order/OrderItemsContainer";
import PaymentCard from "../../order/PaymentCard";
import PriceCard from "../../order/PriceCard";
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
			{cartData && (
				<PriceCard
					priceData={{
						itemsPrice: cartData.itemsPrice,
						shippingPrice: cartData.shippingPrice,
						totalPrice: cartData.totalPrice,
					}}
				/>
			)}

			<PaymentCard
				paymentMethod={paymentMethod}
				selectedCard={selectedCard}
			/>

			<AddressCard selectedAddress={selectedAddress} />

			{cartData && (
				<OrderItemsContainer
					items={cartData.items.map((item) => ({
						id: item.id,
						name: item.name,
						imageUrl: item.imageUrl,
						quantity: item.quantity,
						unitPrice: item.price,
					}))}
				/>
			)}

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
