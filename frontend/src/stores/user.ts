import { Role } from '@/util/backend.types';
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
	id: 'user',
	state: () => {
		return {
			isAuthenticated: false,
			role: Role.User,
			id: 0,
		}
	},
	actions: {
		setAuthenticated(value: boolean) {
			this.isAuthenticated = value;
		},
		setRole(role: Role) {
			this.role = role;
		},
		setId(id: number) {
			this.id = id;
		},
	},
})
