<template>
	<div>
		<Menubar :model="items">
			<template #start>
				<img alt="logo" src="@/assets/images/BookclubIcon.png" height="60" class="mr-2">
			</template>
			<template #end>
				<div>
					<PrimeButton label="Logout" class="p-button-text p-button-plain" @click="doLogout" />
				</div>
			</template>
		</Menubar>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menubar from 'primevue/menubar';
import PrimeButton from 'primevue/button';
import { useUserStore } from "@/stores/user";
import { Role } from "@/util/backend.types";
import { logout } from "@/util/auth";

export default defineComponent({
	data() {
		return {
			items: [
				{
					label: 'Home',
					icon: 'pi pi-fw pi-home',
					to: '/'
				},
				{
					label: 'Form',
					icon: 'pi pi-pencil',
					to: '/form',
				},
				{
					label: 'Admin',
					to: '/admin',
					visible: () => this.isSuperUser,
				},
			]
		};
	},
	methods: {
		doLogout() {
			logout();
		}
	},
	computed: {
		isSuperUser() {
			return useUserStore().role === Role.SuperUser;
		},
	},
	components: { Menubar, PrimeButton },
});
</script>
