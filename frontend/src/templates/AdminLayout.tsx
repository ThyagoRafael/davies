import { Outlet } from "react-router-dom";
import Footer from "../components/footer/Footer";
import styles from "./Layout.module.css";
import AdminHeader from "../components/header/AdminHeader";
import ProfileDrawer from "../components/profile/ProfileDrawer";
import { useState } from "react";
import AdminDrawer from "../components/admin/AdminDrawer";

export default function AdminLayout() {
	const [isProfileDrawerOpened, setIsProfileDrawerOpened] = useState<boolean>(false);
	const [isAdminDrawerOpened, setIsAdminDrawerOpened] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<AdminHeader
				onOpenProfileDrawer={() => setIsProfileDrawerOpened(true)}
				onOpenAdminDrawer={() => setIsAdminDrawerOpened(true)}
			/>

			<main className={styles.main}>
				<Outlet />
			</main>

			<Footer />

			<ProfileDrawer
				isOpen={isProfileDrawerOpened}
				onClose={() => setIsProfileDrawerOpened(false)}
			/>

			<AdminDrawer
				isOpen={isAdminDrawerOpened}
				onClose={() => setIsAdminDrawerOpened(false)}
			/>
		</div>
	);
}
