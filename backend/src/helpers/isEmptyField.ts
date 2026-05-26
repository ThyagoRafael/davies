export function isEmptyField(value: unknown) {
	return value === undefined || value === null || value.toString().trim() === "";
}
