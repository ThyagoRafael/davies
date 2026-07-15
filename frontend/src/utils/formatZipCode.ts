export function formatZipCode(value: string | number) {
	const digits = String(value).replace(/\D/g, "");

	if (digits.length === 8) {
		return digits.replace(/(\d{5})(\d{3})/, "$1-$2");
	}

	return String(value);
}
