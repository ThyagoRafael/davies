import { IoMdClose } from "react-icons/io";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./ProfileDrawer.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";

interface ProfileDrawerProps {
	isOpen: boolean;
	onClose: () => void;
}

export default function ProfileDrawer({ isOpen, onClose }: ProfileDrawerProps) {
	const navigate = useNavigate();
	const { user, logout } = useAuth();

	const handleLogout = () => {
		logout();
		onClose();
		navigate("/entrar");
	};

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

					<motion.aside
						className={styles.drawer}
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{
							duration: 0.2,
							ease: "easeOut",
						}}
					>
						<div className={styles.content}>
							{user ? (
								<>
									<div className={styles.mainContent}>
										<header className={styles.header}>
											<p>Olá, {user.username}</p>
											<h2>
												<Link
													to="/usuario"
													className={styles.link}
													onClick={onClose}
												>
													Sua conta
												</Link>
											</h2>
										</header>

										<nav className={styles.navigation}>
											<ul>
												<li>
													<Link
														to="/usuario/pedidos"
														className={styles.link}
														onClick={onClose}
													>
														Seus pedidos
													</Link>
												</li>
												<li>
													<button className={styles.link}>Suas formas de pagamento</button>
												</li>
												<li>
													<button className={styles.link}>Seus endereços</button>
												</li>
											</ul>
										</nav>
									</div>
									<footer className={styles.footer}>
										<button
											type="button"
											onClick={handleLogout}
										>
											Sair da conta
										</button>
									</footer>{" "}
								</>
							) : (
								<div className={styles.loggedOut}>
									<p>Olá</p>
									<h2>
										<Link
											to="/entrar"
											className={styles.link}
											onClick={onClose}
										>
											Fazer login
										</Link>
									</h2>
								</div>
							)}
						</div>
					</motion.aside>
				</div>
			)}
		</AnimatePresence>
	);
}
