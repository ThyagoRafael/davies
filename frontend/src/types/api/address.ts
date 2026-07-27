export interface Address {
	number: string;
	street: string;
	city: string;
	state: string;
	receiverName: string;
	receiverPhone: string;
	id: number;
	addressComplement: string;
	zipCode: string;
}

export type AddressFormData = Omit<Address, "id">;
