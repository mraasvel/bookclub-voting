<template>
	<p v-if="voteCounts.length === 5">
		hate it: {{ voteCounts[0] }},
		dislike it: {{ voteCounts[1] }},
		neutral: {{ voteCounts[2] }},
		like it: {{ voteCounts[3] }},
		love it: {{ voteCounts[4] }}
	</p>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";

export default defineComponent({
	props: {
		voteCounts: {
			type: Array as PropType<Array<number>>,
			required: true,
		},
	},
});
</script>
