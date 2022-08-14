<template>
<div>
	<Splitter layout="horizontal">
		<SplitterPanel :size="10">
			<PrimeMenu :model="viewOptions" />
		</SplitterPanel>
		<SplitterPanel :size="90">
			<div v-if="display === 'createPoll'">
				<PrimeButton class="b p-button-rounded p-button-outlined p-button-raised p-button-text" label="Create Poll" @click="goToPoll" />
			</div>
			<div v-if="display === 'polls'">
				<OwnedVoteList />
			</div>
		</SplitterPanel>
	</Splitter>
</div>
	<div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimeButton from "primevue/button";
import OwnedVoteList from "../components/OwnedVoteList.vue";
import Splitter from "primevue/splitter";
import SplitterPanel from "primevue/splitterpanel";
import PrimeMenu from "primevue/menu";

interface Model {
	display: "createPoll" | "polls";
}

export default defineComponent({
	data(): Model {
		return {
			display: "polls",
		};
	},
	computed: {
		viewOptions() {
			return [
				{
					label: "View",
					items: [
						{
							label: "New Poll",
							command: () => {
								this.display = "createPoll";
							}
						},
						{
							label: "Polls",
							command: () => {
								this.display = "polls";
							}
						}
					],
				}
			];
		}
	},
	methods: {
		goToPoll() {
			this.$router.push("/poll");
		}
	},
	components: {
		PrimeButton,
		OwnedVoteList,
		Splitter,
		SplitterPanel,
		PrimeMenu,
	},
});
</script>

<style scoped>
.b {
	margin-top: 5px;
}
</style>
