<template>
	Vote Result
</template>

<script lang="ts">
import callApi from '@/util/api';
import type { Form, FormResult } from '@/util/backend.types';
import { defineComponent, type PropType } from 'vue';

interface Model {
	answers: FormResult;
}

export default defineComponent({
	name: "FormResult",
	props: {
		form: {
			type: Object as PropType<Form>,
			required: true
		}
	},
	data(): Model {
		return {
			answers: []
		};
	},
	methods: {
		async loadAnswers() {
			const response = await callApi(`/form/result/${this.form.id}`);
			this.answers = await response.json();
			console.log(this.answers[0]);
		},
	},
	mounted() {
		this.loadAnswers();
	},
});
</script>
