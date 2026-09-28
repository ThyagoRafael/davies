import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import styles from "./Layout.module.css";
import AdminHeader from "../components/header/AdminHeader";
import ProfileDrawer from "../components/profile/ProfileDrawer";
import { useState } from "react";

export default function AdminLayout() {
	const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<AdminHeader onOpenDrawer={() => setIsDrawerOpened(true)} />

			<main className={styles.main}>
				<Outlet />
			</main>

			<Footer />

			<ProfileDrawer
				isOpen={isDrawerOpened}
				onClose={() => setIsDrawerOpened(false)}
			/>
		</div>
	);
}
