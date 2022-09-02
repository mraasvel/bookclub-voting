<template>
	<div class="box">
		<Toast />
		<div v-if="link">
			<div class="p-inputgroup">
				<PrimeButton class="block mt-3 p-button-outlined p-button-raised p-button-text p-button-plain" label="Copy Link" @click="copyLink" />
				<InputText :disabled="true" type="text" :value="link" class="block mt-3" :placeholder="link"/>
			</div>
			<PrimeButton class="block mt-3 p-button-help p-button-outlined p-button-raised" @click="link = ''">New Poll</PrimeButton>
		</div>
		<div v-else>
			<RatingPoll @submit="handleSubmit" />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Toast from "primevue/toast";
import PrimeButton from "primevue/button";
import InputText from "primevue/inputtext";
import RatingPoll from "./RatingPoll.vue";

export default defineComponent({
	name: "CreatePoll",
	components: {
		Toast,
		PrimeButton,
		InputText,
		RatingPoll
	},
	data() {
		return {
			link: "",
		}
	},
	methods: {
		copyLink() {
			navigator.clipboard.writeText(this.link);
			this.$toast.add({
				severity: "info",
				summary: `Copied: ${this.link}`,
				life: 3000,
			});
		},
		handleSubmit(link: string) {
			this.link = link;
		},
	}
});
</script>

<style scoped>
.box {
	width: 500px
}

.center {
	margin: auto;
	text-align: center;
	padding: 10px;
}
</style>
