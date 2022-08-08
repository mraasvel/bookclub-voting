<template>
	<Card>
		<template #title>
			{{ label }}
		</template>
		<template #content>
			<DataTable :value="votes" selectionMode="single" dataKey="id"
				@rowSelect="onRowSelect" responsiveLayout="scroll">
				<Column field="name" header="Vote Name"></Column>
				<Column field="votes" header="Vote Count"></Column>
			</DataTable>
		</template>
	</Card>
</template>

<script lang="ts">
import type { Poll } from "@/util/backend.types";
import { defineComponent, type PropType } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Card from "primevue/card";

export default defineComponent({
	props: {
		model: {
			type: Object as PropType<Poll[]>,
			required: true,
		},
		label: {
			type: String,
			required: true,
		}
	},
	computed: {
		votes() {
			return this.model.map((poll) => {
				return {
					id: poll.id,
					name: poll.name,
					votes: poll.votes.length,
				};
			});
		},
	},
	methods: {
		onRowSelect(event: any) {
			this.$router.push(`/vote/${event.data.id}`);
		},
	},
	components: { DataTable, Column, Card },
});
</script>
