import type { Address } from "../../../../types/api/address";
import CheckoutAddressCard from "../CheckoutAddressCard";

interface AddressListProps {
	addresses: Address[];
	selectedAddress: Address | null;
	onCreate: () => void;
	onSelect: (address: Address) => void;
	onEdit: (address: Address) => void;
	onNext: () => void;
}

export default function AddressList({
	addresses,
	selectedAddress,
	onCreate,
	onSelect,
	onEdit,
	onNext,
}: AddressListProps) {
	return (
		<section>
			{addresses.length > 0 ? (
				<ul>
					{addresses.map((address) => (
						<li key={address.id}>
							<CheckoutAddressCard
								address={address}
								checked={selectedAddress?.id === address.id}
								onEdit={onEdit}
								onSelect={onSelect}
							/>
						</li>
					))}
				</ul>
			) : (
				<p>Não há endereços disponíveis</p>
			)}

			<button onClick={onCreate}>Adicionar um novo endereço</button>

			<button onClick={onNext}>Ir para pagamento</button>
		</section>
	);
}
