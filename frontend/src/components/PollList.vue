<template>
	<h3> Open Votes </h3>
	<div v-for="poll in polls" :key="poll.id">
		<button @click="toPoll(poll.id)"> {{ poll.name }} </button>
		<p> Number of votes: {{ poll.votes.length }}</p>
	</div>
</template>

<script lang="ts">
import callApi from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";

interface Model {
	polls: Poll[]
}

export default defineComponent({
	data(): Model {
		return {
			polls: []
		};
	},
	methods: {
		async loadPolls() {
			const response = await callApi("/poll");
			this.polls = await response.json();
			console.log(this.polls);
		},
		toPoll(id: number) {
			this.$router.push(`/vote/${id}`);
		},
	},
	mounted() {
		this.loadPolls();
	},
});
</script>
