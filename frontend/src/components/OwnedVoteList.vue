<template>
	<div>
		<VoteList :model="openPolls" label="Open Votes" :showAdminOptions="true"  @pollClosed="refresh" />
		<VoteList :model="closedPolls" label="Closed Votes" />
	</div>
</template>

<script lang="ts">
import callApi from '@/util/api';
import type { Poll } from '@/util/backend.types';
import { defineComponent } from 'vue';
import VoteList from './VoteList.vue';

interface Model {
	polls: Poll[];
}

export default defineComponent({
	name: "OwnedVoteList",
	data(): Model {
		return {
			polls: [],
		};
	},
	methods: {
		async loadPolls() {
			const response = await callApi("/poll");
			this.polls = await response.json();
		},
		refresh() {
			this.loadPolls();
		}
	},
	computed: {
		openPolls() {
			return this.polls.filter((poll) => !poll.closed);
		},
		closedPolls() {
			return this.polls.filter((poll) => poll.closed);
		}
	},
	mounted() {
		this.refresh();
	},
	components: { VoteList }
})
</script>
