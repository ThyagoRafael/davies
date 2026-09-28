import { FaArrowRight } from "react-icons/fa";
import { formatMoney } from "../../../utils/formatMoney";
import { Link } from "react-router-dom";
import styles from "./AdminDashboard.module.css";

export default function AdminDashboard() {
	const number = 0;

	return (
		<main className={styles.container}>
			<section className={styles.section}>
				<h2>Resumo</h2>

				<ul className={styles.contentList}>
					<li className={styles.listItem}>
						<h3>Total de vendas (em reais)</h3>
						<p>{formatMoney("1000.00")}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de pedidos</h3>
						<p>{20}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de produtos</h3>
						<p>{5}</p>
					</li>
					<li className={styles.listItem}>
						<h3>Total de produtos (por estoque)</h3>
						<p>{200}</p>
					</li>
				</ul>
			</section>

			<section className={styles.section}>
				<h2>Alertas</h2>

				<ul className={styles.contentList}>
					<li className={`${styles.alertItem} ${number > 0 ? styles.danger : ""}`}>
						<h3>Produtos sem estoque</h3>
						<p>{0}</p>
					</li>
					<li className={`${styles.alertItem} ${number + 1 > 0 ? styles.danger : ""}`}>
						<h3>Produtos com estoque baixo</h3>
						<p>{1}</p>
					</li>
					<li className={`${styles.alertItem} ${number > 0 ? styles.danger : ""}`}>
						<h3>Pedidos pendentes</h3>
						<p>{0}</p>
					</li>
				</ul>
			</section>

			<section className={styles.section}>
				<h2>Últimos pedidos</h2>

				<ul className={styles.contentList}>
					<li className={styles.orderCard}>
						<div className={styles.orderCardTitle}>
							<h3>{"PED-12345"}</h3>
							<p>{"Pendente"}</p>
						</div>

						<div className={styles.orderCardContent}>
							<p>{"Nome do cliente"}</p>

							<div>
								<p>{"20/02/2027"}</p>
								<p>
									<strong>{formatMoney("200.00")}</strong>
								</p>
							</div>
						</div>
					</li>

					<li className={styles.orderCard}>
						<div className={styles.orderCardTitle}>
							<h3>{"PED-12347"}</h3>
							<p>{"Em processamento"}</p>
						</div>

						<div className={styles.orderCardContent}>
							<p>{"Nome do cliente"}</p>

							<div>
								<p>{"20/02/2027"}</p>
								<p>
									<strong>{formatMoney("200.00")}</strong>
								</p>
							</div>
						</div>
					</li>

					<li className={styles.orderCard}>
						<div className={styles.orderCardTitle}>
							<h3>{"PED-12346"}</h3>
							<p>{"Em processamento"}</p>
						</div>

						<div className={styles.orderCardContent}>
							<p>{"Nome do cliente"}</p>

							<div>
								<p>{"20/02/2027"}</p>
								<p>
									<strong>{formatMoney("200.00")}</strong>
								</p>
							</div>
						</div>
					</li>
				</ul>

				<div className={styles.linkContainer}>
					<Link
						to="/admin/pedidos"
						className={styles.link}
					>
						<span>Ver todos os pedidos</span>
						<FaArrowRight size={14} />
					</Link>
				</div>
			</section>
		</main>
	);
}
