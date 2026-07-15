import { formatPrice } from "../../../utils/formatPrice";

interface ConfirmationStepProps {
	onBack: () => void;
}

export default function ConfirmationStep({ onBack }: ConfirmationStepProps) {
	return (
		<section>
			<dl>
				<div>
					<dt>Itens</dt>
					<dd>{formatPrice("150.00")}</dd>
				</div>
				<div>
					<dt>Frete</dt>
					<dd>{formatPrice("20.00")}</dd>
				</div>
				<div>
					<dt>
						<strong>Total</strong>
					</dt>
					<dd>
						<strong>{formatPrice("170.00")}</strong>
					</dd>
				</div>
			</dl>

			<section>
				<header>
					<h2>Pagamento</h2>
				</header>

				<article>
					<h3>Cartão - Visa ****0000</h3>
					<p>João R A Batista</p>
					<p>Expira em 01/01/2027</p>
				</article>
			</section>

			<section>
				<header>
					<h2>Endereço de entrega</h2>
				</header>

				<div>
					<p>
						<strong>João Batista</strong> - (61) 9 1234-5678
					</p>

					<address>Quadra 10 Rua 12 Bloco B 04, Ceilândia - DF, 12345-678</address>
				</div>
			</section>

			<section>
				<header>
					<h2>Itens do pedido</h2>
				</header>

				<ul>
					<li>
						<div>
							<img
								src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
								alt="Uma imagem"
							/>
						</div>
						<div>
							<p>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</p>

							<div>
								<p>Quantidade: 1</p>
								<strong>{formatPrice("150.00")}</strong>
							</div>
						</div>
					</li>
					<li>
						<div>
							<img
								src="https://png.pngtree.com/png-vector/20190508/ourmid/pngtree-gallery-vector-icon-png-image_1028015.jpg"
								alt="Uma imagem"
							/>
						</div>
						<div>
							<p>Produto tal azul com manga longa marrom dourado amarelo preto roxo laranja</p>

							<div>
								<p>Quantidade: 1</p>
								<strong>{formatPrice("150.00")}</strong>
							</div>
						</div>
					</li>
				</ul>
			</section>

			<footer>
				<button>Confirmar pedido</button>
				<button onClick={onBack}>Voltar para pagamento</button>
			</footer>
		</section>
	);
}
