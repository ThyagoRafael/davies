import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import styles from "./MainHeader.module.css";
import { FaShoppingCart, FaUser } from "react-icons/fa";

interface MainHeaderProps {
	onOpenDrawer: () => void;
}

export default function MainHeader({ onOpenDrawer }: MainHeaderProps) {
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

			<div className={styles.buttonsContainer}>
				<Link
					to="/carrinho"
					className={styles.cartLink}
				>
					<FaShoppingCart size={25} />
				</Link>
				<button
					onClick={onOpenDrawer}
					className={styles.profile}
				>
					<FaUser size={25} />
				</button>
			</div>
		</header>
	);
}
