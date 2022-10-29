<template>
	<DataTable :value="voteData" :paginator="true" :rows="10" >
		<Column field="rank" header="Rank" :sortable="true" ></Column>
		<Column field="name" header="Name" :sortable="true" ></Column>
		<Column field="score" header="Average Score" :sortable="true" ></Column>
		<Column field="answerCount" header="# Votes" :sortable="true" ></Column>
	</DataTable>
</template>

<script lang="ts">
import type { FormAnswer, FormQuestionWithAnswer } from '@/util/backend.types';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { defineComponent, type PropType } from 'vue';

interface Row {
	rank: number;
	name: string;
	score: number | string;
    answerCount: number;
}

export default defineComponent({
    name: "LinearScaleGroup",
    props: {
        questionWithAnswers: {
            type: Object as PropType<Array<FormQuestionWithAnswer>>,
            required: true,
        },
    },
    computed: {
        voteData() {
            let result: Row[] = this.questionWithAnswers.map((question) => {
                return {
                    rank: 0,
                    name: question.linearScale!.title,
                    score: this.averageScore(question.formAnswers).toFixed(1),
                    answerCount: question.formAnswers.length,
                };
            });
            // rank by average score
            result.sort((a, b) => {
                if (a.score > b.score) {
                    return -1;
                }
                else if (a.score < b.score) {
                    return 1;
                }
                else {
                    return 0;
                }
            });
            result = result.map((x, index) => {
                x.rank = index + 1;
                return x;
            });
            return result;
        }
    },
    methods: {
        averageScore(answers: FormAnswer[]) {
            if (answers.length == 0) {
                return 0;
            }
            const sum = answers.map((answer) => answer.linearScaleAnswer!.score).reduce((prev, cur) => prev + cur);
            return sum / answers.length;
        }
    },
    components: { DataTable, Column }
});
</script>
