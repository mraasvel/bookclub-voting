<template>
<h3> User Info </h3>
<p> id: {{ user.id }}</p>
<p> username: {{ user.username }}</p>
</template>

<script lang="ts">
import callApi from "@/util/api";
import { defineComponent } from "vue";

interface User {
	id: number,
	username: string,
}

interface Model {
	user: User,
}

export default defineComponent({
	data(): Model {
		return {
			user: { id: 0, username: "" }
		}
	},
	async mounted() {
		const response = await callApi("/user/me");
		this.user = await response.json();
	}
});
</script>
