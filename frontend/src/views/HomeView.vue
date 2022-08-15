<template>
	<Card>
		<template #title>
			About
		</template>
		<template #content>
			Welcome to the Codam Book Club website. This is where we vote on which books to read.
			I will probably add more stuff and functionality in the future.
		</template>
	</Card>
	<Card>
		<template #title>
			Books
		</template>
		<template #content>
			<h4>Currently Reading</h4>

			<a
				href="https://www.goodreads.com/book/show/22847284-grokking-algorithms-an-illustrated-guide-for-programmers-and-other-curio"
				target="_blank"
			>
				Grokking Algorithms An Illustrated Guide For Programmers and Other Curious People - Aditya Y. Bhargava
			</a>

			<h4>Previous Books</h4>
			<ul>
				<li>
					<a
						href="https://www.goodreads.com/book/show/58128.Head_First_Design_Patterns"
						target="_blank"
					>
						Head First Design Patterns - Eric Freeman, Kathy Sierra, Bert Bates, Elisabeth Robson
					</a>
				</li>
			</ul>
		</template>
	</Card>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Card from "primevue/card";

export default defineComponent({
	components: { Card },
});
</script>
