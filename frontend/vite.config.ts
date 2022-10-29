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
			port: 8080,
			proxy: {
				"/api": {
					target: env.BACKEND_URL || 'http://backend:3000/',
					rewrite: (path) => path.replace(/^\/api/, ""),
				},
			},
		},
	}
})
