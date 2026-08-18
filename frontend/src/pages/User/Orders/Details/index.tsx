import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { formatZipCode } from "../../../../utils/formatZipCode";
import imageTeste from "../../../../assets/imagem-teste.png";
import { formatPrice } from "../../../../utils/formatPrice";

export default function OrderDetails() {
	const { orderId } = useParams();

	return (
		<section>
			<Link to="/usuario/pedidos">
				<FaArrowLeft />
				Seus pedidos
			</Link>

			<header>
				<h1>Detalhes do pedido</h1>
			</header>

			<section>
				<header>
					<h2>Pedido entregue em 19/08/2026</h2>

					<div>
						<p>Pedido realizado em 15/08/2026</p>
						<p>Código do pedido #PED-00000</p>
					</div>
				</header>

				<section>
					<div>
						<dt>Itens</dt>
						<dd>R$ 150,00</dd>
					</div>

					<div>
						<dt>Frete</dt>
						<dd>R$ 20,00</dd>
					</div>

					<div>
						<dt>Total</dt>
						<dd>R$ 170,00</dd>
					</div>
				</section>

				<section>
					<h2>Pagamento</h2>

					<article>
						<div>
							<h3>Cartão - Visa ****0000</h3>

							<p>Pagamento aprovado</p>
						</div>

						<p>João R A Batista</p>
					</article>
				</section>

				<section>
					<h2>Endereço de entrega</h2>

					<article>
						<h3>
							<span>João Batista</span>
							<span>-</span>
							<span>{formatPhoneNumber("61912345678")}</span>
						</h3>

						<address>Quadra 10 Rua 12 Bloco B 04, Ceilândia - DF, {formatZipCode("12345678")}</address>
					</article>
				</section>

				<section>
					<h2>Itens do pedido</h2>

					<ul>
						{[1, 2, 3].map((item) => (
							<li key={item}>
								<div>
									<div>
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
