export interface UserCard {
	id: number;
	holderName: string;
	cardToken: string;
	lastDigits: string;
	cardBrand: string;
	expiryDate: string;
}

export type UserCardFormData = Pick<UserCard, "holderName">;
