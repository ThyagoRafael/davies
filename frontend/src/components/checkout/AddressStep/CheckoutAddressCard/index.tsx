import { FaPencilAlt } from "react-icons/fa";
import type { Address } from "../../../../types/api/address";
import styles from "./CheckoutAddressCard.module.css";

interface CheckoutAddressCardProps {
	address: Address;
	checked: boolean;
	onSelect: (address: Address) => void;
	onEdit: (address: Address) => void;
}

export default function CheckoutAddressCard({ address, checked, onSelect, onEdit }: CheckoutAddressCardProps) {
	return (
		<div
			className={`${styles.cardContainer} ${checked ? styles.checked : ""}`}
			onClick={() => onSelect(address)}
		>
			<label className={styles.label}>
				<input
					type="radio"
					name="selected-address"
					checked={checked}
					onChange={() => onSelect(address)}
				/>

				<div className={styles.details}>
					<p className={styles.detailsHeader}>
						<strong className={styles.receiverName}>{address.receiverName}</strong>

						<span className={styles.separator}>-</span>

						<span className={styles.phone}>{address.receiverPhone}</span>
					</p>

					<p className={styles.detailsDescription}>
						{`${address.street} ${address.addressComplement ?? ""} ${address.number}, ${address.city} - ${address.state}, ${address.zipCode}`}
					</p>
				</div>
			</label>

			<button
				onClick={() => onEdit(address)}
				aria-label="Editar endereço"
			>
				<FaPencilAlt />
			</button>
		</div>
	);
}
