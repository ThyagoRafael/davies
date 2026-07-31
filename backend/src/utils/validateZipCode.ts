import axios from "axios";

interface ViaCepResponse {
	cep: string;
	logradouro: string;
	localidade: string;
	uf: string;
	erro?: boolean;
}

export async function validateZipCode(zipCode: string): Promise<boolean> {
	const cleanZipCode = zipCode.replace(/\D/g, "");

	if (cleanZipCode.length !== 8) return false;

	try {
		const { data } = await axios.get<ViaCepResponse>(`https://viacep.com.br/ws/${cleanZipCode}/json/`);

		return !data.erro;
	} catch {
		return false;
	}
}
