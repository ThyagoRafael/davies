import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Home from "../pages/Home";
import AuthLayout from "../templates/AuthLayout";
import MainLayout from "../templates/MainLayout";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Checkout from "../pages/Order/Checkout";
import OrderConfirmation from "../pages/Order/OrderConfirmation";

export default function Router() {
	return (
		<Routes>
			<Route element={<MainLayout />}>
				<Route
					index
					element={<Home />}
				/>

				<Route
					path="produtos/:productId"
					element={<ProductDetails />}
				/>

				<Route
					path="carrinho"
					element={<Cart />}
				/>

				<Route path="checkout">
					<Route
						index
						element={<Checkout />}
					/>
					<Route
						path="success"
						element={<OrderConfirmation />}
					/>
				</Route>
			</Route>

			<Route element={<AuthLayout />}>
				<Route
					path="entrar"
					element={<Login />}
				/>
				<Route
					path="cadastro"
					element={<Register />}
				/>
			</Route>

			<Route
				path="*"
				element={<Navigate to="/" />}
			/>
		</Routes>
	);
}
