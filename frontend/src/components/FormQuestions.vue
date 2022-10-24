<template>
	<Card>
		<template #title>
			{{ form.name }}
		</template>
		<template #content>
			<FormQuestion v-for="question in form.formQuestions" :key="question.id" :question="question" />
		</template>
	</Card>
</template>

<script lang="ts">
import type { Form } from '@/util/backend.types';
import Card from 'primevue/card';
import { defineComponent, type PropType } from 'vue';
import FormQuestion from './form_questions/FormQuestion.vue';

export default defineComponent({
    name: "FormQuestions",
    props: {
        form: {
            type: Object as PropType<Form>,
            required: true,
        },
    },
    emits: ["refresh"],
    components: { Card, FormQuestion }
});
</script>
