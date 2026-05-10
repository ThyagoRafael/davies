import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Home.module.css";
import type { Product } from "../../types/Product";
import { formatPrice } from "../../utils/formatPrice";
import { getAllProducts } from "../../services/api/products";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllProducts();
			setProducts(data);
		};

		fetchData();
	}, []);

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1 className={styles.title}>Vitrine</h1>
				<h2 className={styles.subtitle}>Aproveite nossas peças com os melhores preços</h2>
			</header>

			<ul className={styles.productsList}>
				{products.length > 0 ? (
					products.map((product) => (
						<li key={product.id}>
							<article className={styles.productCard}>
								<Link to={`/produtos/${product.id}`}>
									<div className={styles.productImage}>
										<img
											src={product.productImages[0].url}
											alt={`Foto de ${product.name}`}
										/>
									</div>

									<h3 className={styles.productName}>{product.name}</h3>
								</Link>

								<p className={styles.productPrice}>
									<strong>{formatPrice(product.price)}</strong>
								</p>
							</article>
						</li>
					))
				) : (
					<p>Não há produtos disponíveis</p>
				)}
			</ul>
		</section>
	);
}
