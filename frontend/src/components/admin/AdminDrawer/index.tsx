import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./AdminDrawer.module.css";
import { Link, NavLink } from "react-router-dom";

interface AdminDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function AdminDrawer({ isOpen, onClose }: AdminDrawerProps) {
	return (
		<AnimatePresence>
			{isOpen && (
				<div className={styles.overlay}>
					<motion.aside
						className={styles.drawer}
						initial={{ x: "-100%" }}
						animate={{ x: 0 }}
						exit={{ x: "-100%" }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
						}}
					>
						<div className={styles.content}>
							<div className={styles.mainContent}>
								<header className={styles.header}>
									<h2>Painel de Administrador</h2>
								</header>

								<nav className={styles.navigation}>
									<ul>
										<li>
											<NavLink
												to="/admin/dashboard"
												className={({ isActive }) => `${isActive ? styles.active : ""} ${styles.link}`}
												onClick={onClose}
											>
												Dashboard
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/admin/pedidos"
												className={({ isActive }) => `${isActive ? styles.active : ""} ${styles.link}`}
												onClick={onClose}
											>
												Pedidos
											</NavLink>
										</li>
										<li>
											<NavLink
												to="/admin/produtos"
												className={({ isActive }) => `${isActive ? styles.active : ""} ${styles.link}`}
												onClick={onClose}
											>
												Produtos
											</NavLink>
										</li>
									</ul>
								</nav>
							</div>

							<footer className={styles.footer}>
								<Link to="/">Voltar para a loja</Link>
							</footer>
						</div>
					</motion.aside>

					<motion.div
						className={styles.backdrop}
						aria-hidden="true"
						onClick={onClose}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.4 }}
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
				</div>
			)}
		</AnimatePresence>
	);
}
