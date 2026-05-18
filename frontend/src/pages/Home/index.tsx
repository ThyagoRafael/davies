import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Home.module.css";
import type { Product } from "../../types/Product";
import { formatPrice } from "../../utils/formatPrice";
import { getAllProducts } from "../../services/api/products";
import { FaCartPlus } from "react-icons/fa";
import { BsCartCheck } from "react-icons/bs";
import { addToCart } from "../../services/api/cartItem";
import { AppError } from "../../errors/AppError";

export default function Home() {
	const [products, setProducts] = useState<Product[]>([]);
	const [addedToCart, setAddedToCart] = useState<Set<number>>(new Set());
	const navigate = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllProducts();

			setProducts(data);
		};

		fetchData();
	}, []);

	const handleAddToCart = async (productId: number) => {
		try {
			const data = await addToCart(productId);

			setAddedToCart((prev) => {
				const newSet = new Set(prev);
				newSet.add(productId);

				return newSet;
			});

			alert(data.message);
		} catch (error) {
			if (error instanceof AppError) {
				if (error.statusCode === 401) {
					localStorage.removeItem("user");
					navigate("/entrar");
					return;
				}

				alert(error.message);
				return;
			}

			alert("Erro inesperado");
		}
	};

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

								<div className={styles.cardFooter}>
									<p className={styles.productPrice}>
										<strong>{formatPrice(product.price)}</strong>
									</p>

									<button
										onClick={() => handleAddToCart(product.id)}
										disabled={addedToCart.has(product.id)}
									>
										{addedToCart.has(product.id) ? <BsCartCheck size={20} /> : <FaCartPlus size={20} />}
									</button>
								</div>
							</article>
						</li>
					))
				) : (
					<>
						<p>Erro ao carregar produtos</p>
						<p>Recarregue a página</p>
					</>
				)}
			</ul>
		</section>
	);
}
