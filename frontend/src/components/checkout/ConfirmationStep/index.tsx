import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatPrice } from "../../../utils/formatPrice";
import { formatZipCode } from "../../../utils/formatZipCode";
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
								<div>
									<p>{selectedCard.holderName}</p>
									<p>Expira em {selectedCard.expiryDate}</p>
								</div>
							</>
						)
					)}
				</article>
			</section>

			<section>
				<header>
					<h2>Endereço de entrega</h2>
				</header>

				{selectedAddress && (
					<div>
						<p>
							<strong>{selectedAddress.receiverName}</strong> -{" "}
							{formatPhoneNumber(selectedAddress.receiverPhone)}
						</p>

						<address>
							{selectedAddress.street}
							{selectedAddress.addressComplement && ` ${selectedAddress.addressComplement}`},{" "}
							{selectedAddress.number}, {selectedAddress.city} - {selectedAddress.state},{" "}
							{formatZipCode(selectedAddress.zipCode)}
						</address>
					</div>
				)}
			</section>

			<section>
				<header>
					<h2>Itens do pedido</h2>
				</header>

				<ul>
					<li>
						<div>
							<img
								src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
								alt="Uma imagem"
							/>
						</div>
						<div>
							<p>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</p>

							<div>
								<p>Quantidade: 1</p>
								<strong>{formatPrice("150.00")}</strong>
							</div>
						</div>
					</li>
					<li>
						<div>
							<img
								src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
								alt="Uma imagem"
							/>
						</div>
						<div>
							<p>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</p>

							<div>
								<p>Quantidade: 1</p>
								<strong>{formatPrice("150.00")}</strong>
							</div>
						</div>
					</li>
				</ul>
			</section>

			<footer>
				<button>Confirmar pedido</button>
				<button onClick={onBack}>Voltar para pagamento</button>
			</footer>
		</section>
	);
}
