import { useState, type FormEvent } from "react";
import Field from "../../../../form/Field";

interface CardFormData {
	holderName: string;
	cardNumber: string;
	expiryDate: string;
	cvv: string;
}

interface CardFormProps {
	loading: boolean;
	onSubmit: (cardData: CardFormData) => void;
	onCancel: () => void;
}

export default function CardForm({ loading, onSubmit, onCancel }: CardFormProps) {
	const [formData, setFormData] = useState<CardFormData>({
		holderName: "",
		cardNumber: "",
		expiryDate: "",
		cvv: "",
	});

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		onSubmit(formData);
	};

	return (
		<form onSubmit={handleSubmit}>
			<Field
				label="Nome apresentado no cartão"
				name="holderName"
				type="text"
				placeholder="Ex: João R A Batista"
				handleChange={handleChange}
				value={formData.holderName}
				required
			/>

			<Field
				label="Número do cartão (apenas números)"
				name="cardNumber"
				type="text"
				placeholder="Ex: 1234567890000000"
				handleChange={handleChange}
				value={formData.cardNumber}
				required
			/>

			<div>
				<Field
					label="Data de validade"
					name="expiryDate"
					type="text"
					placeholder="MM/AA"
					handleChange={handleChange}
					value={formData.expiryDate}
					required
				/>
				<Field
					label="CVV"
					name="cvv"
					type="text"
					placeholder="Ex: 123"
					handleChange={handleChange}
					value={formData.cvv}
					required
				/>
			</div>

			<div>
				<button
					type="submit"
					disabled={loading}
				>
					Adicionar cartão
				</button>
				<button onClick={onCancel}>Cancelar</button>
			</div>
		</form>
	);
}
