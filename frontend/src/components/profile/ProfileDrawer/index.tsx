import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ProfileDrawer.module.css";

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className={styles.overlay}>
					<motion.div
						className={styles.backdrop}
						aria-hidden="true"
						onClick={onClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.2 }}
					>
						<motion.button
							type="button"
							aria-label="Fechar menu"
							onClick={onClose}
							className={styles.closeButton}
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							exit={{ opacity: 0 }}
						>
							<IoMdClose />
						</motion.button>
					</motion.div>

					<motion.aside
						className={styles.drawer}
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{
							duration: 0.1,
							ease: "easeOut",
						}}
					>
						<div className={styles.content}>
							<div className={styles.mainContent}>
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
							</div>

							<footer className={styles.footer}>
								<button type="button">Sair da conta</button>
							</footer>
						</div>
					</motion.aside>
				</div>
			)}
		</AnimatePresence>
	);
}
