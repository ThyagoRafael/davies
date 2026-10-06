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
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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
					<button
						className={styles.actionButton}
						onClick={() => setIsModalOpen(true)}
					>
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
				{isModalOpen && (
					<motion.div
						className={styles.overlay}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<motion.div
							className={styles.modalContainer}
							initial={{ scale: 0.9, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.9, opacity: 0 }}
							transition={{ duration: 0.3 }}
						>
							<h2>Criar produto</h2>

							<form>
								<div className={styles.formFields}>
									<Field
										label="Nome do produto"
										name="name"
										handleChange={(name, value) => {
											console.log(name, value);
										}}
										placeholder="Ex: Blusa Laranja"
									/>

									<div className={styles.inlineInputs}>
										<Field
											label="Estoque"
											name="stock"
											handleChange={(name, value) => {
												console.log(name, value);
											}}
											placeholder="Ex: 50"
										/>

										<div className={styles.priceField}>
											<label htmlFor="price">Preço (R$)</label>

											<input
												id="price"
												placeholder="Ex: 150,00"
											/>
										</div>
									</div>

									<div className={styles.descriptionField}>
										<label htmlFor="description">Descrição do produto</label>
										<textarea
											id="description"
											placeholder="Blusa laranja tamanho G"
										/>
									</div>

									<div className={styles.imagesField}>
										<label>Imagens do produto (máx. 6)</label>

										<ul>
											{[1, 2, 3, 4].map((item) => (
												<li
													key={item}
													className={styles.imagePreview}
												>
													<img
														src={imagemTeste}
														alt=""
													/>

													<button type="button">
														<IoClose size={20} />
													</button>
												</li>
											))}

											<li className={styles.imageInput}>
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
								</div>

								<div className={styles.formButtonsContainer}>
									<button
										type="submit"
										className={styles.primaryButton}
									>
										Criar produto
									</button>
									<button
										type="button"
										className={styles.secondaryButton}
										onClick={() => setIsModalOpen(false)}
									>
										Cancelar
									</button>
								</div>
							</form>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</main>
	);
}
