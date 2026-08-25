import styles from "./PixPayment.module.css";

export default function PixPayment() {
	return (
		<div className={styles.container}>
			{/* <p>O código PIX gerado para pagamento é válido por 30 minutos após a finalização do pedido.</p> */}
			<p>Pagamento com PIX em breve</p>
		</div>
	);
}
