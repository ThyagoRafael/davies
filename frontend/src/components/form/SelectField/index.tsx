import styles from "./SelectField.module.css";

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label: string;
	name: string;
	handleChange: (name: string, value: string) => void;
	options: { value: string; label: string }[];
	placeholder?: string;
}

export default function SelectField({ label, handleChange, options, placeholder, ...props }: SelectFieldProps) {
	return (
		<div>
			<label
				htmlFor={props.name}
				className={styles.label}
			>
				{label}
			</label>

			<select
				{...props}
				id={props.name}
				name={props.name}
				onChange={(e) => handleChange(props.name, e.target.value)}
				className={styles.select}
			>
				<option
					value=""
					disabled
				>
					{placeholder ?? "Selecione uma opção"}
				</option>

				{options.map((option) => (
					<option
						key={option.value}
						value={option.value}
					>
						{option.label}
					</option>
				))}
			</select>
		</div>
	);
}
