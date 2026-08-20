import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import imageTeste from "../../../../assets/imagem-teste.png";
import styles from "./Details.module.css";
import PriceCard from "../../../../components/order/PriceCard";
import type { PaymentStatus } from "../../../../types/api/payment";
import AddressCard from "../../../../components/order/AddressCard";
import OrderItemsContainer from "../../../../components/order/OrderItemsContainer";

export default function OrderDetails() {
	// const { orderId } = useParams();
	const paymentStatusText: Record<PaymentStatus, string> = {
		pending: "Aguardando pagamento",
		paid: "Pagamento aprovado",
		failed: "Pagamento falhou",
		expired: "Pagamento expirado",
		canceled: "Pagamento cancelado",
	};

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
					<div className={styles.orderInfo}>
						<h2>Pedido entregue em 19/08/2026</h2>

						<div>
							<p>Pedido realizado em 15/08/2026</p>
							<p>Código do pedido #PED-00000</p>
						</div>
					</div>

					<PriceCard
						priceData={{
							itemsPrice: "150.00",
							shippingPrice: "5.00",
							totalPrice: "155.00",
						}}
					/>
				</header>

				<section className={styles.detailsSection}>
					<h2>Pagamento</h2>

					<article className={styles.paymentCard}>
						<header className={styles.paymentHeader}>
							<h3>
								Cartão - {"visa"} ****{"1234"}
							</h3>
							<span>{paymentStatusText["pending"]}</span>
						</header>

						<p className={styles.cardHolder}>{"José de Alcântara"}</p>
					</article>
				</section>

				<AddressCard
					selectedAddress={{
						id: 1,
						addressComplement: "",
						city: "Ceilândia",
						number: "04",
						receiverName: "José",
						receiverPhone: "61912345678",
						state: "DF",
						street: "Rua tal",
						zipCode: "12345678",
					}}
				/>

				<OrderItemsContainer
					items={[{ id: 1, name: "Produto teste", imageUrl: imageTeste, price: "105.00", quantity: 8 }]}
				/>
			</section>
		</section>
	);
}
