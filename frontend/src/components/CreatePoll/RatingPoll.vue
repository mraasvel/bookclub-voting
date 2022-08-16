<template>
	<div>
		<h3>Poll Name </h3>
		<InputText type="text" v-model="name" />
		<h3>Poll Options</h3>
		<div v-for="(option, index) in options" :key="index">
			<InputText type="text" v-model="option.text" />
		</div>
		<PrimeButton class="" @click="extraOption" label="add more" />
		<PrimeButton class="p-button-success p-button-rounded mt-1" @click="submit" label="submit" />
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Toast from "primevue/toast";
import PrimeButton from "primevue/button";
import InputText from "primevue/inputtext";
import { callApiJson } from '@/util/api';

interface Text {
	text: string;
}

interface Model {
	name: string;
	options: Text[];
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
	name: "RatingPoll",
	components: {
		Toast,
		PrimeButton,
		InputText,
	},
	emits: {
		submit(payload: string) {
			return payload.length > 0;
		},
	},
	data(): Model {
		const numOptions = 5;
		return {
			name: "",
			options: initOptions(numOptions),
			numOptions,
		};
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
			const link = `${websiteUrl}/vote/${id}`;
			this.$emit("submit", link);
		},
		extraOption() {
			this.options.push({ text: "" });
			this.numOptions += 1;
		}
	}
})
</script>
