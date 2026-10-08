import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "./AdminProductModal.module.css";
import type { CreateProductData, ProductData } from "../../../types/api/admin/products";
import Field from "../../form/Field";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createProduct } from "../../../services/api/admin/products";

interface AdminProductModalProps {
	product: ProductData | null;
	onAdd: (data: CreateProductData) => void;
	onClose: () => void;
}

interface ProductFormData {
	name: string;
	stock: string;
	price: string;
	description: string;
}

// interface ImageData {
// 	id: number;
// 	position: number;
// 	url: string;
// }

interface NewImageData {
	file: File;
	preview: string;
}

export default function AdminProductModal({ product, onAdd, onClose }: AdminProductModalProps) {
	const [formData, setFormData] = useState<ProductFormData>({
		name: product?.name ?? "",
		stock: product ? String(product.stock) : "",
		price: product?.price ?? "",
		description: product?.description ?? "",
	});
	// const [existingImages, setExistingImages] = useState<ImageData[]>(product?.productImages ?? []);
	const [newImages, setNewImages] = useState<NewImageData[]>([]);

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;

		const file = e.target.files[0];

		const image = {
			file,
			preview: URL.createObjectURL(file),
		};

		setNewImages((prev) => [...prev, { ...image }]);
		e.target.value = "";
	};

	const handleDeleteNew = (preview: string) => {
		URL.revokeObjectURL(preview);
		setNewImages((prev) => prev.filter((image) => image.preview !== preview));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const body = new FormData();

		const imagesMeta = newImages.map((image, index) => {
			const tempId = "tempId" + index;

			body.append(tempId, image.file);

			return {
				tempId,
				position: index,
			};
		});

		body.append("name", formData.name);
		body.append("stock", formData.stock);
		body.append("price", formData.price);
		body.append("description", formData.description);
		body.append("imagesMeta", JSON.stringify(imagesMeta));

		try {
			const data = await createProduct(body);

			onAdd(data);
		} catch (error) {
			alert(getErrorMessage(error));
		}
	};

	return (
		<AnimatePresence>
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
					<h2>{product ? "Atualizar" : "Criar"} produto</h2>

					<form onSubmit={handleSubmit}>
						<div className={styles.formFields}>
							<Field
								label="Nome do produto"
								name="name"
								value={formData.name}
								handleChange={handleChange}
								placeholder="Ex: Blusa Laranja"
							/>

							<div className={styles.inlineInputs}>
								<Field
									label="Estoque"
									name="stock"
									value={formData.stock}
									handleChange={handleChange}
									placeholder="Ex: 50"
								/>

								<div className={styles.priceField}>
									<label htmlFor="price">Preço (R$)</label>

									<input
										id="price"
										name="price"
										value={formData.price}
										onChange={(e) => handleChange(e.target.name, e.target.value)}
										placeholder="Ex: 150,00"
									/>
								</div>
							</div>

							<div className={styles.descriptionField}>
								<label htmlFor="description">Descrição do produto</label>
								<textarea
									id="description"
									name="description"
									value={formData.description}
									onChange={(e) => handleChange(e.target.name, e.target.value)}
									placeholder="Blusa laranja tamanho G"
								/>
							</div>

							<div className={styles.imagesField}>
								<label>Imagens do produto (máx. 6)</label>

								<ul>
									{/* {existingImages.map((image) => (
										<li
											key={image.id}
											className={styles.imagePreview}
										>
											<img
												src={image.url}
												alt={product?.name}
											/>

											<button type="button">
												<IoClose size={20} />
											</button>
										</li>
									))} */}

									{newImages.map((image) => (
										<li
											key={image.preview}
											className={styles.imagePreview}
										>
											<img
												src={image.preview}
												alt={product?.name}
											/>

											<button
												type="button"
												aria-label="Remover imagem"
												onClick={() => handleDeleteNew(image.preview)}
											>
												<IoClose size={20} />
											</button>
										</li>
									))}

									<li className={styles.imageInput}>
										<label>
											<input
												type="file"
												accept="image/png, image/jpeg"
												onChange={handleAddImage}
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
								{product ? "Atualizar" : "Criar"} produto
							</button>
							<button
								type="button"
								className={styles.secondaryButton}
								onClick={onClose}
							>
								Cancelar
							</button>
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
