import type { NavigateFunction } from "react-router-dom";

const REDIRECT_KEY = "redirectAfterLogin";

export function logoutAndRedirectToLogin() {
	localStorage.setItem(REDIRECT_KEY, window.location.pathname);
	localStorage.removeItem("user");
	window.location.replace("/entrar");
}

export function redirectAfterLogin(navigate: NavigateFunction) {
	const redirect = localStorage.getItem(REDIRECT_KEY);

	if (redirect) {
		localStorage.removeItem(REDIRECT_KEY);
		navigate(redirect, { replace: true });
	} else {
		navigate("/", { replace: true });
	}
}
