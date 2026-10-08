import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./AdminProducts.module.css";
import { formatMoney } from "../../../utils/formatMoney";
import { useEffect, useState } from "react";
import type { CreateProductData, ProductData, ProductsList } from "../../../types/api/admin/products";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { getProductData, getProductsList } from "../../../services/api/admin/products";
import AdminProductModal from "../../../components/modal/AdminProductModal";

interface ModalData {
	mode: "create" | "update";
	product?: ProductData;
}

export default function AdminProducts() {
	const [products, setProducts] = useState<ProductsList>([]);
	const [modalData, setModalData] = useState<ModalData | null>(null);

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

	const handleOpenModal = async (id?: number) => {
		if (!id) {
			setModalData({ mode: "create" });
			return;
		}

		try {
			const data = await getProductData(id);

			setModalData({ mode: "update", product: data });
		} catch (error) {
			alert(getErrorMessage(error));
		}
	};

	const handleAddProduct = (data: CreateProductData) => {
		setProducts((prev) => [
			{
				id: data.id,
				name: data.name,
				stock: data.stock,
				price: data.price,
				imageUrl: data.productImages[0].url,
			},
			...prev,
		]);

		setModalData(null);
	};

	return (
		<main className={styles.container}>
			<header className={styles.header}>
				<h1>Produtos</h1>
			</header>

			<section className={styles.productsSection}>
				<div className={styles.actionButtonContainer}>
					<button
						className={styles.actionButton}
						onClick={() => handleOpenModal()}
					>
						<AiOutlinePlusCircle size={16} />
						<span>Criar novo produto</span>
					</button>
				</div>

				<ul className={styles.list}>
					{products.map((product) => (
						<li key={product.id}>
							<button
								className={styles.productCard}
								onClick={() => handleOpenModal(product.id)}
							>
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
							</button>
						</li>
					))}
				</ul>
			</section>

			{modalData && (
				<AdminProductModal
					product={modalData.product ? modalData.product : null}
					onAdd={handleAddProduct}
					onClose={() => setModalData(null)}
				/>
			)}
		</main>
	);
}
