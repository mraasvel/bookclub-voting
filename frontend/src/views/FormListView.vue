<template>
	<div>
		<FormList label="Open Votes" :model="openVotes" />
		<FormList label="Closed Votes" :model="closedVotes" />
	</div>
</template>

<script lang="ts">
import FormList from "@/components/FormList.vue";
import callApi from "@/util/api";
import type { Form } from "@/util/backend.types";
import { defineComponent } from "vue";

interface Model {
	forms: Form[];
}

export default defineComponent({
	name: "FormListView",
	components: { FormList },
	data(): Model {
		return {
			forms: []
		};
	},
	methods: {
		async loadForms() {
			const response = await callApi("/form");
			this.forms = await response.json();
		},
	},
	computed: {
		openVotes() {
			return this.forms.filter((form) => !form.closed);
		},
		closedVotes() {
			return this.forms.filter((form) => form.closed);
		}
	},
	mounted() {
		this.loadForms();
	},
});
</script>
