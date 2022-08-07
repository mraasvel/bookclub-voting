<template>
	<div>
		<button @click="goToPoll">new poll</button>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	methods: {
		goToPoll() {
			console.log("poll");
			this.$router.push("/poll");
		}
	}
});
</script>
