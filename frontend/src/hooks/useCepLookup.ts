// hooks/useCepLookup.ts
import { useState } from "react";
import axios from "axios";

interface ViaCepResponse {
	cep: string;
	logradouro: string;
	localidade: string;
	uf: string;
	erro?: boolean;
}

export function useCepLookup() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const lookupCep = async (cep: string): Promise<ViaCepResponse | null> => {
		const cleanCep = cep.replace(/\D/g, "");

		if (cleanCep.length !== 8) {
			setError("CEP deve ter 8 dígitos");
			return null;
		}

		setLoading(true);
		setError(null);

		try {
			const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cleanCep}/json/`);

			if (data.erro) {
				setError("CEP não encontrado");
				return null;
			}

			return data;
		} catch {
			setError("Erro ao buscar CEP");
			return null;
		} finally {
			setLoading(false);
		}
	};

	return { lookupCep, loading, error };
}
