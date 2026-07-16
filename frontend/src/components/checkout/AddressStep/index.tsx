import { useState } from "react";
import type { Address } from "../../../types/api/address";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

interface AddressStepProps {
	addresses: Address[];
	selectedAddress: Address | null;
	onSelectAddress: (address: Address | null) => void;
	onChangeAddresses: (addresses: Address[]) => void;
	onNext: () => void;
}

type AddressStepMode = "list" | "form";
type AddressFormData = Omit<Address, "id">;

export default function AddressStep({
	addresses,
	selectedAddress,
	onSelectAddress,
	onChangeAddresses,
	onNext,
}: AddressStepProps) {
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [mode, setMode] = useState<AddressStepMode>("list");

	const handleCreateAddress = () => {
		setMode("form");
	};

	const handleSelectAddress = (address: Address) => {
		onSelectAddress(address);
		setError(null);
	};

	const handleEditAddress = (address: Address) => {
		setEditingAddress(address);
		setMode("form");
	};

	const handleSaveAddress = async (data: AddressFormData) => {
		try {
			setLoading(true);
			setError(null);

			const address: Address = editingAddress
				? {
						...editingAddress,
						...data,
					}
				: {
						id: addresses.length + 1,
						...data,
					};

			handleAddressSaved(address);
		} catch {
			setError("Não foi possível salvar o endereço.");
		} finally {
			setLoading(false);
		}
	};

	const handleAddressSaved = (address: Address) => {
		const index = addresses.findIndex((item) => item.id === address.id);

		const updated =
			index === -1 ? [...addresses, address] : addresses.map((item) => (item.id === address.id ? address : item));

		onChangeAddresses(updated);
		setEditingAddress(null);
		onSelectAddress(address);
		setMode("list");
	};

	const handleCancelAddressForm = () => {
		setEditingAddress(null);
		setMode("list");
	};

	const handleAddressDeleted = (id: number) => {
		const updated = addresses.filter((address) => address.id !== id);

		onChangeAddresses(updated);
		setEditingAddress(null);

		if (updated.length === 0) {
			onSelectAddress(null);
		} else {
			onSelectAddress(updated[0]);
		}

		setMode("list");
	};

	const handleNext = () => {
		if (!selectedAddress) {
			setError("Selecione um endereço.");
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
					onSelect={handleSelectAddress}
					onEdit={handleEditAddress}
					onNext={handleNext}
				/>
			)}
			{mode === "form" && (
				<AddressForm
					address={editingAddress}
					loading={loading}
					error={error}
					onSubmit={handleSaveAddress}
					onCancel={handleCancelAddressForm}
					onDelete={handleAddressDeleted}
				/>
			)}
		</section>
	);
}
