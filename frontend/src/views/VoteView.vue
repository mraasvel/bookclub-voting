<template>
	<VoteForm :label="poll.name" :options="poll.options" />
</template>

<script lang="ts">
import callApi from "@/util/api";
import type { Poll } from "@/util/backend.types";
import { defineComponent } from "vue";
import VoteForm from "@/components/VoteForm.vue";

interface Model {
	poll: Poll;
}

export default defineComponent({
    data(): Model {
        return {
			poll: { id: 0, name: "", options: [], votes: [] }
		};
    },
    methods: {
        async loadData() {
            const id = this.$route.params.id;
            if (!id) {
                console.error("no route param");
                return;
            }
            const response = await callApi(`/poll/${id}`);
            const poll: Poll = await response.json();
            this.poll = poll;

            // check if this user has voted
            // for (const vote of poll.votes) {
            // 	if (vote.user === useUserStore().id) {
            // 		this.showResult = true;
            // 	}
            // }
        },
    },
    mounted() {
        this.loadData();
    },
    components: { VoteForm }
});
</script>
