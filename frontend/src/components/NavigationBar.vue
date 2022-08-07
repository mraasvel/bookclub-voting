<template>
	<div>
		<TabMenu :model="filteredItems" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TabMenu from 'primevue/tabmenu';
import { useUserStore } from "@/stores/user";
import { Role } from "@/util/backend.types";

export default defineComponent({
	data() {
		return {
			items: [
				{label: 'Home', icon: 'pi pi-fw pi-home', to: '/'},
				{label: 'Admin', icon: 'pi pi-fw pi-pencil', to: '/admin'},
			]
		};
	},
	computed: {
		isSuperUser() {
			return useUserStore().role === Role.SuperUser;
		},
		filteredItems() {
			return this.items.filter((x) => { return this.isSuperUser || x.label !== 'Admin' });
		},
	},
	components: { TabMenu },
});
</script>
