<template>
	<div>
		<DataTable :value="value" dataKey="id" responsiveLayout="scroll">
			<Column field="option" :header="label"></Column>

			<Column header="hate it">
				<template #body="slotProps">
					<RadioButton name="" :value="3" />
				</template>
			</Column>
			<Column header="dislike it">
				<template #body="slotProps">
					<RadioButton name="" :value="3" />
				</template>
			</Column>

		</DataTable>
	</div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from "vue";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import RadioButton from "primevue/radiobutton";

interface Model {
	categories: string[];
}

export default defineComponent({
	props: {
		label: {
			type: String,
			required: true,
		},
		options: {
			type: Object as PropType<Array<string>>,
			required: true,
		},
	},
	data(): Model {
		return {
			categories: ["hate it", "dislike it", "neutral", "like it", "love it"],
		}
	},
	computed: {
		value() {
			return this.options.map((option, index) => {
				return {
					id: index,
					option,
				}
			});
		},
	},
	components: { DataTable, Column, RadioButton }
});
</script>
