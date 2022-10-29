<template>
	<Card>
		<template #title>
			{{ linearScale.title }}
		</template>
		<template #subtitle>
			<div v-html="markdownDescription"></div>
		</template>
		<template #content>
			<DataTable :value="value" dataKey="id">
				<Column field="labelOne" header=""></Column>

				<Column v-for="index in scores" :key="index" :header="index.toString()">
					<template #body>
						<input type="radio" :value="index" v-model="score">
					</template>
				</Column>

				<Column field="labelTwo" header=""></Column>
			</DataTable>

		</template>
	</Card>
</template>

<script lang="ts">
import type { LinearScale, LinearScaleAnswerDTO } from '@/util/backend.types';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { defineComponent, type PropType } from 'vue';
import { marked } from "marked";
import { makeQuestionKey, persistItem, getPersistentItem } from "@/util/storage";

interface SessionData {
	score: number;
}

interface Model {
	scores: number[],
	score: number | null,
}

export default defineComponent({
    name: "LinearScaleQuestion",
	components: { Card, DataTable, Column },
    props: {
		questionId: {
			type: Number,
			required: true,
		},
        linearScale: {
            type: Object as PropType<LinearScale>,
            required: true,
        }
    },
	emits: {
		change(_: LinearScaleAnswerDTO) {
			return true;
		}
	},
	data(): Model {
		let scores = []
		for (let i = this.linearScale.rangeStart; i <= this.linearScale.rangeEnd; i++) {
			scores.push(i);
		}
		return {
			scores,
			score: null,
		};
	},
	computed: {
		value() {
			return [
				{
					id: 0,
					labelOne: "hate it",
					labelTwo: "love it",
				}
			];
		},
		markdownDescription() {
			return marked(this.linearScale.description);
		},
		sessionKey() {
			return makeQuestionKey(this.questionId);
		}
	},
	watch: {
		score(newVal: number) {
			this.persistValue(newVal);
			this.$emit("change", {
				score: newVal,
			});
		}
	},
	methods: {
		inputName(index: number) {
			return `input_${index}`;
		},
		persistValue(n: number) {
			const value = JSON.stringify({
				score: n,
			});
			persistItem(this.sessionKey, value);
		},
		loadValue() {
			const item = getPersistentItem(this.sessionKey);
			if (!item) {
				return;
			}
			const sessionData: SessionData = JSON.parse(item);
			this.score = sessionData.score;
		}
	},
	mounted() {
		this.loadValue();
	}
});
</script>
