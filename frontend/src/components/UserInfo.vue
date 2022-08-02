<template>
<h3> User Info </h3>
<p> id: {{ user.id }}</p>
<p> username: {{ user.username }}</p>
<p> role: {{ user.role }} </p>
</template>

<script lang="ts">
import callApi from "@/util/api";
import Role from "@/util/backend.types";
import { defineComponent } from "vue";

interface User {
	id: number,
	username: string,
	role: Role,
}

interface Model {
	user: User,
}

export default defineComponent({
	data(): Model {
		return {
			user: { id: 0, username: "", role: Role.User }
		}
	},
	async mounted() {
		const response = await callApi("/user/me");
		if (response.ok) {
			this.user = await response.json();
		}
	}
});
</script>
