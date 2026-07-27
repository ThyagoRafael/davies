import { useState } from "react";
import type { Address, AddressFormData } from "../../../types/api/address";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

interface AddressStepProps {
	addresses: Address[];
	selectedAddress: Address | null;
	onSelectAddress: (address: Address | null) => void;
	onSaveAddress: (data: AddressFormData, editingAddress: Address | null) => Promise<void>;
	onNext: () => void;
}

type AddressStepMode = "list" | "form";

export default function AddressStep({
	addresses,
	selectedAddress,
	onSelectAddress,
	onSaveAddress,
	onNext,
}: AddressStepProps) {
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [mode, setMode] = useState<AddressStepMode>("list");

	const handleCreateAddress = () => {
		setMode("form");
	};

	const handleSaveAddress = async (data: AddressFormData) => {
		setLoading(true);

		try {
			await onSaveAddress(data, editingAddress);

			setEditingAddress(null);
			setMode("list");
		} finally {
			setLoading(false);
		}
	};

	const handleEditAddress = (address: Address) => {
		setEditingAddress(address);
		setMode("form");
	};

	const handleCancelAddressForm = () => {
		setEditingAddress(null);
		setMode("list");
	};

	const handleNext = () => {
		if (!selectedAddress) {
			alert("Selecione um endereço.");
			return;
		}

		onNext();
	};

	return (
		<section>
			{mode === "list" && (
				<AddressList
					addresses={addresses}
					selectedAddress={selectedAddress}
					onCreate={handleCreateAddress}
					onSelect={onSelectAddress}
					onEdit={handleEditAddress}
					onNext={handleNext}
				/>
			)}
			{mode === "form" && (
				<AddressForm
					address={editingAddress}
					loading={loading}
					onSubmit={handleSaveAddress}
					onCancel={handleCancelAddressForm}
				/>
			)}
		</section>
	);
}
