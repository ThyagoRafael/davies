import { FaUser } from "react-icons/fa";
import { MdMenu } from "react-icons/md";
import logo from "../../../assets/logo.png";
import styles from "./AdminHeader.module.css";

export default function AdminHeader() {
	return (
		<header className={styles.container}>
			<button className={styles.button}>
				<MdMenu size={25} />
			</button>

			<div className={styles.logoContainer}>
				<img
					src={logo}
					alt="Logo da Davies Ecommerce"
				/>
			</div>

			<button className={styles.button}>
				<FaUser size={25} />
			</button>
		</header>
	);
}
