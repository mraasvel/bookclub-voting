<template>
	<div v-if="error">
		<p> {{ error }}</p>
	</div>
    <div v-else-if="showResult">
        <PollResult :pollId="poll.id" />
        <button @click="showResult = !showResult">back to vote</button>
    </div>
	<div v-else>
		<h3> {{ poll.name }} </h3>
		<div v-for="(option, index) in options" :key="index">
			<VoteOptionComponent :name="option.text" :score="option.score" @update-score="(score) => { option.score = score; }" />
		</div>
		<br />
		<button @click="submit">submit vote</button>
		<button @click="showResult = !showResult">view result</button>
	</div>
</template>

<script lang="ts">
import callApi, { callApiJson } from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import VoteOptionComponent from "./VoteOption.vue";
import PollResult from "./PollResult.vue";
import { useUserStore } from "@/stores/user";

interface VoteOption {
	text: string;
	score: number; // 1-5, default = 3
}

interface Model {
    poll: Poll;
    options: VoteOption[];
	error: string;
    showResult: boolean,
}

interface VoteDTO {
	pollId: number;
	scores: number[];
}

export default defineComponent({
	data(): Model {
		return {
			poll: {
				id: 0,
				name: "",
				options: [],
				votes: [],
			},
			options: [],
			error: "",
			showResult: false,
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
			if (!response.ok) {
				this.error = "failed to fetch vote";
				return;
			}
			const poll: Poll = await response.json();
			this.options = poll.options.map((text) => { return { text, score: 3 }; });
			this.poll = poll;
			for (const vote of poll.votes) {
				if (vote.user === useUserStore().id) {
					this.showResult = true;
				}
			}
		},
		async submit() {
			if (typeof this.$route.params.id !== 'string') {
				return;
			}
			const id = parseInt(this.$route.params.id);
			const vote: VoteDTO = {
				pollId: id,
				scores: this.options.map((option) => option.score),
			};
			const response = await callApiJson("/poll/vote", "POST", vote as unknown as Record<string, unknown>);
			if (!response.ok) {
				this.error = "failed to vote";
				return;
			}
			this.showResult = true;
		}
	},
	mounted() {
		this.loadData();
	},
	components: { VoteOptionComponent, PollResult }
});
</script>
