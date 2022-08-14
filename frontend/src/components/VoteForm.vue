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
		<div class="center">
			<PrimeButton label="Submit Vote" :disabled="submitted" class="p-button-success p-button-rounded" icon="pi pi-check" @click="submit" />
		</div>
	</div>
	<div v-if="!shouldShowForm" class="center">
		<PrimeButton label="Redo Vote" @click="showForm = true" icon="pi pi-undo" class="p-button-warning p-button-rounded" />
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import PrimeButton from "primevue/button";

interface Model {
	categories: string[];
	scores: number[];
	submitted: boolean;
	showForm: boolean;
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
		hasVoted: {
			type: Boolean,
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
			showForm: false,
		}
	},
	computed: {
		isReady() {
			return this.options.length === this.scores.length && this.shouldShowForm
		},
		value() {
			return this.options.map((option, index) => {
				return {
					id: index,
					option,
				}
			});
		},
		shouldShowForm() {
			return !this.hasVoted || this.showForm;
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
		resetScores(options: string[]) {
			this.scores = options.map(() => 3);
		},
	},
	components: { DataTable, Column, PrimeButton },
});
</script>

<style scoped>
.center {
	margin: auto;
	text-align: center;
	padding: 10px;
}
</style>
