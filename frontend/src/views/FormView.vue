<template>
	<Splitter v-if="form !== null" layout="horizontal">
		<SplitterPanel :size="10">
			<PrimeMenu :model="viewOptions" />
		</SplitterPanel>
		<SplitterPanel :size="90">
			<FormQuestions v-if="showQuestions" :form="form" @refresh="refresh" />
			<FormResult v-else :form="form" />
		</SplitterPanel>
	</Splitter>
</template>

<script lang="ts">
import FormQuestions from '@/components/FormQuestions.vue';
import FormResult from '@/components/FormResult.vue';
import callApi from '@/util/api';
import type { Form } from '@/util/backend.types';
import Splitter from 'primevue/splitter';
import SplitterPanel from 'primevue/splitterpanel';
import { defineComponent } from 'vue';
import PrimeMenu from "primevue/menu";

type Display = "result" | "question";
type SubmitStatus = "submitted" | "notSubmitted";
interface SubmitStatusResponse {
	status: SubmitStatus,
}

interface Model {
	form: Form | null;
	currentDisplay: Display;
	hasVoted: boolean;
}

export default defineComponent({
	name: "FormView",
	components: { FormQuestions, FormResult, Splitter, SplitterPanel, PrimeMenu },
	data(): Model {
		return {
			form: null,
			currentDisplay: "result",
			hasVoted: false,
		};
	},
	computed: {
		canFillForm() {
			return this.form && !this.form.closed;
		},
		showQuestions() {
			return this.currentDisplay === "question";
		},
		viewOptions() {
			const views = [
				{
					label: "View",
					items: [] as any[]
				}
			];
			if (this.form && !this.form.closed) {
				views[0].items.push({
					label: this.hasVoted ? "Update Vote" : "Vote",
					icon: this.hasVoted ? "pi pi-undo" : "pi pi-send",
					command: () => {
						this.currentDisplay = "question";
					}
				})
			}
			views[0].items.push(
				{
					label: "Result",
					icon: "pi pi-book",
					command: () => {
						this.currentDisplay = "result";
					}
				},
			)
			return views;
		},
	},
	methods: {
		async loadForm() {
			const id = this.$route.params.id;
			if (!id) {
				console.error("no route param");
				return;
			}
			const response = await callApi(`/form/${id}`);
			this.form = await response.json();
		},
		async determineInitialDisplay() {
			const id = this.form!.id;
			const response = await callApi(`/form/submit-status/${id}`);
			const submitStatus: SubmitStatusResponse = await response.json();
			this.hasVoted = submitStatus.status === "submitted";
			if (this.hasVoted || this.form!.closed) {
				this.currentDisplay = "result";
			} else {
				this.currentDisplay = "question";
			}
		},
		async refresh() {
			try {
				await this.loadForm();
				await this.determineInitialDisplay();
			} catch (error: any) {
				console.error(error);
			}
		}
	},
	mounted() {
		this.refresh();
	},
});
</script>
