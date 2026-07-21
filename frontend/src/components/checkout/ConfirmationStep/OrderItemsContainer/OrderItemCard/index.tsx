import { formatPrice } from "../../../../../utils/formatPrice";
import styles from "./OrderItemCard.module.css";
import imagemTeste from "../../../../../assets/imagem-teste.png";

export default function OrderItemCard() {
	return (
		<div className={styles.container}>
			<div className={styles.imageWrapper}>
				<img
					src={imagemTeste}
					alt="Uma imagem"
				/>
			</div>
			<div className={styles.descriptionContainer}>
				<h3>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</h3>

				<footer className={styles.descriptionFooter}>
					<p>Quantidade: 1</p>
					<strong>{formatPrice("150.00")}</strong>
				</footer>
			</div>
		</div>
	);
}
