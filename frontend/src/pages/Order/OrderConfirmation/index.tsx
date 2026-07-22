import approved from "../../../assets/approved.png";

export default function OrderConfirmation() {
	return (
		<section>
			<header>
				<h1>Pedido confirmado</h1>

				<div>
					<img
						src={approved}
						alt=""
						aria-hidden="true"
					/>

					<div>
						<p>Pedido #0000000</p>
						<p>O pedido foi efetuado com sucesso</p>
					</div>
				</div>
			</header>

			<hr />

			<section>
				<header>
					<h2>Pagamento</h2>
					<p>Você receberá um email após a confirmação do pagamento</p>
				</header>

				<article>
					<header>
						<h3>Cartão - Visa ****0000</h3>
						<span>Esperando aprovação</span>
					</header>

					<p>João R A Batista</p>
				</article>
			</section>
		</section>
	);
}
