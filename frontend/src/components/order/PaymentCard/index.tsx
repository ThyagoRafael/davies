import type { UserCard } from "../../../types/api/userCard";
import styles from "./PaymentCard.module.css";

interface PaymentCardProps {
	paymentMethod: "pix" | "card";
	selectedCard: UserCard | null;
}

export default function PaymentCard({ paymentMethod, selectedCard }: PaymentCardProps) {
	return (
		<section className={styles.container}>
			<header>
				<h2>Pagamento</h2>
			</header>

			<article className={styles.detailsContainer}>
				{paymentMethod === "pix" ? (
					<>
						<h3>PIX</h3>
						<p className={styles.pixDescription}>
							O código PIX gerado para pagamento é válido por 30 minutos após a finalização do pedido.
						</p>
					</>
				) : (
					selectedCard && (
						<>
							<h3>
								Cartão - {selectedCard.cardBrand} ****{selectedCard.lastDigits}
							</h3>
							<p className={styles.cardDescription}>
								<span className={styles.holderName}>{selectedCard.holderName}</span>
								<span className={styles.expiryDate}>
									Expira em {`${selectedCard.validateMonth}/${selectedCard.validateYear}`}
								</span>
							</p>
						</>
					)
				)}
			</article>
		</section>
	);
}
