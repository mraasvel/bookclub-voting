import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import CreatePoll from "@/components/CreatePoll.vue";
import NotFound from "@/components/NotFound.vue";
import VoteComponent from "@/components/VoteComponent.vue";
import AdminView from '@/views/AdminView.vue';
import { useUserStore } from '@/stores/user';
import { Role } from '@/util/backend.types';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "home",
			component: HomeView
		},
		{
			path: "/admin",
			name: "admin",
			component: AdminView,
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
});

router.beforeEach((to, from, next) => {
	if (to.name === "admin" && useUserStore().role !== Role.SuperUser) {
		next({name: "home"});
	} else {
		next();
	}
});

export default router
