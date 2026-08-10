import { useState, type FormEvent } from "react";
import Field from "../../../../form/Field";
import styles from "./CardForm.module.css";
import { PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import type { UserCardFormData } from "../../../../../types/api/userCard";

interface CardFormProps {
	loading: boolean;
	onSubmit: (cardData: UserCardFormData) => void;
	onCancel: () => void;
}

export default function CardForm({ loading, onSubmit, onCancel }: CardFormProps) {
	const [holderName, setHolderName] = useState("");
	const [errorMessage, setErrorMessage] = useState<string | null>(null);
	const stripe = useStripe();
	const elements = useElements();

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();

		if (!stripe || !elements) return;

		const { error: submitError } = await elements.submit();
		if (submitError) {
			setErrorMessage(submitError.message ?? "Erro ao validar o cartão");
			return;
		}

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
				<label htmlFor="payment-element">Dados do seu cartão</label>
				<div className={styles.cardElementWrapper}>
					<PaymentElement id="payment-element" />
				</div>
			</div>

			{errorMessage && <p className={styles.errorMessage}>{errorMessage}</p>}

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
