import axios from "axios";

export function getErrorMessage(error: unknown) {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message ?? error.message;
	}

	if (error instanceof Error) {
		return error.message;
	}

	return "Ocorreu um erro inesperado";
}
