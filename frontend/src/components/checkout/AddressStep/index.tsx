import { useState } from "react";
import type { Address, AddressFormData } from "../../../types/api/address";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

interface AddressStepProps {
	addresses: Address[];
	selectedAddress: Address | null;
	onSelectAddress: (address: Address | null) => void;
	onSaveAddress: (data: AddressFormData, editingAddress: Address | null) => Promise<void>;
	onDeleteAddress: (addressId: number) => Promise<void>;
	onNext: () => void;
}

type AddressStepMode = "list" | "form";

export default function AddressStep({
	addresses,
	selectedAddress,
	onSelectAddress,
	onSaveAddress,
	onDeleteAddress,
	onNext,
}: AddressStepProps) {
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [mode, setMode] = useState<AddressStepMode>("list");

	const openAddressForm = (address?: Address) => {
		setEditingAddress(address ?? null);
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

	const handleDeleteAddress = async (address: Address) => {
		setLoading(true);

		try {
			await onDeleteAddress(address.id);

			setEditingAddress(null);
			setMode("list");
		} finally {
			setLoading(false);
		}
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
					onCreate={() => openAddressForm()}
					onSelect={onSelectAddress}
					onEdit={openAddressForm}
					onNext={handleNext}
				/>
			)}
			{mode === "form" && (
				<AddressForm
					address={editingAddress}
					loading={loading}
					onSubmit={handleSaveAddress}
					onCancel={handleCancelAddressForm}
					onDelete={handleDeleteAddress}
				/>
			)}
		</section>
	);
}
