<template>
	<h3> Result for poll: {{ poll.name }} </h3>
	<ul v-for="(score, index) in scores" :key="index">
		<p> Option: {{ score.option }}</p>
		<ResultScores :voteCounts="score.voteCounts" />
	</ul>
</template>

<script lang="ts">
import callApi from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import ResultScores from "./ResultScores.vue";

interface Model {
	poll: Poll
	scores: Score[];
}

interface Score {
	option: string;
	voteCounts: number[];
}

export default defineComponent({
	data(): Model {
		return {
			poll: {
				id: 0,
				name: "",
				options: [],
				votes: []
			},
			scores: [],
		};
	},
	props: {
		pollId: Number,
	},
	methods: {
		async loadData(id: number) {
			const response = await callApi(`/poll/${id}`);
			this.poll = await response.json();
			for (const vote of this.poll.votes) {
				for (let i = 0; i < vote.scores.length; i++) {
					if (this.scores.length <= i) {
						this.scores.push({
							option: this.poll.options[i],
							voteCounts: [0,0,0,0,0],
						});
					}
					const index = vote.scores[i] - 1;
					this.scores[i].voteCounts[index] += 1;
				}
			}
		}
	},
	mounted() {
		this.$nextTick(() => {
			if (this.pollId === undefined) {
				console.error("cannot load data", this.pollId);
				return;
			}
			this.loadData(this.pollId);
		});
	},
	components: { ResultScores }
});
</script>
