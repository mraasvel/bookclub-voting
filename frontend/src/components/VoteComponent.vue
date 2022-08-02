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
import callApi from "@/util/api";
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
		submit() {
			console.log("submit:", this.options);
		}
    },
    mounted() {
        this.loadData();
    },
    components: { VoteOption }
});
</script>
