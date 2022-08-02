<template>
	<div v-if="isSuperUser">
		<p>You are the super user</p>
	</div>
	<UserInfo />
	<BooksList />
	<button @click="logout">Logout</button>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { logout as logoutUser } from "@/util/auth";
import Role from "@/util/backend.types";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import UserInfo from "../components/UserInfo.vue";
import BooksList from "../components/BooksList.vue";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"]),
		isSuperUser() {
			return useUserStore().role === Role.SuperUser;
		},
	},
	methods: {
		logout() {
			logoutUser();
		},
	},
	components: { UserInfo, BooksList }
});
</script>
