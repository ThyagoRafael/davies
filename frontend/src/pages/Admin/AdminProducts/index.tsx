import { AiOutlinePlusCircle } from "react-icons/ai";
import styles from "./AdminProducts.module.css";
import imagemTeste from "../../../assets/imagem-teste.png";
import { formatMoney } from "../../../utils/formatMoney";

export default function AdminProducts() {
	return (
		<main>
			<header>
				<h1>Produtos</h1>
			</header>

			<section>
				<div>
					<button>
						<AiOutlinePlusCircle size={16} />
						<span>Criar novo produto</span>
					</button>
				</div>

				<ul className={styles.list}>
					{[1, 2, 3].map((item) => (
						<li key={item}>
							<div className={styles.container}>
								<div className={styles.imageWrapper}>
									<img
										src={imagemTeste}
										alt=""
									/>
								</div>
								<div className={styles.descriptionContainer}>
									<h3>{"Produto tal azul"}</h3>

									<footer className={styles.descriptionFooter}>
										<p>Estoque: {50}</p>
										<strong>{formatMoney("225.00")}</strong>
									</footer>
								</div>
							</div>
						</li>
					))}
				</ul>
			</section>
		</main>
	);
}
