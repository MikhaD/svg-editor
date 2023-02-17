import { defineConfig } from 'vite';
import { svelte, vitePreprocess } from '@sveltejs/vite-plugin-svelte';

// https://vitejs.dev/config/
export default defineConfig({
	base: "/svg-editor/",
	plugins: [svelte({
		// hot: !process.env.VITEST,
		preprocess: vitePreprocess(),
	})],
	// test: {}
});
