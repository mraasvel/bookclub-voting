<template>
	<Splitter layout="horizontal">
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

interface Model {
	form: Form;
	currentDisplay: Display;
	hasVoted: boolean;
}

export default defineComponent({
    name: "FormView",
	components: { FormQuestions, FormResult, Splitter, SplitterPanel, PrimeMenu },
    data(): Model {
        return {
            form: { id: 0, name: "", formQuestions: [], closed: true },
            currentDisplay: "result",
			hasVoted: false,
        };
    },
    computed: {
        canFillForm() {
            return !this.form.closed;
        },
        showQuestions() {
            return this.currentDisplay === "question";
        },
		viewOptions() {
			let views = [
				{
					label: "View",
					items: [] as any[]
				}
			];
			if (!this.form.closed) {
				views[0].items.push({
					label: this.hasVoted ? "Vote Again" : "Vote",
					icon: this.hasVoted ? "pi pi-undo" : "pi pi-send",
					command: () => {
						this.currentDisplay = "question";
					}
				})
			};
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
            // FIXME: check if user has already voted on this form, in which case the default view should be "result"
            if (!this.form.closed) {
                this.currentDisplay = "question";
            }
        },
		refresh() {
			this.loadForm();
		}
    },
    mounted() {
        this.refresh();
    },
});
</script>
