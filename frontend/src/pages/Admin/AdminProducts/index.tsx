import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./AdminProducts.module.css";
import { formatMoney } from "../../../utils/formatMoney";
import { useEffect, useState } from "react";
import type { ProductsList } from "../../../types/api/admin/products";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getProductsList } from "../../../services/api/admin/products";
import { AnimatePresence, motion } from "framer-motion";
import Field from "../../../components/form/Field";
import imagemTeste from "../../../assets/imagem-teste.png";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

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

			<AnimatePresence>
				<motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					exit={{ scale: 0 }}
					transition={{ duration: 0.3 }}
				>
					<h1>Criar produto</h1>

					<form>
						<Field
							label="Nome do produto"
							name="name"
							handleChange={(name, value) => {
								console.log(name, value);
							}}
							placeholder="Ex: Blusa Laranja"
						/>

						<div>
							<Field
								label="Estoque"
								name="stock"
								handleChange={(name, value) => {
									console.log(name, value);
								}}
								placeholder="Ex: 50"
							/>

							<div>
								<label htmlFor="price">Preço</label>

								<div>
									<div>
										<p>R$</p>
									</div>

									<input
										id="price"
										placeholder="150,00"
									/>
								</div>
							</div>
						</div>

						<div>
							<label htmlFor="description">Descrição do produto</label>
							<textarea
								id="description"
								placeholder="Blusa laranja tamanho G"
							/>
						</div>

						<div>
							<label>Imagens do produto (máx. 6)</label>

							<ul>
								{[1, 2, 3, 4].map((item) => (
									<li key={item}>
										<img
											src={imagemTeste}
											alt=""
										/>

										<button>
											<IoClose />
										</button>
									</li>
								))}
								<li>
									<label>
										<input
											type="file"
											accept="image/png, image/jpeg"
										/>

										<FaPlus size={24} />
									</label>
								</li>
							</ul>
						</div>

						<div>
							<button type="submit">Criar produto</button>
							<button type="button">Cancelar</button>
						</div>
					</form>
				</motion.div>
			</AnimatePresence>
		</main>
	);
}
