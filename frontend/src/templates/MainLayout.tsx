import { Outlet } from "react-router-dom";
import MainHeader from "../components/header/MainHeader";
import Footer from "../components/footer/Footer";
import styles from "./Layout.module.css";
import { useState } from "react";
import ProfileDrawer from "../components/profile/ProfileDrawer";

export default function MainLayout() {
	const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

	return (
		<div className={styles.container}>
			<MainHeader onOpenDrawer={() => setIsDrawerOpened(true)} />

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
