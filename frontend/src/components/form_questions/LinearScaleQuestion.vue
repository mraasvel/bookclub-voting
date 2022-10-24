<template>
	<Card>
		<template #title>
			{{ linearScale.title }}
		</template>
		<template #subtitle>
			{{ linearScale.description }}
		</template>
		<template #content>
			<DataTable :value="value" dataKey="id">
				<Column field="labelOne" header=""></Column>

				<Column v-for="index in scores" :key="index" :header="index.toString()">
					<template #body="slotProps">
						<input type="radio" :value="index" v-model="score">
					</template>
				</Column>

				<Column field="labelTwo" header=""></Column>
			</DataTable>

		</template>
	</Card>
</template>

<script lang="ts">
import type { LinearScale } from '@/util/backend.types';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: "LinearScaleQuestion",
	components: { Card, DataTable, Column },
    props: {
        linearScale: {
            type: Object as PropType<LinearScale>,
            required: true,
        }
    },
	data() {
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
		}
	},
	watch: {
		score(newVal, oldVal) {
			console.log(newVal, oldVal);
		}
	},
	methods: {
		inputName(index: number) {
			return `input_${index}`;
		},
	},
});
</script>
