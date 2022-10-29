<template>
	<Card>
		<template #title>
			{{ form.name }}
		</template>
		<template #content>
			<LinearScaleGroup :question-with-answers="answers" />
		</template>
	</Card>
</template>

<script lang="ts">
import callApi from '@/util/api';
import type { Form, FormResult } from '@/util/backend.types';
import Card from 'primevue/card';
import { defineComponent, type PropType } from 'vue';
import LinearScaleGroup from './form_results/LinearScaleGroup.vue';

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
		},
	},
	mounted() {
		this.loadAnswers();
	},
	components: { LinearScaleGroup, Card }
});
</script>
