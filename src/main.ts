import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		cursorDir: "https://raw.githubusercontent.com/MikhaD/svg-editor/main/public/cursor/svg"
	}
});

export default app;
