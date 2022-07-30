import { defineStore } from 'pinia'

export const useUserStore = defineStore({
	id: 'user',
	state: () => {
		return {
			isAuthenticated: false,
		}
	},
	actions: {
		setAuthenticated(value: boolean) {
			this.isAuthenticated = value;
		}
	},
})
