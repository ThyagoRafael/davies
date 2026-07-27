import axios from "axios";
import { logoutAndRedirectToLogin } from "../../helpers/logout";

const baseURL = import.meta.env.VITE_API_URL;
const api = axios.create({ baseURL });

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
