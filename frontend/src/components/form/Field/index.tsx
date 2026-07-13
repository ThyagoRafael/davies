import styles from "./Field.module.css";

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label: string;
	name: string;
	handleChange: (name: string, value: string) => void;
}

export default function Field({ label, handleChange, ...props }: FieldProps) {
	return (
		<div>
			<label
				htmlFor={props.name}
				className={styles.label}
			>
				{label}
			</label>
			<input
				{...props}
				id={props.name}
				onChange={(e) => handleChange(props.name, e.target.value)}
				className={styles.input}
			/>
		</div>
	);
}
