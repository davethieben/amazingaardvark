import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'dave'
	}
});

export default app;
