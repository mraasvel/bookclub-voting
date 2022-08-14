import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router/index"; 
import PrimeVue from 'primevue/config';
import ToastService from "primevue/toastservice";

import App from './App.vue'
import { checkUserSession } from './util/auth'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import "primeflex/primeflex.css";

async function bootstrap() {
	const app = createApp(App);
	app.use(createPinia());
	await checkUserSession();
	app.use(router);
	app.use(PrimeVue);
	app.use(ToastService);
	app.mount('#app')
}

bootstrap();
