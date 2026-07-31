import { useState, type FormEvent } from "react";
import type { Address, AddressFormData } from "../../../../types/api/address";
import Field from "../../../form/Field";
import SelectField from "../../../form/SelectField";
import styles from "./AddressForm.module.css";
import { useCepLookup } from "../../../../hooks/useCepLookup";

interface AddressFormProps {
	address: Address | null;
	loading: boolean;
	onSubmit: (address: AddressFormData) => Promise<void>;
	onCancel: () => void;
	onDelete: (address: Address) => void;
}

const emptyForm: AddressFormData = {
	number: "",
	street: "",
	city: "",
	state: "",
	receiverName: "",
	receiverPhone: "",
	addressComplement: "",
	zipCode: "",
};

export default function AddressForm({ address, loading, onSubmit, onCancel, onDelete }: AddressFormProps) {
	const [formData, setFormData] = useState<AddressFormData>(
		address
			? {
					number: address.number,
					street: address.street,
					city: address.city,
					state: address.state,
					receiverName: address.receiverName,
					receiverPhone: address.receiverPhone,
					addressComplement: address.addressComplement,
					zipCode: address.zipCode,
				}
			: emptyForm,
	);
	const { lookupCep, loading: loadingCep, error: cepError } = useCepLookup();
	const isEditing = !!address;

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const resolveAddressFromCep = async (data: AddressFormData): Promise<AddressFormData | null> => {
		const result = await lookupCep(data.zipCode);

		if (!result) return null;

		return {
			...data,
			street: result.logradouro || data.street,
			city: result.localidade,
			state: result.uf,
		};
	};

	const handleZipCodeBlur = async () => {
		if (!formData.zipCode) return;

		const updated = await resolveAddressFromCep(formData);

		if (updated) setFormData(updated);
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		const updated = await resolveAddressFromCep(formData);

		if (!updated) return; // cepError já mostra a mensagem de erro pro usuário

		setFormData(updated);
		onSubmit(updated);
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.addressForm}
		>
			<Field
				label="Nome completo do destinatário"
				name="receiverName"
				type="text"
				placeholder="Ex: João Batista"
				value={formData.receiverName}
				handleChange={handleChange}
				required
			/>

			<Field
				label="Telefone do destinatário (apenas números)"
				name="receiverPhone"
				type="tel"
				placeholder="Ex: 61912345678"
				value={formData.receiverPhone}
				handleChange={handleChange}
				required
			/>

			<Field
				label="CEP (apenas números)"
				name="zipCode"
				type="text"
				placeholder="Ex: 12345678"
				value={formData.zipCode}
				handleChange={handleChange}
				onBlur={handleZipCodeBlur}
				required
			/>

			{loadingCep && <span className={styles.cepStatus}>Buscando CEP...</span>}
			{cepError && <span className={styles.cepError}>{cepError}</span>}

			<Field
				label="Rua"
				name="street"
				type="text"
				placeholder="Ex: Quadra 16 Rua 10"
				value={formData.street}
				handleChange={handleChange}
				required
			/>

			<div className={styles.inputRow}>
				<Field
					label="Complemento (Opcional)"
					name="addressComplement"
					type="text"
					placeholder="Ex: Bloco B"
					value={formData.addressComplement}
					handleChange={handleChange}
				/>

				<Field
					label="Nº (casa, apt.)"
					name="number"
					type="text"
					placeholder="Ex: 10"
					value={formData.number}
					handleChange={handleChange}
					required
				/>
			</div>

			<div className={styles.inputRow}>
				<Field
					label="Cidade"
					name="city"
					type="text"
					placeholder="Ex: Ceilândia"
					value={formData.city}
					handleChange={handleChange}
					required
				/>

				<SelectField
					label="Estado"
					name="state"
					handleChange={handleChange}
					value={formData.state}
					options={[
						{ label: "DF", value: "DF" },
						{ label: "SP", value: "SP" },
					]}
					placeholder="UF"
					required
				/>
			</div>

			<div className={styles.buttonsContainer}>
				<button
					disabled={loading}
					type="submit"
					className={styles.submitButton}
				>
					{isEditing ? "Atualizar endereço" : "Adicionar endereço"}
				</button>

				<button
					type="button"
					onClick={onCancel}
					className={styles.cancelButton}
				>
					Cancelar
				</button>

				{isEditing && (
					<button
						type="button"
						onClick={() => onDelete(address)}
						className={styles.removeButton}
					>
						Remover endereço
					</button>
				)}
			</div>
		</form>
	);
}
