import { createRouter, createWebHistory } from 'vue-router'
import Home from "@/views/Home.vue";
import CreatePoll from "@/components/CreatePoll.vue";

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
			path: "/poll/:id",
			name: "poll",
			// todo: make PollView
			component: Home,
		},
	]
})

export default router
