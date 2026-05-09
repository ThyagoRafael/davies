import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./MainHeader.module.css";
import { FaShoppingCart } from "react-icons/fa";

export default function MainHeader() {
	return (
		<header className={styles.container}>
			<Link
				to="/"
				className={styles.homeLink}
			>
				<img
					src={logo}
					alt="Logo da Davies Ecommerce"
				/>
			</Link>

			<Link
				to="/carrinho"
				className={styles.cartLink}
			>
				<FaShoppingCart size={25} />
			</Link>
		</header>
	);
}
