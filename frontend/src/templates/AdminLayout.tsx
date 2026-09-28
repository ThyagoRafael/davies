import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import styles from "./Layout.module.css";
import AdminHeader from "../components/header/AdminHeader";

export default function AdminLayout() {
	return (
		<div className={styles.container}>
			<AdminHeader />

			<main className={styles.main}>
				<Outlet />
			</main>

			<Footer />
		</div>
	);
}
