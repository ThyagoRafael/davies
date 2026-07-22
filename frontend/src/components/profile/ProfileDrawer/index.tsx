import { IoMdClose } from "react-icons/io";
import styles from "./ProfileDrawer.module.css";

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
	if (!isOpen) return null;

	return (
		<div className={styles.overlay}>
			<div
				aria-hidden="true"
				onClick={onClose}
				className={styles.backdrop}
			>
				<button
					type="button"
					aria-label="Fechar menu"
					onClick={onClose}
					className={styles.closeButton}
				>
					<IoMdClose />
				</button>
			</div>

			<aside className={styles.drawer}>
				<div className={styles.content}>
					<header className={styles.header}>
						<p>Olá, João</p>
						<h2>
							<button>Sua conta</button>
						</h2>
					</header>

					<nav className={styles.navigation}>
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

					<footer className={styles.footer}>
						<button type="button">Sair da conta</button>
					</footer>
				</div>
			</aside>
		</div>
	);
}
