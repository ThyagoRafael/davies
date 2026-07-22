import { IoMdClose } from "react-icons/io";

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
	if (!isOpen) return null;

	return (
		<div>
			<div
				aria-hidden="true"
				onClick={onClose}
			/>

			<aside>
				<button
					type="button"
					aria-label="Fechar menu"
					onClick={onClose}
				>
					<IoMdClose />
				</button>

				<div>
					<header>
						<p>Olá, João</p>
						<h2>
							<button>Sua conta</button>
						</h2>
					</header>

					<nav>
						<ul>
							<li>
								<button>Seus pedidos</button>
							</li>
							<li>
								<button>Suas formas de pagamento</button>
							</li>
							<li>
								<button>Seus endereços</button>
							</li>
						</ul>
					</nav>

					<footer>
						<button type="button">Sair da conta</button>
					</footer>
				</div>
			</aside>
		</div>
	);
}
