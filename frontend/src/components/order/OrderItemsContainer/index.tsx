import type { CartProduct } from "../../../types/cart/CartData";
import OrderItemCard from "./OrderItemCard";
import styles from "./OrderItemsContainer.module.css";

interface OrderItemsContainerProps {
	cartItems: CartProduct[];
}

export default function OrderItemsContainer({ cartItems }: OrderItemsContainerProps) {
	return (
		<section className={styles.container}>
			<header>
				<h2>Itens do pedido</h2>
			</header>

			<ul className={styles.list}>
				{cartItems.map((item) => (
					<li key={item.id}>
						<OrderItemCard cartItem={item} />
					</li>
				))}
			</ul>
		</section>
	);
}
