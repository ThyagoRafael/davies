import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/form/Button";
import Field from "../../components/form/Field";
import styles from "./Auth.module.css";
import { useEffect, useState, type FormEvent } from "react";
import axios from "axios";
import { redirectAfterLogin } from "../../helpers/logout";

export default function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const navigate = useNavigate();

	useEffect(() => {
		const prefilledEmail = localStorage.getItem("prefilled_email");
		if (prefilledEmail) {
			setFormData((prev) => ({ ...prev, email: prefilledEmail }));
		}
	}, []);

	const handleChange = (name: string, value: string) => {
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleLogin = async (e: FormEvent) => {
		e.preventDefault();

		const hasEmptyField = Object.values(formData).some(
			(value) => value === "" || value === null || value === undefined,
		);

		if (hasEmptyField) {
			alert("Todos os campos são obrigatórios");
			return;
		}

		try {
			setIsLoading(true);

			const response = await axios.post("http://localhost:3000/api/users/login", formData);
			localStorage.setItem("user", JSON.stringify(response.data));
		} catch (error) {
			if (axios.isAxiosError(error)) {
				return alert(error.response?.data.message);
			}

			console.error(error);
			alert("Aconteceu um erro inesperado");
		} finally {
			setIsLoading(false);
		}

		redirectAfterLogin(navigate);
	};

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Login</h1>

			<form className={styles.form}>
				<Field
					label="Email*"
					type="email"
					name="email"
					placeholder="Digite o seu email"
					value={formData.email}
					handleChange={handleChange}
				/>

				<Field
					label="Senha*"
					type="password"
					name="password"
					placeholder="Digite a sua senha"
					value={formData.password}
					handleChange={handleChange}
				/>

				<div className={styles.actions}>
					<Button
						handleClick={handleLogin}
						disabled={isLoading}
					>
						Entrar
					</Button>
					<p className={styles["action-paragraph"]}>
						Não tem conta? <Link to="/cadastro">Cadastrar-se</Link>
					</p>
				</div>
			</form>
		</section>
	);
}
