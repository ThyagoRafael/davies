interface StepIndicatorProps {
	actualStep: 1 | 2 | 3;
}

export default function StepIndicator({ actualStep }: StepIndicatorProps) {
	return (
		<nav aria-label="Etapas do checkout">
			<ol>
				<li aria-current={actualStep === 1 ? "step" : undefined}>
					<div aria-hidden="true"></div>
					<span>Endereço</span>
				</li>
				<li aria-current={actualStep === 2 ? "step" : undefined}>
					<div aria-hidden="true"></div>
					<span>Pagamento</span>
				</li>
				<li aria-current={actualStep === 3 ? "step" : undefined}>
					<div aria-hidden="true"></div>
					<span>Confirmação</span>
				</li>
			</ol>
		</nav>
	);
}
