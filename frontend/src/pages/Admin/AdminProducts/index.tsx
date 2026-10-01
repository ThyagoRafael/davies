import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./AdminProducts.module.css";
import { formatMoney } from "../../../utils/formatMoney";
import { useEffect, useState } from "react";
import type { ProductsList } from "../../../types/api/admin/products";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getProductsList } from "../../../services/api/admin/products";

export default function AdminProducts() {
	const [products, setProducts] = useState<ProductsList>([]);

	useEffect(() => {
		const loadProducts = async () => {
			try {
				const data = await getProductsList();
				setProducts(data);
			} catch (error) {
				alert(getErrorMessage(error));
			}
		};

		loadProducts();
	}, []);

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<h1>Produtos</h1>
			</header>

			<section className={styles.productsSection}>
				<div className={styles.actionButtonContainer}>
					<button className={styles.actionButton}>
						<AiOutlinePlusCircle size={16} />
						<span>Criar novo produto</span>
					</button>
				</div>

				<ul className={styles.list}>
					{products.map((product) => (
						<li key={product.id}>
							<div className={styles.productCard}>
								<div className={styles.imageWrapper}>
									<img
										src={product.imageUrl}
										alt={product.name}
									/>
								</div>
								<div className={styles.descriptionContainer}>
									<h3>{product.name}</h3>

									<footer className={styles.descriptionFooter}>
										<p>Estoque: {product.stock}</p>
										<strong>{formatMoney(product.price)}</strong>
									</footer>
								</div>
							</div>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
