<template>
	<PollList />
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { logout as logoutUser } from "@/util/auth";
import { Role } from "@/util/backend.types";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import PollList from "@/components/PollList.vue";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"]),
		isSuperUser() {
			return useUserStore().role === Role.SuperUser;
		},
	},
	methods: {
		goToPoll() {
			this.$router.push("/poll");
		},
		logout() {
			logoutUser();
		},
	},
	components: { PollList }
});
</script>
