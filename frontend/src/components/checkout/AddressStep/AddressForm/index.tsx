import { useState, type FormEvent } from "react";
import type { Address } from "../../../../types/api/address";
import Field from "../../../form/Field";
import SelectField from "../../../form/SelectField";
import styles from "./AddressForm.module.css";

interface AddressFormProps {
	address: Address | null;
	loading: boolean;
	error: string | null;
	onSubmit: (address: AddressFormData) => void;
	onCancel: () => void;
	onDelete: (id: number) => void;
}

type AddressFormData = Omit<Address, "id">;

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

export default function AddressForm({ address, loading, error, onSubmit, onCancel, onDelete }: AddressFormProps) {
	const [formData, setFormData] = useState<AddressFormData>(address ? { ...address } : emptyForm);
	const isEditing = !!address;

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onSubmit(formData);
	};

	const handleDeleteAddress = () => {
		if (address) {
			onDelete(address.id);
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.addressForm}
		>
			{error && <div role="alert">{error}</div>}

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
				required
			/>

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
					onClick={onCancel}
					className={styles.cancelButton}
				>
					Cancelar
				</button>

				{isEditing && (
					<button
						onClick={handleDeleteAddress}
						className={styles.removeButton}
					>
						Remover endereço
					</button>
				)}
			</div>
		</form>
	);
}
