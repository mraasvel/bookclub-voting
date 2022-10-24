<template>
	<Card>
		<template #title>
			{{ label }}
		</template>
		<template #content>
			<DataTable :value="forms" selectionMode="single" dataKey="id"
				@rowSelect="onRowSelect" responsiveLayout="scroll">
				<Column field="name" header="Vote Name"></Column>
				<!-- <Column v-if="showAdminOptions" header="Close">
					<template #body="slotProps">
						<PrimeButton icon="pi pi-times" class="p-button-danger p-button-rounded" label="Close" @click="closeVote(slotProps.data.id)" />
					</template>
				</Column> -->
			</DataTable>
		</template>
	</Card>
</template>

<script lang="ts">
import type { Form } from '@/util/backend.types';
import Card from 'primevue/card';
import Column from 'primevue/column';
import DataTable from 'primevue/datatable';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
    name: "FormList",
	components: { Card, DataTable, Column },
    props: {
        model: {
            type: Object as PropType<Form[]>,
            required: true,
        },
        label: {
            type: String,
            required: true,
        },
        // showAdminOptions: {
        // 	type: Boolean,
        // 	required: false,
        // },
    },
    computed: {
        forms() {
            return this.model.map((form) => {
                return {
                    id: form.id,
                    name: form.name,
                };
            });
        },
    },
    methods: {
        onRowSelect(event: any) {
            this.$router.push(`/form/${event.data.id}`);
        },
    },
});
</script>
