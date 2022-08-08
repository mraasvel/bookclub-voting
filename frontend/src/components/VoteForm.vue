<template>
	<div v-if="isReady">
		<DataTable :value="value" dataKey="id" :paginator="true" :rows="5">
			<Column field="option" :header="label"></Column>

			<Column v-for="(category, index) in categories" :key="index" :header="category">
				<template #body="slotProps">
					<input type="radio" :value="index + 1" v-model="scores[slotProps.data.id]">
				</template>
			</Column>
		</DataTable>
		<div class="submit-button">
			<Button label="Submit Vote" :disabled="submitted" class="p-button-primary p-button-rounded" icon="pi pi-check" @click="submit" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import RadioButton from "primevue/radiobutton";
import Button from "primevue/button";

interface Model {
	categories: string[];
	scores: number[];
	submitted: boolean;
}

export default defineComponent({
	props: {
		label: {
			type: String,
			required: true,
		},
		options: {
			type: Object as PropType<Array<string>>,
			required: true,
		},
	},
	emits: {
		submit(scores: Array<number>) {
			return scores.length > 0;
		},
	},
	data(): Model {
		return {
			categories: ["hate it", "dislike it", "neutral", "like it", "love it"],
			scores: [],
			submitted: false,
		}
	},
	computed: {
		isReady() {
			return this.options.length === this.scores.length
		},
		value() {
			return this.options.map((option, index) => {
				return {
					id: index,
					option,
				}
			});
		},
	},
	mounted() {
		this.resetScores(this.options);
	},
	watch: {
		options(newVal: string[]) {
			this.resetScores(newVal);
		}
	},
	methods: {
		submit() {
			if (this.scores.length !== this.options.length) {
				return;
			}
			this.$emit("submit", this.scores);
			this.submitted = true;
		},
		resetScores(options: any[]) {
			this.scores = options.map((_x) => 3);
		},
	},
	components: { DataTable, Column, Button, RadioButton },
});
</script>

<style scoped>
.submit-button {
	margin: auto;
	text-align: center;
	padding: 10px;
}
</style>
