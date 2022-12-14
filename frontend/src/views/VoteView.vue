<template>
<div>
	<Splitter layout="horizontal">
		<SplitterPanel :size="10">
			<PrimeMenu :model="viewOptions" />
		</SplitterPanel>
		<SplitterPanel :size="90">
			<div v-if="showVote">
				<VoteForm :label="poll.name" :options="poll.options" @submit="submit" :hasVoted="hasVoted" />
			</div>
			<div v-else>
				<VoteResult :vote-id="poll.id" />
			</div>
		</SplitterPanel>
	</Splitter>
</div>
</template>

<script lang="ts">
import callApi, { callApiJson } from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import VoteForm from "@/components/VoteForm.vue";
import VoteResult from "../components/VoteResult.vue";
import { useUserStore } from "@/stores/user";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import PrimeMenu from "primevue/menu";

interface Model {
	poll: Poll;
	hasVoted: boolean;
	display: "vote" | "result";
}

interface VoteDTO {
	pollId: number;
	scores: number[];
}

export default defineComponent({
	data(): Model {
		return {
			poll: { id: 0, name: "", options: [], votes: [], closed: true },
			hasVoted: false,
			display: "result",
		};
	},
	methods: {
		async loadData() {
			const id = this.$route.params.id;
			if (!id) {
				console.error("no route param");
				return;	
			}
			const response = await callApi(`/poll/${id}`);
			const poll: Poll = await response.json();
			this.poll = poll;

			// check if this user has already voted on this poll
			for (const vote of poll.votes) {
				if (vote.user === useUserStore().id) {
					this.hasVoted = true;
					return;
				}
			}
			// user has not voted: show vote display
			this.display = "vote";
		},
		async submit(scores: number[]) {
			if (typeof this.$route.params.id !== 'string') {
				return;
			}
			const id = parseInt(this.$route.params.id);
			const vote: VoteDTO = {
				pollId: id,
				scores,
			};
			const response = await callApiJson("/poll/vote", "POST", vote as unknown as Record<string, unknown>);
			if (!response.ok) {
				console.error("vote submission failed");
				return;
			}
			this.hasVoted = true;
			this.display = "result";
		},
	},
	computed: {
		showVote() {
			return this.display === "vote";
		},
		viewOptions() {
			const items = [
				{
					label: "View",
					items: [
						{
							label: this.hasVoted ? "Vote Again" : "Vote",
							icon: this.hasVoted ? "pi pi-undo" : "pi pi-send",
							command: () => {
								this.display = "vote";
							}
						},
						{
							label: "Result",
							icon: "pi pi-book",
							command: () => {
								this.display = "result";
							}
						},
					]
				}
			];
			if (this.poll.closed) {
				return items.filter((item) => item.label !== "vote");
			} else {
				return items;
			}
		},
	},
	mounted() {
		this.loadData();
	},
	components: { VoteForm, VoteResult, Splitter, SplitterPanel, PrimeMenu }
});
</script>

<style scoped>
.submit-button {
	margin: auto;
	text-align: center;
	padding: 10px;
}
</style>
