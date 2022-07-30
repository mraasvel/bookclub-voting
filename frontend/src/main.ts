import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import { checkUserSession } from './util/auth'

async function bootstrap() {
	const app = createApp(App)
	app.use(createPinia())
	await checkUserSession();
	app.mount('#app')
}

bootstrap();
