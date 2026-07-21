import type { Address } from "../../../../types/api/address";
import { formatPhoneNumber } from "../../../../utils/formatPhoneNumber";
import { formatZipCode } from "../../../../utils/formatZipCode";

interface AddressCardProps {
	selectedAddress: Address | null;
}

export default function AddressCard({ selectedAddress }: AddressCardProps) {
	return (
		<section>
			<header>
				<h2>Endereço de entrega</h2>
			</header>

			{selectedAddress && (
				<article>
					<h3>
						<span>
							<strong>{selectedAddress.receiverName}</strong>
						</span>
						<span>-</span>
						<span>{formatPhoneNumber(selectedAddress.receiverPhone)}</span>
					</h3>

					<address>
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
