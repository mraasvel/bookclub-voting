import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import CreatePoll from "@/components/CreatePoll.vue";
import NotFound from "@/components/NotFound.vue";
import VoteComponent from "@/components/VoteComponent.vue";

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/poll",
			name: "create-poll",
			component: CreatePoll,
		},
		{
			path: "/vote/:id",
			name: "vote",
			component: VoteComponent,
		},
		{
			path: '/:pathMatch(.*)*',
			name: 'NotFound',
			component: NotFound
		},
	]
})

export default router
