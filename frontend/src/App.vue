<template>
<div v-if="isAuthenticated">
	<UserInfo />
	<BooksList />
	<button @click="logout">Logout</button>
</div>
<div v-else>
	<button @click="login">Login</button>
</div>
</template>

<script lang="ts">
import { mapState } from "pinia";
import { defineComponent } from "vue";
import { useUserStore } from "./stores/user";
import { loginRedirect, logout as logoutUser } from "./util/auth";
import BooksList from "./components/BooksList.vue";
import UserInfo from "./components/UserInfo.vue";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"]),
	},
	methods: {
		login() {
			loginRedirect();
		},
		logout() {
			logoutUser();
		},
	},
	components: { BooksList, UserInfo }
});
</script>
