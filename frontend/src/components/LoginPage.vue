<template>
	<div v-if="isAuthenticated">
		<p>you are already logged in</p>
	</div>
	<Card v-else>
		<template #title>
			Codam Book Club
		</template>
		<template #content>
			<Button label="login" @click="login" />
		</template>
	</Card>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { loginRedirect } from "@/util/auth";
import { mapState } from "pinia";
import { defineComponent } from "vue";
import Button from "primevue/button";
import Card from "primevue/card";

export default defineComponent({
	computed: {
		...mapState(useUserStore, ["isAuthenticated"])
	},
	methods: {
		login() {
			loginRedirect();
		}
	},
	components: { Button, Card },
});
</script>
