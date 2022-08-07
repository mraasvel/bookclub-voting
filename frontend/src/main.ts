import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from "@/router/index"; 
import PrimeVue from 'primevue/config';

import App from './App.vue'
import { checkUserSession } from './util/auth'

import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';

async function bootstrap() {
	const app = createApp(App);
	app.use(router);
	app.use(createPinia());
	app.use(PrimeVue);
	await checkUserSession();
	app.mount('#app')
}

bootstrap();
