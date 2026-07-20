import type { UserCard } from "../../../../types/api/userCard";

interface PaymentCardProps {
	paymentMethod: "pix" | "card";
	selectedCard: UserCard | null;
}

export default function PaymentCard({ paymentMethod, selectedCard }: PaymentCardProps) {
	return (
		<section>
			<header>
				<h2>Pagamento</h2>
			</header>

			<article>
				{paymentMethod === "pix" ? (
					<>
						<h3>PIX</h3>
						<p>O código PIX gerado para pagamento é válido por 30 minutos após a finalização do pedido.</p>
					</>
				) : (
					selectedCard && (
						<>
							<h3>
								Cartão - {selectedCard.cardBrand} ****{selectedCard.lastDigits}
							</h3>
							<p>
								<span>{selectedCard.holderName}</span>
								<span>Expira em {selectedCard.expiryDate}</span>
							</p>
						</>
					)
				)}
			</article>
		</section>
	);
}
