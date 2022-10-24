<template>
	Vote Result
</template>

<script lang="ts">
import type { Form } from '@/util/backend.types';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
	name: "FormResult",
	props: {
		form: {
			type: Object as PropType<Form>,
			required: true
		}
	}
});
</script>
