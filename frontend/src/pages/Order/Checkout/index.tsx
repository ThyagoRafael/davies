import { useEffect, useState } from "react";
import StepIndicator from "../../../components/checkout/StepIndicator";
import AddressStep from "../../../components/checkout/AddressStep";
import PaymentStep from "../../../components/checkout/PaymentStep";
import ConfirmationStep from "../../../components/checkout/ConfirmationStep";
import type { Address, AddressFormData } from "../../../types/api/address";
import type { UserCard, UserCardFormData } from "../../../types/api/userCard";
import { createAddress, deleteAddress, getUserAddresses, updateAddress } from "../../../services/api/address";
import { createUserCard, getUserCards } from "../../../services/api/userCard";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import { CardElement, Elements, useElements, useStripe } from "@stripe/react-stripe-js";
import { stripePromise } from "../../../lib/stripe";
import { getCartData } from "../../../services/api/cart";
import type { CartData } from "../../../types/cart/CartData";

function Checkout() {
	const [actualStep, setActualStep] = useState<1 | 2 | 3>(1);
	const [userAddresses, setUserAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [userCards, setUserCards] = useState<UserCard[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");
	const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
	const [cartData, setCartData] = useState<CartData | null>(null);
	const navigation = useNavigate();
	const stripe = useStripe();
	const elements = useElements();

	useEffect(() => {
		const loadData = async () => {
			try {
				const [addresses, cards, cartData] = await Promise.all([getUserAddresses(), getUserCards(), getCartData()]);

				setUserAddresses(addresses);
				setUserCards(cards);
				setCartData(cartData);

				if (addresses.length > 0) {
					setSelectedAddress(addresses[0]);
				}

				if (cards.length > 0) {
					setSelectedCard(cards[0]);
				}
			} catch (error) {
				alert(getErrorMessage(error));
			}
		};

		loadData();
	}, []);

	const handleSaveAddress = async (data: AddressFormData, editingAddress: Address | null): Promise<Address | null> => {
		try {
			const savedAddress = editingAddress ? await updateAddress(editingAddress.id, data) : await createAddress(data);

			setUserAddresses((current) => {
				const exists = current.some((address) => address.id === savedAddress.id);

				return exists
					? current.map((address) => (address.id === savedAddress.id ? savedAddress : address))
					: [...current, savedAddress];
			});

			setSelectedAddress(savedAddress);
			return savedAddress;
		} catch (error) {
			alert(getErrorMessage(error));
			return null;
		}
	};

	const handleDeleteAddress = async (addressId: number) => {
		try {
			const response = await deleteAddress(addressId);

			const updatedAddresses = userAddresses.filter((address) => address.id !== addressId);

			setUserAddresses(updatedAddresses);

			if (selectedAddress?.id === addressId) {
				setSelectedAddress(updatedAddresses[0] ?? null);
			}

			alert(response.message);
		} catch (error) {
			alert(getErrorMessage(error));
		}
	};

	const handleSaveUserCard = async (data: UserCardFormData): Promise<UserCard | null> => {
		if (!stripe || !elements) {
			alert("Stripe ainda não carregou, tenta novamente em instantes.");
			return null;
		}

		const cardElement = elements.getElement(CardElement);

		if (!cardElement) {
			alert("Preencha os dados do cartão.");
			return null;
		}

		const { paymentMethod, error } = await stripe.createPaymentMethod({
			type: "card",
			card: cardElement,
			billing_details: {
				name: data.holderName,
				address: {
					postal_code: selectedAddress?.zipCode,
				},
			},
		});

		if (error) {
			alert(error.message);
			return null;
		}

		try {
			const newCard = await createUserCard({
				holderName: data.holderName,
				paymentMethodId: paymentMethod.id,
			});

			setUserCards((prev) => [...prev, newCard]);
			setSelectedCard(newCard);

			return newCard;
		} catch (error) {
			alert(getErrorMessage(error));
			return null;
		}
	};

	const handleFinishOrder = () => {
		navigation("/checkout/sucesso");
	};

	return (
		<section className={styles.container}>
			<header>
				<h1>Pedido</h1>
				<StepIndicator actualStep={actualStep} />
			</header>

			<hr className={styles.line} />

			{actualStep === 1 && (
				<AddressStep
					addresses={userAddresses}
					selectedAddress={selectedAddress}
					onSelectAddress={setSelectedAddress}
					onSaveAddress={handleSaveAddress}
					onDeleteAddress={handleDeleteAddress}
					onNext={() => setActualStep(2)}
				/>
			)}

			{actualStep === 2 && (
				<PaymentStep
					userCards={userCards}
					paymentMethod={paymentMethod}
					selectedCard={selectedCard}
					onSaveUserCard={handleSaveUserCard}
					onChangePaymentMethod={setPaymentMethod}
					onSelectCard={setSelectedCard}
					onBack={() => setActualStep(1)}
					onNext={() => setActualStep(3)}
				/>
			)}

			{actualStep === 3 && (
				<ConfirmationStep
					selectedAddress={selectedAddress}
					paymentMethod={paymentMethod}
					selectedCard={selectedCard}
					cartData={cartData}
					onBack={() => setActualStep(2)}
					onFinishOrder={handleFinishOrder}
				/>
			)}
		</section>
	);
}

export default function CheckoutPage() {
	return (
		<Elements
			stripe={stripePromise}
			options={{ locale: "pt-BR" }}
		>
			<Checkout />
		</Elements>
	);
}
