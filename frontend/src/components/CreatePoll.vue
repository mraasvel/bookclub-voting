<template>
	<div>
		<Toast />
			<p>link to vote: {{ link }}</p>
			<button @click="copyLink">Copy Link</button>
		<div v-if="link">
		</div>
		<div v-else>
			<h3>Poll Name </h3>
			<input type="text" v-model="name">
			<h3>Poll Options</h3>
			<div v-for="(option, index) in options" :key="index">
				<input v-model="option.text">
			</div>
			<button @click="extraOption">add more</button>
			<button @click="submit">submit</button>
		</div>
	</div>
</template>

<script lang="ts">
import { callApiJson } from "@/util/api";
import { defineComponent } from "vue";
import Toast from "primevue/toast";

interface Text {
	text: string;
}

interface Model {
	name: string;
	options: Text[];
	link: string;
	numOptions: number;
}

function initOptions(n: number) {
	const result = [];
	for (let i = 0; i < n; i++) {
		result.push({ text: "" });
	}
	return result;
}

function isEmpty(array: Text[]) {
	for (const x of array) {
		if (x.text.length > 0) {
			return false;
		}
	}
	return true;
}

export default defineComponent({
	data(): Model {
		const numOptions = 5;
		return {
			name: "",
			options: initOptions(numOptions),
			link: "",
			numOptions,
		}
	},
	components: {
		Toast
	},
	methods: {
		async submit() {
			if (!this.name || isEmpty(this.options)) {
				console.error("insufficient information to create poll");
				return;
			}
			const response = await callApiJson("/poll", "POST", {
				name: this.name,
				options: this.options.map((value) => value.text).filter((value) => value.length > 0),
			});
			this.name = "";
			this.options = [];
			const { id } = await response.json();
			const websiteUrl = import.meta.env.VITE_WEBSITE_URL;
			this.link = `${websiteUrl}/vote/${id}`;
		},
		copyLink() {
			navigator.clipboard.writeText(this.link);
			this.$toast.add({
				severity: "info",
				summary: `Copied: ${this.link}`,
				life: 3000,
			});
		},
		extraOption() {
			this.options.push({ text: "" });
			this.numOptions += 1;
		},
	}
});
</script>
