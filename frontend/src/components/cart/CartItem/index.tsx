import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./CartItem.module.css";
import { Link } from "react-router-dom";
import type { UpdateAction } from "../../../types/cartItem/updateAction";

interface CartItemProps {
	id: number;
	name: string;
	price: string;
	stock: number;
	imageUrl: string;
	quantity: number;
	handleQuantityItem: (action: UpdateAction, productId: number) => void;
	handleDeleteItem: (productId: number) => void;
	loading: boolean;
}

export default function CartItem({
	id,
	name,
	price,
	stock,
	imageUrl,
	quantity,
	handleQuantityItem,
	handleDeleteItem,
	loading,
}: CartItemProps) {
	return (
		<article className={styles.cartItemContainer}>
			<div className={styles.imageWrapper}>
				<Link to={`/produtos/${id}`}>
					<img
						src={imageUrl}
						alt={`Foto de ${name}`}
					/>
				</Link>
			</div>

			<div className={styles.cartItemContent}>
				<p>{name}</p>

				<strong>{formatPrice(price)}</strong>

				<div>
					<p>{stock > 0 ? "Em estoque" : "Esgotado"}</p>
					<div className={styles.cartItemActions}>
						<div>
							<button
								onClick={() => handleQuantityItem("decrement", id)}
								disabled={loading || quantity <= 1}
							>
								<FaMinus size={16} />
							</button>
							<output>{quantity}</output>
							<button
								onClick={() => handleQuantityItem("increment", id)}
								disabled={loading || quantity >= stock}
							>
								<FaPlus size={16} />
							</button>
						</div>

						<button
							onClick={() => handleDeleteItem(id)}
							disabled={loading}
						>
							<FaTrash size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}
