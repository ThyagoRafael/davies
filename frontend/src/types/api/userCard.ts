export interface UserCard {
	id: number;
	holderName: string;
	cardToken: string;
	lastDigits: string;
	cardBrand: string;
	validateMonth: string;
	validateYear: string;
}

export type UserCardFormData = Pick<UserCard, "holderName">;
