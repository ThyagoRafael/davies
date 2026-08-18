import { formatPrice } from "../../../utils/formatPrice";
import styles from "./Orders.module.css";

export default function Orders() {
	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1>Seus pedidos</h1>
			</header>

			<ul className={styles.ordersContainer}>
				{[1, 2, 3].map((item) => (
					<li key={item}>
						<article className={styles.orderCard}>
							<div className={styles.orderHeader}>
								<h2>Pedido #PED-00000</h2>
								<p role="status">Entregue</p>
							</div>

							<div className={styles.orderContent}>
								<div className={styles.itemsContent}>
									<p className={styles.quantity}>3 itens</p>
									<p
										className={styles.preview}
										title="Camisa azul, Calça rosa, Tênis branco, Boné preto, Camisa branca"
									>
										Camisa azul, Calça rosa, Tênis branco, Boné preto, Camisa branca
									</p>
								</div>

								<strong>{formatPrice("554.98")}</strong>
							</div>
						</article>
					</li>
				))}
			</ul>
		</section>
	);
}
