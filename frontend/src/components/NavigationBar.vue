<template>
	<div>
		<Menubar :model="items">
			<template #end>
				<div>
					<Button label="Logout" class="p-button-text p-button-plain" @click="doLogout" />
				</div>
			</template>
		</Menubar>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
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
					label: 'Admin',
					icon: 'pi pi-pencil',
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
	components: { Menubar, Button },
});
</script>
