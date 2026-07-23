import { Link } from "react-router-dom";
import approved from "../../../assets/approved.png";
import styles from "./OrderConfirmation.module.css";

export default function OrderConfirmation() {
	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1>Pedido confirmado</h1>

				<div className={styles.confirmation}>
					<img
						src={approved}
						alt=""
						aria-hidden="true"
					/>

					<div className={styles.confirmationContent}>
						<h2>Pedido #0000000</h2>
						<p>O pedido foi efetuado com sucesso</p>
					</div>
				</div>
			</header>

			<hr className={styles.divider} />

			<section className={styles.paymentSection}>
				<header className={styles.sectionHeader}>
					<h2>Pagamento</h2>
					<p>Você receberá um email após a confirmação do pagamento</p>
				</header>

				<article className={styles.paymentCard}>
					<header className={styles.paymentHeader}>
						<h3>Cartão - Visa ****0000</h3>
						<span>Esperando aprovação</span>
					</header>

					<p className={styles.cardHolder}>João R A Batista</p>
				</article>
			</section>

			<div className={styles.linkContainer}>
				<Link to={"/"}>Voltar para a vitrine</Link>
			</div>
		</section>
	);
}
