import axios from "axios";
import { logoutAndRedirectToLogin } from "../../helpers/logout";
import { getUserStorage } from "../../helpers/getUserStorage";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });

api.interceptors.request.use((config) => {
	const user = getUserStorage();

	if (user) {
		try {
			const { token } = user;
			config.headers.Authorization = `Bearer ${token}`;
		} catch {
			localStorage.removeItem("user");
		}
	}

	return config;
});

api.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			logoutAndRedirectToLogin();
		}

		return Promise.reject(error);
	},
);

export { api };
