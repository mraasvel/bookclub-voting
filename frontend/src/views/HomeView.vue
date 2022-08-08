<template>
	<Card>
		<template #title>
			About
		</template>
		<template #content>
			Welcome to the Codam Book Club website. This is where we vote on which books to read.
			I will probably add more stuff and functionality in the future.
		</template>
	</Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";

export default defineComponent({
	components: { Card },
});
</script>
