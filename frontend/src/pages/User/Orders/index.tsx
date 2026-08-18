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
						<article>
							<div>
								<h2>Pedido #PED-00000</h2>
								<p role="status">Entregue</p>
							</div>

							<div>
								<p>3 itens</p>
								<strong>{formatPrice("554.98")}</strong>
							</div>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}
