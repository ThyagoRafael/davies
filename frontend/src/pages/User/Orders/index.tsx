import { formatPrice } from "../../../utils/formatPrice";

export default function Orders() {
	return (
		<section>
			<header>
				<h1>Seus pedidos</h1>
			</header>

			<ul>
				{[1, 2, 3].map((item) => (
					<li key={item}>
						<div>
							<p>Pedido #PED-00000</p>
							<p>Entregue</p>
						</div>

						<div>
							<p>Entregue em 18 de agosto</p>

							<div>
								<p>3 itens</p>
								<p>{formatPrice("554.98")}</p>
							</div>
						</div>
					</li>
				))}
			</ul>
		</section>
	);
}
