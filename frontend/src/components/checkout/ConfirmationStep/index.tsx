import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import { formatPrice } from "../../../utils/formatPrice";
import AddressCard from "./AddressCard";
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
