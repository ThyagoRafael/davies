import type { Address } from "../../../../types/api/address";
import CheckoutAddressCard from "../CheckoutAddressCard";
import styles from "./AddressList.module.css";

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
		<section className={styles.container}>
			{addresses.length > 0 ? (
				<ul className={styles.list}>
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
				<p className={styles.empty}>Não há endereços disponíveis</p>
			)}

			<div className={styles.buttonsContainer}>
				<button
					onClick={onCreate}
					className={styles.terciaryButton}
				>
					Adicionar um novo endereço
				</button>

				<button
					onClick={onNext}
					className={styles.primaryButton}
				>
					Ir para pagamento
				</button>
			</div>
		</section>
	);
}
