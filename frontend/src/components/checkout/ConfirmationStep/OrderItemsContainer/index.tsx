import OrderItemCard from "./OrderItemCard";

export default function OrderItemsContainer() {
	return (
		<section>
			<header>
				<h2>Itens do pedido</h2>
			</header>

			<ul>
				<li>
					<OrderItemCard />
				</li>
				<li>
					<OrderItemCard />
				</li>
			</ul>
		</section>
	);
}
