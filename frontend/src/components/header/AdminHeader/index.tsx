import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import logo from "../../../assets/logo.png";
import styles from "./AdminHeader.module.css";
import { Link } from "react-router-dom";

interface AdminHeaderProps {
	onOpenDrawer: () => void;
}

export default function AdminHeader({ onOpenDrawer }: AdminHeaderProps) {
	return (
		<header className={styles.container}>
			<button className={styles.button}>
				<MdMenu size={25} />
			</button>

			<Link
				to="/"
				className={styles.logoContainer}
			>
				<img
					src={logo}
					alt="Logo da Davies Ecommerce"
				/>
			</Link>

			<button
				className={styles.button}
				onClick={onOpenDrawer}
			>
				<FaUser size={25} />
			</button>
		</header>
	);
}
