import { FaMinus, FaPlus, FaTrash } from "react-icons/fa";
import { formatPrice } from "../../../utils/formatPrice";
import styles from "./CartItem.module.css";

interface CartItemProps {
	name: string;
	price: number;
	stock: number;
	imageUrl: string;
	quantity: number;
}

export default function CartItem({ name, price, stock, imageUrl, quantity }: CartItemProps) {
	return (
		<article className={styles.cartItemContainer}>
			<div className={styles.imageWrapper}>
				<img
					src={imageUrl}
					alt={`Foto de ${name}`}
				/>
			</div>

			<div className={styles.cartItemContent}>
				<p>{name}</p>

				<strong>{formatPrice(price)}</strong>

				<div>
					<p>{stock > 0 ? "Em estoque" : "Esgotado"}</p>
					<div className={styles.cartItemActions}>
						<div>
							<button>
								<FaMinus size={16} />
							</button>
							<output>{quantity}</output>
							<button>
								<FaPlus size={16} />
							</button>
						</div>

						<button>
							<FaTrash size={16} />
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}
