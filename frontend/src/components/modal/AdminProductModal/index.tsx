import { AnimatePresence, motion } from "framer-motion";
import { FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import styles from "./AdminProductModal.module.css";
import type {
	CreateProductData,
	ProductData,
	ToggleProductStatusData,
	UpdateProductData,
} from "../../../types/api/admin/products";
import Field from "../../form/Field";
import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { createProduct, toggleProductStatus, updateProduct } from "../../../services/api/admin/products";

interface AdminProductModalProps {
	product: ProductData | null;
	onAdd: (data: CreateProductData) => void;
	onUpdate: (data: UpdateProductData) => void;
	onToggleStatus: (data: ToggleProductStatusData) => void;
	onClose: () => void;
}

interface ProductFormData {
	name: string;
	stock: string;
	price: string;
	description: string;
}

interface ExistingImageData {
	kind: "existing";
	id: number;
	url: string;
}

interface NewImageData {
	kind: "new";
	tempId: string;
	file: File;
	preview: string;
}

type ImagesData = (ExistingImageData | NewImageData)[];

export default function AdminProductModal({
	product,
	onAdd,
	onUpdate,
	onToggleStatus,
	onClose,
}: AdminProductModalProps) {
	const isEditing = !!product;

	const [formData, setFormData] = useState<ProductFormData>({
		name: product?.name ?? "",
		stock: product ? String(product.stock) : "",
		price: product?.price ?? "",
		description: product?.description ?? "",
	});
	const [images, setImages] = useState<ImagesData>(() =>
		(product?.productImages ?? []).map((img) => ({
			kind: "existing" as const,
			id: img.id,
			url: img.url,
		})),
	);
	const [deletedImages, setDeletedImages] = useState<number[]>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAddImage = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const image: NewImageData = {
			kind: "new",
			tempId: crypto.randomUUID(),
			file,
			preview: URL.createObjectURL(file),
		};

		setImages((prev) => [...prev, image]);
		e.target.value = "";
	};

	const handleDeleteImage = (imageData: ExistingImageData | NewImageData) => {
		if (imageData.kind === "new") {
			URL.revokeObjectURL(imageData.preview);
		} else {
			setDeletedImages((prev) => [...prev, imageData.id]);
		}

		setImages((prev) => prev.filter((image) => image !== imageData));
	};

	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const body = new FormData();

		body.append("name", formData.name);
		body.append("stock", formData.stock);
		body.append("price", formData.price);
		body.append("description", formData.description);

		try {
			setLoading(true);

			let data;

			if (isEditing) {
				const reorder = images.map((image, index) => {
					if (!("file" in image)) {
						return {
							...image,
							position: index,
						};
					}

					body.append(image.tempId, image.file);

					return {
						tempId: image.tempId,
						position: index,
					};
				});

				const imagesAction = { destroy: deletedImages, reorder };

				body.append("imagesAction", JSON.stringify(imagesAction));

				data = await updateProduct(product.id, body);
				onUpdate(data);
			} else {
				const imagesMeta = images.map((image, index) => {
					if (!("file" in image)) return;

					body.append(image.tempId, image.file);

					return {
						tempId: image.tempId,
						position: index,
					};
				});

				body.append("imagesMeta", JSON.stringify(imagesMeta));

				data = await createProduct(body);
				onAdd(data);
			}
		} catch (error) {
			alert(getErrorMessage(error));
		} finally {
			setLoading(false);
		}
	};

	const handleToggleProductStatus = async () => {
		if (!product) return;

		try {
			setLoading(true);

			const data = await toggleProductStatus(product.id);

			onToggleStatus(data);
		} catch (error) {
			alert(getErrorMessage(error));
		} finally {
			setLoading(false);
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
									{images.map((image) => (
										<li
											key={image.kind === "existing" ? image.id : image.tempId}
											className={styles.imagePreview}
										>
											<img
												src={image.kind === "existing" ? image.url : image.preview}
												alt={product?.name}
											/>

											<button
												type="button"
												aria-label="Remover produto"
												onClick={() => handleDeleteImage(image)}
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
								disabled={loading}
							>
								{product ? "Atualizar" : "Criar"} produto
							</button>
							<button
								type="button"
								className={styles.secondaryButton}
								onClick={onClose}
								disabled={loading}
							>
								Cancelar
							</button>
							{isEditing && (
								<button
									type="button"
									className={styles.terciaryButton}
									onClick={handleToggleProductStatus}
									disabled={loading}
								>
									{product.status === "active" ? "Desativar" : "Ativar"} produto
								</button>
							)}
						</div>
					</form>
				</motion.div>
			</motion.div>
		</AnimatePresence>
	);
}
