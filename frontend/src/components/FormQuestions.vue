<template>
	<Card>
		<template #title>
			{{ form.name }}
		</template>
		<template #content>
			<FormQuestion v-for="question in form.formQuestions" :key="question.id" :question="question" />
		</template>
        <template #footer>
            <PrimeButton icon="pi pi-check" class="p-button-success p-button-rounded" label="Submit" @click="submitVote" />
        </template>
	</Card>
</template>

<script lang="ts">
import type { Form } from '@/util/backend.types';
import Card from 'primevue/card';
import { defineComponent, type PropType } from 'vue';
import FormQuestion from './form_questions/FormQuestion.vue';
import PrimeButton from "primevue/button";

export default defineComponent({
    name: "FormQuestions",
    components: { Card, FormQuestion, PrimeButton },
    props: {
        form: {
            type: Object as PropType<Form>,
            required: true,
        },
    },
    emits: ["refresh"],
    methods: {
        async submitVote() {
            console.log("submit vote");
        }
    },
});
</script>
