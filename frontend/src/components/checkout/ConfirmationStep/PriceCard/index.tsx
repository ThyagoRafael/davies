import { formatPrice } from "../../../../utils/formatPrice";

export default function PriceCard() {
	return (
		<dl>
			<div>
				<dt>Itens</dt>
				<dd>{formatPrice("150.00")}</dd>
			</div>
			<div>
				<dt>Frete</dt>
				<dd>{formatPrice("20.00")}</dd>
			</div>
			<div>
				<dt>
					<strong>Total</strong>
				</dt>
				<dd>
					<strong>{formatPrice("170.00")}</strong>
				</dd>
			</div>
		</dl>
	);
}
