import { useEffect, useState } from "react";
import CartItem from "../../components/cart/CartItem";
import styles from "./Cart.module.css";
import { getCartData } from "../../services/api/cart";
import type { CartData } from "../../types/cart/CartData";
import { Link, useNavigate } from "react-router-dom";
import { AppError } from "../../errors/AppError";
import type { UpdateAction } from "../../types/cartItem/updateAction";
import { deleteAllItems, deleteItem, updateQuantityItem } from "../../services/api/cartItem";
import PriceCard from "../../components/order/PriceCard";

export default function Cart() {
	const [cartData, setCartData] = useState<CartData>({
		items: [],
		shippingPrice: "0",
		itemsPrice: "0",
		totalPrice: "0",
	});
	const [loading, setLoading] = useState<boolean>(false);
	const navigate = useNavigate();
	const cartItemsQuantity = cartData.items.reduce((total, item) => {
		return (total += item.quantity);
	}, 0);

	useEffect(() => {
		const loadCartData = async () => {
			try {
				const data = await getCartData();

				setCartData(data);
			} catch (error: unknown) {
				if (error instanceof AppError) {
					if (error.statusCode === 401) {
						localStorage.removeItem("user");
						navigate("/entrar");
						return;
					}

					alert(error.message);
					return;
				}

				alert("Erro inesperado");
			}
		};

		loadCartData();
	}, [navigate]);

	const handleQuantityItem = async (action: UpdateAction, productId: number) => {
		try {
			setLoading(true);

			const data = await updateQuantityItem(action, productId);

			const updatedCartItems = cartData.items.map((item) =>
				item.id === productId ? { ...item, quantity: data.quantity, subtotal: data.subtotal } : item,
			);

			setCartData((prev) => ({
				...prev,
				items: updatedCartItems,
				itemsPrice: data.itemsPrice,
				totalPrice: data.totalPrice,
			}));
		} catch (error) {
			if (error instanceof AppError) {
				if (error.statusCode === 401) {
					localStorage.removeItem("user");
					navigate("/entrar");
					return;
				}

				alert(error.message);
				return;
			}

			alert("Erro inesperado");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteItem = async (productId: number) => {
		try {
			setLoading(true);

			const data = await deleteItem(productId);

			const updatedCartItems = cartData.items.filter((item) => item.id !== productId);

			setCartData((prev) => ({
				...prev,
				items: updatedCartItems,
				itemsPrice: data.itemsPrice,
				totalPrice: data.totalPrice,
			}));
			alert(data.message);
		} catch (error) {
			if (error instanceof AppError) {
				if (error.statusCode === 401) {
					localStorage.removeItem("user");
					navigate("/entrar");
					return;
				}

				alert(error.message);
				return;
			}

			alert("Erro inesperado");
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteAllItems = async () => {
		try {
			setLoading(true);

			const data = await deleteAllItems();

			setCartData((prev) => ({ ...prev, items: [], itemsPrice: "0", totalPrice: "0" }));
			alert(data.message);
		} catch (error) {
			if (error instanceof AppError) {
				if (error.statusCode === 401) {
					localStorage.removeItem("user");
					navigate("/entrar");
					return;
				}

				alert(error.message);
				return;
			}

			alert("Erro inesperado");
		} finally {
			setLoading(false);
		}
	};

	return (
		<section className={styles.container}>
			<header className={styles.header}>
				<h1>Carrinho</h1>
			</header>

			{cartData.items.length > 0 ? (
				<>
					<PriceCard
						priceData={{
							itemsPrice: cartData.itemsPrice,
							shippingPrice: cartData.shippingPrice,
							totalPrice: cartData.totalPrice,
						}}
					/>

					<div className={styles.clearButtonContainer}>
						<button
							onClick={() => handleDeleteAllItems()}
							disabled={loading}
						>
							Remover todos os produtos
						</button>
					</div>

					<ul className={styles.itemsList}>
						{cartData.items.map((item) => (
							<li key={item.id}>
								<CartItem
									id={item.id}
									name={item.name}
									price={item.price}
									stock={item.stock}
									imageUrl={item.imageUrl}
									quantity={item.quantity}
									handleQuantityItem={handleQuantityItem}
									handleDeleteItem={handleDeleteItem}
									loading={loading}
								/>
							</li>
						))}
					</ul>

					<div className={styles.checkoutButtonContainer}>
						<Link to="/checkout">Finalizar pedido ({cartItemsQuantity} itens)</Link>
					</div>
				</>
			) : (
				<div className={styles.emptyCartDescription}>
					<p>Não há itens no carrinho</p>
					<Link to="/">Voltar para a vitrine</Link>
				</div>
			)}
		</section>
	);
}
