import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite';
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/

export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')

	return {
		plugins: [vue()],
		resolve: {
			alias: {
				'@': fileURLToPath(new URL('./src', import.meta.url))
			}
		},
		server: {
			host: true, // Makes it accept connections from `0.0.0.0`
			port: parseInt(env.PORT),
			proxy: {
				"/api": {
					target: env.BACKEND_URL,
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	}
})
