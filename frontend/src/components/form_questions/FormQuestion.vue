<template>
	<LinearScaleQuestion v-if="isLinearScale" :linear-scale="question.linearScale!" />
</template>

<script lang="ts">
import { FormQuestionType, type FormQuestion } from '@/util/backend.types';
import { defineComponent, type PropType } from 'vue';
import LinearScaleQuestion from './LinearScaleQuestion.vue';

export default defineComponent({
    name: "FormQuestion",
	components: { LinearScaleQuestion },
    props: {
        question: {
            type: Object as PropType<FormQuestion>,
            required: true
        }
    },
    computed: {
        isLinearScale() {
            return this.question.formQuestionType === FormQuestionType.LinearScale && this.question.linearScale !== undefined;
        }
    },
})
</script>
