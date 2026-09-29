import { formatMoney } from "../../../utils/formatMoney";

export default function AdminOrders() {
	return (
		<main>
			<header>
				<h1>Pedidos</h1>
			</header>

			<ul>
				<li>
					<div>
						<h3>{"PED-12345"}</h3>
						<p>{"Pendente"}</p>
					</div>

					<div>
						<p>{"Nome do cliente"}</p>

						<div>
							<p>{"20/02/2027"}</p>
							<p>
								<strong>{formatMoney("200.00")}</strong>
							</p>
						</div>
					</div>
				</li>

				<li>
					<div>
						<h3>{"PED-12347"}</h3>
						<p>{"Em processamento"}</p>
					</div>

					<div>
						<p>{"Nome do cliente"}</p>

						<div>
							<p>{"20/02/2027"}</p>
							<p>
								<strong>{formatMoney("200.00")}</strong>
							</p>
						</div>
					</div>
				</li>

				<li>
					<div>
						<h3>{"PED-12346"}</h3>
						<p>{"Em processamento"}</p>
					</div>

					<div>
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
		</main>
	);
}
