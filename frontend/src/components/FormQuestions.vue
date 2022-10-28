<template>
	<Card>
		<template #title>
			{{ form.name }}
		</template>
		<template #content>
			<FormQuestion v-for="question in form.formQuestions" :key="question.id" :question="question" @change="change" />
		</template>
        <template #footer>
            <PrimeButton icon="pi pi-check" class="p-button-success p-button-rounded" label="Submit" @click="submitVote" />
        </template>
	</Card>
</template>

<script lang="ts">
import type { Form, FormAnswerDTO } from '@/util/backend.types';
import Card from 'primevue/card';
import { defineComponent, type PropType } from 'vue';
import FormQuestion from './form_questions/FormQuestion.vue';
import PrimeButton from "primevue/button";
import { callApiJson } from '@/util/api';

interface Model {
    // questionId -> AnswerDTO
    answers: Map<number, FormAnswerDTO>
}

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
    data(): Model {
        return {
            answers: new Map()
        };
    },
    methods: {
        async submitVote() {
            const answers = Array.from(this.answers.values());
            await callApiJson(`/form/submit-form/${this.form.id}`, "POST", {
                answers
            });
            this.$emit("refresh");
        },
        change(answer: FormAnswerDTO) {
            this.answers.set(answer.questionId, answer);
        }
    },
});
</script>
