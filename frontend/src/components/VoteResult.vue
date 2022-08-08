<template>
<p> ID: {{ voteId }} -- Results </p>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
	props: {
		voteId: {
			type: Number,
			required: true,
		},
	},
});
</script>
