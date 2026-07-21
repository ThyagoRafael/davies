import { formatPrice } from "../../../../../utils/formatPrice";

export default function OrderItemCard() {
	return (
		<div>
			<img
				src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
				alt="Uma imagem"
			/>
			<div>
				<h3>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</h3>

				<footer>
					<p>Quantidade: 1</p>
					<strong>{formatPrice("150.00")}</strong>
				</footer>
			</div>
		</div>
	);
}
