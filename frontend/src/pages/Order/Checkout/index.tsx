import { useEffect, useState } from "react";
import StepIndicator from "../../../components/checkout/StepIndicator";
import AddressStep from "../../../components/checkout/AddressStep";
import PaymentStep from "../../../components/checkout/PaymentStep";
import ConfirmationStep from "../../../components/checkout/ConfirmationStep";
import type { Address } from "../../../types/api/address";
import type { UserCard } from "../../../types/api/userCard";
import { createAddress, deleteAddress, getUserAddresses, updateAddress } from "../../../services/api/address";
import { getUserCards } from "../../../services/api/userCard";
import styles from "./Checkout.module.css";
import { useNavigate } from "react-router-dom";
import { getErrorMessage } from "../../../utils/getErrorMessage";
import type { AddressFormData } from "../../../types/api/address";

export default function Checkout() {
	const [actualStep, setActualStep] = useState<1 | 2 | 3>(1);
	const [userAddresses, setUserAddresses] = useState<Address[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
	const [userCards, setUserCards] = useState<UserCard[]>([]);
	const [paymentMethod, setPaymentMethod] = useState<"pix" | "card">("card");
	const [selectedCard, setSelectedCard] = useState<UserCard | null>(null);
	const navigation = useNavigate();

	useEffect(() => {
		const loadData = async () => {
			try {
				const [addresses, cards] = await Promise.all([getUserAddresses(), getUserCards()]);

				setUserAddresses(addresses);
				setUserCards(cards);

				if (addresses.length > 0) {
					setSelectedAddress(addresses[0]);
				}

				if (cards.length > 0) {
					setSelectedCard(cards[0]);
				}
			} catch (error) {
				alert(getErrorMessage(error));
				console.error(error);
			}
		};

		loadData();
	}, []);

	const handleSaveAddress = async (data: AddressFormData, editingAddress: Address | null) => {
		try {
			const savedAddress = editingAddress ? await updateAddress(editingAddress.id, data) : await createAddress(data);

			setUserAddresses((current) => {
				const exists = current.some((a) => a.id === savedAddress.id);

				return exists
					? current.map((a) => (a.id === savedAddress.id ? savedAddress : a))
					: [...current, savedAddress];
			});

			setSelectedAddress(savedAddress);
		} catch (error) {
			alert(getErrorMessage(error));
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
					onChangeUserCards={setUserCards}
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
					onBack={() => setActualStep(2)}
					onFinishOrder={handleFinishOrder}
				/>
			)}
		</section>
	);
}
