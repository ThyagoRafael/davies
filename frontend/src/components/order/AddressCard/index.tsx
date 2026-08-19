import type { Address } from "../../../types/api/address";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import { formatZipCode } from "../../../utils/formatZipCode";
import styles from "./AddressCard.module.css";

interface AddressCardProps {
	selectedAddress: Address | null;
}

export default function AddressCard({ selectedAddress }: AddressCardProps) {
	return (
		<section className={styles.container}>
			<header>
				<h2>Endereço de entrega</h2>
			</header>

			{selectedAddress && (
				<article className={styles.detailsContainer}>
					<h3>
						<span className={styles.receiverName}>
							<strong>{selectedAddress.receiverName}</strong>
						</span>
						<span className={styles.separator}>-</span>
						<span className={styles.phone}>{formatPhoneNumber(selectedAddress.receiverPhone)}</span>
					</h3>

					<address className={styles.addressDescription}>
						{selectedAddress.street}
						{selectedAddress.addressComplement && ` ${selectedAddress.addressComplement}`},{" "}
						{selectedAddress.number}, {selectedAddress.city} - {selectedAddress.state},{" "}
						{formatZipCode(selectedAddress.zipCode)}
					</address>
				</article>
			)}
		</section>
	);
}
