import { useEffect, useState } from "react";
import type { Address } from "../../../types/api/address";
import AddressList from "./AddressList";
import AddressForm from "./AddressForm";

interface AddressStepProps {
	selectedAddress: Address | null;
	onSelectAddress: (address: Address | null) => void;
	onNext: () => void;
}

type AddressStepMode = "list" | "form";
type AddressFormData = Omit<Address, "id">;

export default function AddressStep({ selectedAddress, onSelectAddress, onNext }: AddressStepProps) {
	const [userAddresses, setUserAddresses] = useState<Address[]>([]);
	const [editingAddress, setEditingAddress] = useState<Address | null>(null);

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string | null>(null);
	const [mode, setMode] = useState<AddressStepMode>("list");

	useEffect(() => {
		const loadAddresses = async () => {
			try {
				setLoading(true);
				setError(null);

				const addresses: Address[] = [];

				setUserAddresses(addresses);
				if (addresses.length > 0) {
					onSelectAddress(addresses[0]);
				}
			} catch (error) {
				setError("Erro ao carregar a lista de endereços");
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		loadAddresses();
	}, [onSelectAddress]);

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
						id: userAddresses.length + 1,
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
		setUserAddresses((prev) => {
			const index = prev.findIndex((item) => item.id === address.id);

			if (index === -1) {
				return [...prev, address];
			}

			const updated = [...prev];
			updated[index] = address;

			return updated;
		});

		setEditingAddress(null);
		onSelectAddress(address);
		setMode("list");
	};

	const handleCancelAddressForm = () => {
		setEditingAddress(null);
		setMode("list");
	};

	const handleAddressDeleted = (id: number) => {
		const updated = userAddresses.filter((address) => address.id !== id);

		setUserAddresses(updated);
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
					addresses={userAddresses}
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
