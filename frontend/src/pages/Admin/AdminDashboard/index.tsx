import { FaArrowRight } from "react-icons/fa";
import { formatMoney } from "../../../utils/formatMoney";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
	return (
		<main>
			<section>
				<h2>Resumo</h2>

				<ul>
					<li>
						<h3>Total de vendas (em reais)</h3>
						<p>{formatMoney("1000.00")}</p>
					</li>
					<li>
						<h3>Total de pedidos</h3>
						<p>{20}</p>
					</li>
					<li>
						<h3>Total de produtos</h3>
						<p>{5}</p>
					</li>
					<li>
						<h3>Total de produtos (por estoque)</h3>
						<p>{200}</p>
					</li>
				</ul>
			</section>

			<section>
				<h2>Alertas</h2>

				<ul>
					<li>
						<h3>Produtos sem estoque</h3>
						<p>{0}</p>
					</li>
					<li>
						<h3>Produtos com estoque baixo</h3>
						<p>{1}</p>
					</li>
					<li>
						<h3>Pedidos pendentes</h3>
						<p>{0}</p>
					</li>
				</ul>
			</section>

			<section>
				<h2>Últimos pedidos</h2>

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
								<p>{formatMoney("200.00")}</p>
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
								<p>{formatMoney("200.00")}</p>
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
								<p>{formatMoney("200.00")}</p>
							</div>
						</div>
					</li>

					<Link to="/admin/pedidos">
						<span>Ver todos os pedidos</span>
						<FaArrowRight size={14} />
					</Link>
				</ul>
			</section>
		</main>
	);
}
