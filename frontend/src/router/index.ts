import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import NotFound from "@/components/NotFound.vue";
import VoteView from "@/views/VoteView.vue";
import AdminView from '@/views/AdminView.vue';
import VoteListView from '@/views/VoteListView.vue';
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
			path: "/vote",
			name: "vote-view",
			component: VoteListView,
		},
		{
			path: "/vote/:id",
			name: "vote",
			component: VoteView,
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
