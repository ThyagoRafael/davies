import styles from "./Footer.module.css";
import { FaInstagram, FaFacebook, FaWhatsapp } from "react-icons/fa";
import { SiPix } from "react-icons/si";
import { FaCcVisa, FaCcMastercard } from "react-icons/fa6";

export default function Footer() {
	return (
		<footer className={styles.container}>
			<div className={styles.content}>
				<section className={styles.column}>
					<h3 className={styles.columnTitle}>Ajuda</h3>

					<div className={styles.columnLinks}>
						<a
							href="#"
							className={styles.link}
						>
							Fale Conosco
						</a>
						<a
							href="#"
							className={styles.link}
						>
							Perguntas Frequentes
						</a>
					</div>
				</section>

				<section className={styles.column}>
					<h3 className={styles.columnTitle}>Formas de pagamento</h3>
					<div className={styles.paymentIcons}>
						<SiPix
							size={28}
							aria-label="Pix"
						/>
						<FaCcVisa
							size={28}
							aria-label="Visa"
						/>
						<FaCcMastercard
							size={28}
							aria-label="Mastercard"
						/>
					</div>
				</section>

				<section className={styles.column}>
					<h3 className={styles.columnTitle}>Redes sociais</h3>
					<div className={styles.socialIcons}>
						<a
							href="https://instagram.com"
							target="_blank"
							rel="noreferrer"
							aria-label="Instagram"
						>
							<FaInstagram size={22} />
						</a>
						<a
							href="https://facebook.com"
							target="_blank"
							rel="noreferrer"
							aria-label="Facebook"
						>
							<FaFacebook size={22} />
						</a>
						<a
							href="https://wa.me/5500000000000"
							target="_blank"
							rel="noreferrer"
							aria-label="WhatsApp"
						>
							<FaWhatsapp size={22} />
						</a>
					</div>
				</section>
			</div>

			<hr className={styles.divider} />

			<div className={styles.bottom}>
				<p className={styles.text}>&copy;2025 Davies</p>
			</div>
		</footer>
	);
}
