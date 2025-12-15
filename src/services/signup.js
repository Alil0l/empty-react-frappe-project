import axios from 'axios';

const BASE_URL = "/api/method/resk_app.APIs.public";

const createFormData = (data) => {
	const formData = new URLSearchParams();
	Object.keys(data).forEach((key) => {
		if (data[key] !== undefined && data[key] !== null) {
			formData.append(key, data[key]);
		}
	});
	return formData;
};

export const signupService = {
	validateUserData: (data) =>
		axios.post(
			`${BASE_URL}.validate_user_data`,
			createFormData({
				email: data?.email || "",
				phone: data?.phone || "",
				full_name: data?.full_name || "",
				password: data?.password || "",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"X-Frappe-CSRF-Token": window.csrf_token || "",
				},
			}
		),

	signUp: (data) =>
		axios.post(
			`${BASE_URL}.sign_up`,
			createFormData({
				email: data?.email || "",
				phone: data?.phone || "",
				full_name: data?.full_name || "",
				password: data?.password || "",
				otp_code: data?.otp_code || "",
			}),
			{
				headers: {
					"Content-Type": "application/x-www-form-urlencoded",
					"X-Frappe-CSRF-Token": window.csrf_token || "",
				},
			}
		),
};

