<template>
	<div v-if="hasPermissions">
		<div v-if="link">
			<p>link to vote: {{ link }}</p>
			<button @click="copyLink">Copy Link</button> 
		</div>
		<div v-else>
			<h3>Poll Name </h3>
			<input type="text" v-model="name">
			<h3>Poll Options</h3>
			<div v-for="option in options">
				<input v-model="option.text">
			</div>
			<button @click="extraOption">add more</button>
			<button @click="submit">submit</button>
		</div>
	</div>
	<div v-else>
		<p>you don't have permission to create a poll</p>
	</div>
</template>

<script lang="ts">
import { useUserStore } from "@/stores/user";
import { callApiJson } from "@/util/api";
import { Role } from "@/util/backend.types";
import { defineComponent } from "vue";

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
	let result = [];
	for (let i = 0; i < n; i++) {
		result.push({ text: "" });
	}
	return result;
}

function isEmpty(array: Text[]) {
	for (let x of array) {
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
	computed: {
		hasPermissions() {
			return useUserStore().role === Role.SuperUser;
		},
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
			alert(`copied ${this.link} to clipboard`);
		},
		extraOption() {
			this.options.push({ text: "" });
			this.numOptions += 1;
		},
	}
});
</script>
