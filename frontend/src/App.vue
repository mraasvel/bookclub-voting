<template>
	<div v-if="isAuthenticated">
		<NavigationBar />
		<RouterView />
	</div>
	<div v-else>
		<LoginPage />
	</div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { useUserStore } from "./stores/user";
import LoginPage from "./components/LoginPage.vue";
import NavigationBar from "./components/NavigationBar.vue";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"]),
	},
	components: { LoginPage, NavigationBar }
});
</script>
