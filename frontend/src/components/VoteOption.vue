<template>
	<div>
		<p> {{ name }}</p>
		<input type="radio" id="0" :value="0" v-model="picked">
		<label for="0">hate it</label>
		<input type="radio" id="1" :value="1" v-model="picked">
		<label for="1">dislike it</label>
		<input type="radio" id="2" :value="2" v-model="picked">
		<label for="2">neutral</label>
		<input type="radio" id="3" :value="3" v-model="picked">
		<label for="3">like it</label>
		<input type="radio" id="4" :value="4" v-model="picked">
		<label for="4">love it</label>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
	data() {
		return {
			entries: ["hate it", "dislike it", "neutral", "like it", "love it"],
			picked: 2,
		}
	},
	props: {
		name: String,
		score: Number,
	},
	emits: {
		updateScore(score: number) {
			return score >= 1 && score <= 5;
		}
	},
	watch: {
		picked(newValue: number) {
			this.$emit("updateScore", newValue + 1);
		}
	}
});
</script>

<style>
#checkbox {
	float: left
}
</style>
