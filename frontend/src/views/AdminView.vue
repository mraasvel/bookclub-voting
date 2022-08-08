<template>
	<div>
		<Button class="b p-button-rounded p-button-outlined p-button-raised p-button-text" label="Create Poll" @click="goToPoll" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Button from "primevue/button";

export default defineComponent({
	methods: {
		goToPoll() {
			this.$router.push("/poll");
		}
	},
	components: {
		Button,
	},
});
</script>

<style scoped>
.b {
	margin-top: 5px;
}
</style>
