import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { formatZipCode } from "../../../../utils/formatZipCode";
import imageTeste from "../../../../assets/imagem-teste.png";
import { formatPrice } from "../../../../utils/formatPrice";
import styles from "./Details.module.css";
import PriceCard from "../../../../components/order/PriceCard";
import PaymentCard from "../../../../components/order/PaymentCard";

export default function OrderDetails() {
	// const { orderId } = useParams();

	return (
		<section className={styles.container}>
			<div className={styles.linkContainer}>
				<Link to="/usuario/pedidos">
					<FaArrowLeft />
					<span>Seus pedidos</span>
				</Link>
			</div>

			<header className={styles.header}>
				<h1>Detalhes do pedido</h1>
			</header>

			<section className={styles.detailsContainer}>
				<header className={styles.detailsHeader}>
					<h2>Pedido entregue em 19/08/2026</h2>

					<div>
						<p>Pedido realizado em 15/08/2026</p>
						<p>Código do pedido #PED-00000</p>
					</div>
				</header>

				<PriceCard
					priceData={{
						itemsPrice: "150.00",
						shippingPrice: "5.00",
						totalPrice: "155.00",
					}}
				/>

				<PaymentCard
					paymentMethod="card"
					selectedCard={{}}
				/>

				<section className={styles.detailsSection}>
					<h2>Endereço de entrega</h2>

					<article className={styles.addressContent}>
						<h3>
							<span>João Batista</span>
							<span>-</span>
							<span>{formatPhoneNumber("61912345678")}</span>
						</h3>

						<address>Quadra 10 Rua 12 Bloco B 04, Ceilândia - DF, {formatZipCode("12345678")}</address>
					</article>
				</section>

				<section className={styles.detailsSection}>
					<h2>Itens do pedido</h2>

					<ul className={styles.itemsList}>
						{[1, 2, 3].map((item) => (
							<li key={item}>
								<div className={styles.itemContent}>
									<div className={styles.imageWrapper}>
										<img
											src={imageTeste}
											alt=""
										/>
									</div>
									<div>
										<h3>Camisa azul</h3>

										<footer>
											<p>Quantidade: 3</p>
											<strong>{formatPrice("150.00")}</strong>
										</footer>
									</div>
								</div>
							</li>
						))}
					</ul>
				</section>
			</section>
		</section>
	);
}
