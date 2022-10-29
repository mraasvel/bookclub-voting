<template>
	<LinearScaleQuestion v-if="isLinearScale" :question-id="question.id" :linear-scale="question.linearScale!" @change="changeLinearScale" />
</template>

<script lang="ts">
import { FormQuestionType, type FormAnswerDTO, type FormQuestion, type LinearScaleAnswerDTO } from '@/util/backend.types';
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
	emits: {
		change(_: FormAnswerDTO) {
			return true;
		}
	},
	computed: {
		isLinearScale() {
			return this.question.formQuestionType === FormQuestionType.LinearScale && this.question.linearScale !== undefined;
		}
	},
	methods: {
		changeLinearScale(linearScaleAnswer: LinearScaleAnswerDTO) {
			this.$emit("change", {
				questionId: this.question.id,
				type: FormQuestionType.LinearScale,
				linearScaleAnswer,
			});
		}
	}
})
</script>
