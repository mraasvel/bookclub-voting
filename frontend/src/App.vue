<template>
<p> hey :) </p>
<p> [{{api}}]</p>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			api: import.meta.env.VITE_API_URL,
		}
	},
});
</script>
