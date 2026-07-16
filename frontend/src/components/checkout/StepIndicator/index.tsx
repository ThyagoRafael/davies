import styles from "./StepIndicator.module.css";

interface StepIndicatorProps {
	actualStep: 1 | 2 | 3;
}

export default function StepIndicator({ actualStep }: StepIndicatorProps) {
	return (
		<nav
			aria-label="Etapas do checkout"
			className={styles.stepContainer}
		>
			<ol>
				<li
					aria-current={actualStep === 1 ? "step" : undefined}
					className={styles.stepItem}
				>
					<div
						aria-hidden="true"
						className={actualStep === 1 ? styles.active : actualStep > 1 ? styles.success : ""}
					></div>
					<span>Endereço</span>
				</li>
				<li
					aria-current={actualStep === 2 ? "step" : undefined}
					className={styles.stepItem}
				>
					<div
						aria-hidden="true"
						className={actualStep === 2 ? styles.active : actualStep > 2 ? styles.success : ""}
					></div>
					<span>Pagamento</span>
				</li>
				<li
					aria-current={actualStep === 3 ? "step" : undefined}
					className={styles.stepItem}
				>
					<div
						aria-hidden="true"
						className={actualStep === 3 ? styles.active : ""}
					></div>
					<span>Confirmação</span>
				</li>
			</ol>
		</nav>
	);
}
