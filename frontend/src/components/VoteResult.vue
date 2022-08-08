<template>
	<DataTable :value="voteData" :paginator="true" :rows="10" >
		<template #header>
			Results
		</template>
		<Column field="rank" header="Rank" :sortable="true" ></Column>
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

interface Row {
	rank: number;
	name: string;
	score: number | string;
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
			let result: Row[] = [];
			for (const option of this.poll.options) {
				result.push({
					rank: 0,
					name: option,
					score: 0,
				});
			}
			for (const vote of this.poll.votes) {
				for (let i = 0; i < vote.scores.length; i++) {
					result[i].score = result[i].score as number + vote.scores[i];
				}
			}
			for (let i = 0; i < result.length; i++) {
				result[i].score = (result[i].score as number / this.poll.votes.length).toFixed(1);
			}
			// rank by average score
			result.sort((a, b) => {
				if (a.score > b.score) {
					return -1;
				} else if (a.score < b.score) {
					return 1;
				} else {
					return 0;
				}
			});
			result = result.map((x,index) => {
				x.rank = index + 1;
				return x;
			})
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
