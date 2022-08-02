import { useUserStore } from '@/stores/user';
import { callApi } from './api';

export function loginRedirect() {
	const LOGIN_URL = `${import.meta.env.VITE_WEBSITE_URL}/api/auth/login`;
	// hard redirect to backend endpoint
	window.location.href = LOGIN_URL;
}

export async function logout() {
	await callApi("/auth/logout", { method: "DELETE" });
	const userStore = useUserStore();
	userStore.setAuthenticated(false);
}

export async function checkUserSession() {
	const response = await callApi("/auth/status", { method: "POST" });
	const state = (await response.json()).state;
	if (state === "AUTHENTICATED") {
		useUserStore().setAuthenticated(true);
		const me = await callApi("/user/me");
		const userInfo = await me.json();
		useUserStore().setRole(userInfo.role);
	}
}
