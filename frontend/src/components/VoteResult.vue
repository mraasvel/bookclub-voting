<template>
	<DataTable :value="voteData" :paginator="true" :rows="10" >
		<template #header>
			Results
		</template>
		<Column field="name" header="Name" :sortable="true" ></Column>
		<Column field="score" header="Average Score" :sortable="true" ></Column>
	</DataTable>
</template>

<script lang="ts">
import callApi from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

interface Model {
	poll: Poll;
}

export default defineComponent({
	props: {
		voteId: {
			type: Number,
			required: true,
		},
	},
	data(): Model {
		return {
			poll: { id: 0, name: "", options: [], votes: [] }
		}
	},
	computed: {
		voteData() {
			return this.calculateAverages();
		},
	},
	methods: {
		async loadData() {
			if (!this.voteId) {
				return;
			}
			const response = await callApi(`/poll/${this.voteId}`);
			this.poll = await response.json();
		},
		calculateAverages() {
			let result  = [];
			for (let option of this.poll.options) {
				result.push({
					name: option,
					score: 0,
				});
			}
			for (let vote of this.poll.votes) {
				for (let i = 0; i < vote.scores.length; i++) {
					result[i].score += vote.scores[i];
				}
			}
			for (let i = 0; i < result.length; i++) {
				result[i].score /= this.poll.votes.length;
			}
			return result;
		},
	},
	watch: {
		voteId() {
			this.loadData();
		},
	},
	mounted() {
		this.loadData();
	},
	components: { DataTable, Column },
});
</script>
