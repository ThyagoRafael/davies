import { FaPencilAlt } from "react-icons/fa";
import type { Address } from "../../../../types/api/address";

interface CheckoutAddressCardProps {
	address: Address;
	checked: boolean;
	onSelect: (address: Address) => void;
	onEdit: (address: Address) => void;
}

export default function CheckoutAddressCard({ address, checked, onSelect, onEdit }: CheckoutAddressCardProps) {
	return (
		<>
			<label>
				<input
					type="radio"
					name="selected-address"
					checked={checked}
					onChange={() => onSelect(address)}
				/>
				<div>
					<p>
						<strong>{address.receiverName}</strong> - {address.receiverPhone}
					</p>

					<p>
						{`${address.street} ${address.addressComplement ?? ""} ${address.number}, ${address.city} - ${address.state}, ${address.zipCode}`}
					</p>
				</div>
			</label>

			<button onClick={() => onEdit(address)}>
				<FaPencilAlt />
			</button>
		</>
	);
}
