import { useState, type FormEvent } from "react";
import Field from "../../../../form/Field";
import styles from "./CardForm.module.css";
import { CardElement, useElements } from "@stripe/react-stripe-js";
import type { UserCardFormData } from "../../../../../types/api/userCard";

interface CardFormProps {
	loading: boolean;
	onSubmit: (cardData: UserCardFormData) => void;
	onCancel: () => void;
}

const cardElementOptions = {
	hidePostalCode: true,
	style: {
		base: {
			fontSize: "16px",
			color: "#000000",
			"::placeholder": { color: "#b6b6b6" },
		},
		invalid: { color: "#9e2146" },
	},
};

export default function CardForm({ loading, onSubmit, onCancel }: CardFormProps) {
	const [holderName, setHolderName] = useState("");
	const elements = useElements();

	const handleLabelClick = () => {
		const cardElement = elements?.getElement(CardElement);
		cardElement?.focus();
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		onSubmit({ holderName });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className={styles.form}
		>
			<Field
				label="Nome apresentado no cartão"
				name="holderName"
				type="text"
				placeholder="Ex: João R A Batista"
				handleChange={(_, value) => setHolderName(value)}
				value={holderName}
				required
			/>

			<div>
				<label
					htmlFor="card"
					onClick={handleLabelClick}
				>
					Dados do cartão
				</label>
				<div className={styles.cardElementWrapper}>
					<CardElement
						id="card"
						options={cardElementOptions}
					/>
				</div>
			</div>

			<div className={styles.buttonsContainer}>
				<button
					type="submit"
					disabled={loading}
					className={styles.primaryButton}
				>
					Adicionar cartão
				</button>
				<button
					type="button"
					onClick={onCancel}
					disabled={loading}
					className={styles.secondaryButton}
				>
					Cancelar
				</button>
			</div>
		</form>
	);
}
