import { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import { formatPrice } from "../../utils/formatPrice";
import styles from "./Cart.module.css";

const data = {
	items: [
		{
			id: 1,
			name: "Blusa manga longa asjndd oansdasld ojandslkac aosnjdlaknc as nadl",
			price: 123.99,
			stock: 20,
			imageUrl: "https://img.lojasrenner.com.br/item/624639321/original/14.jpg",
			quantity: 2,
		},
		{
			id: 2,
			name: "Saia longa asdcjnasjd  kajsdkan s naaadkansdj sakjdnbacs aksjnadkc",
			price: 123.99,
			stock: 0,
			imageUrl:
				"https://www.lojastyleme.com.br/cdn/shop/files/Saia-Longa-Rodada-Camadas-Fenda-lisa-marinho_2.jpg?v=1693952689&width=1445",
			quantity: 2,
		},
		{
			id: 3,
			name: "Blusa manga curta aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
			price: 123.99,
			stock: 15,
			imageUrl: "https://danielatombini.vteximg.com.br/arquivos/ids/315138/3390E_Z005.jpg?v=638532900633800000",
			quantity: 2,
		},
	],
	total: 460.97,
};

export default function Cart() {
	const [cartData, setCartData] = useState();

	useEffect(() => {
		// const
	}, []);

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1>Carrinho</h1>
			</header>

			<div className={styles.totalContainer}>
				<span>Total</span>
				<strong>{formatPrice(data.total)}</strong>
			</div>

			<div className={styles.clearButtonContainer}>
				<button>Remover todos os produtos</button>
			</div>

			<ul className={styles.itemsList}>
				{data.items.map((item) => (
					<li key={item.id}>
						<CartItem
							name={item.name}
							price={item.price}
							stock={item.stock}
							imageUrl={item.imageUrl}
							quantity={item.quantity}
						/>
					</li>
				))}
			</ul>

			<div className={styles.checkoutButtonContainer}>
				<button>Finalizar pedido ({data.items.length} itens)</button>
			</div>
		</section>
	);
}
