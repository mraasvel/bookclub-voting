<template>
<h3> Books </h3>
<p v-for="book in books" :key="book.name">
	{{ book.name }} - {{ book.author }}
</p>
</template>

<script lang="ts">
import callApi from "@/util/api";
import { defineComponent } from "vue";

interface Book {
	name: string,
	author: string,
}

interface Model {
	books: Book[],
}

export default defineComponent({
	data(): Model {
		return {
			books: [],
		}
	},
	async mounted() {
		const response = await callApi("/book");
		if (response.ok) {
			this.books = await response.json();
		}
	}
});
</script>
