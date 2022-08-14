<template>
	<div>
		<VoteList label="Open Votes" :model="openVotes" />
		<VoteList label="Closed Votes" :model="closedVotes" />
	</div>
</template>

<script lang="ts">
import callApi from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import VoteList from "../components/VoteList.vue";

interface Model {
	votes: Poll[];
}

export default defineComponent({
	data(): Model {
		return {
			votes: []
		};
	},
	methods: {
		async loadPolls() {
			const response = await callApi("/poll");
			this.votes = await response.json();
		},
	},
	computed: {
		openVotes() {
			return this.votes.filter((vote) => !vote.closed);
		},
		closedVotes() {
			return this.votes.filter((vote) => vote.closed);
		}
	},
	mounted() {
		this.loadPolls();
	},
	components: { VoteList }
});
</script>
