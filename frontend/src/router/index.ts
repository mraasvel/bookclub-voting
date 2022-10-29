import { createRouter, createWebHistory } from 'vue-router'
import HomeView from "@/views/HomeView.vue";
import CreatePoll from "@/components/CreatePoll.vue";
import NotFound from "@/components/NotFound.vue";
import VoteView from "@/views/VoteView.vue";
import AdminView from '@/views/AdminView.vue';
import VoteListView from '@/views/VoteListView.vue';
import { useUserStore } from '@/stores/user';
import { Role } from '@/util/backend.types';
import FormListView from '@/views/FormListView.vue';
import FormView from '@/views/FormView.vue';

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
			path: "/form",
			name: "form-view",
			component: FormListView,
		},
		{
			path: "/form/:id",
			name: "form",
			component: FormView,
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
