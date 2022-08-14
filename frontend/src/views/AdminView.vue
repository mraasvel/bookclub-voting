<template>
	<div>
		<PrimeButton class="b p-button-rounded p-button-outlined p-button-raised p-button-text" label="Create Poll" @click="goToPoll" />
		<OwnedVoteList />
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import PrimeButton from "primevue/button";
import OwnedVoteList from "../components/OwnedVoteList.vue";

export default defineComponent({
	methods: {
		goToPoll() {
			this.$router.push("/poll");
		}
	},
	components: {
		PrimeButton,
		OwnedVoteList
	},
});
</script>

<style scoped>
.b {
	margin-top: 5px;
}
</style>
