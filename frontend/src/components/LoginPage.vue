<template>
	<div v-if="isAuthenticated">
		<p>you are already logged in</p>
	</div>
	<div v-else>
		<button @click="login">login</button>
	</div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { loginRedirect } from "@/util/auth";
import { mapState } from "pinia";
import { defineComponent } from "vue";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"])
	},
	methods: {
		login() {
			loginRedirect();
		}
	}
});
</script>
