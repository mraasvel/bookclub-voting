<template>
	<div v-if="error">
		<p> {{ error }}</p>
	</div>
	<div v-else>
		<h3> {{ name }} </h3>
		<div v-for="(option, index) in options">
			<VoteOption :name="option.text" :score="option.score" @update-score="(score) => { option.score = score; }" />
		</div>
		<br />
		<button @click="submit">submit vote</button>
	</div>
</template>

<script lang="ts">
import callApi, { callApiJson } from "@/util/api";
import { defineComponent } from "vue";
import VoteOption from "./VoteOption.vue";

interface VoteOption {
	text: string;
	score: number; // 1-5, default = 3
}

interface Model {
	name: string;
	options: VoteOption[];
	error: string;
}

interface VoteDTO {
	pollId: number;
	scores: number[];
}

export default defineComponent({
    data(): Model {
        return {
            name: "",
            options: [],
            error: "",
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
            if (!response.ok) {
                this.error = "failed to fetch vote";
                return;
            }
            const { name, options }: {
                name: string;
                options: string[];
            } = await response.json();
            this.options = options.map((text) => { return { text, score: 3 }; });
            this.name = name;
        },
		async submit() {
			console.log("submit:", this.options);
            if (typeof this.$route.params.id !== 'string') {
                return;
            }
            const id = parseInt(this.$route.params.id);
            const vote: VoteDTO = {
                pollId: id,
                scores: this.options.map((option) => option.score),
            };
            const response = await callApiJson("/poll/vote", "POST", vote as unknown as Record<string, unknown>);
            console.log(await response.json());
		}
    },
    mounted() {
        this.loadData();
    },
    components: { VoteOption }
});
</script>
