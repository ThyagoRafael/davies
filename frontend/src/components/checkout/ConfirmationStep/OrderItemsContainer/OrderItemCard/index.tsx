import { formatPrice } from "../../../../../utils/formatPrice";

export default function OrderItemCard() {
	return (
		<div>
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
		</div>
	);
}
