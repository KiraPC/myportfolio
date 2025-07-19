<script lang="ts">
	import '../app.css';
	import Header from '$lib/components/Header.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import { theme } from '$lib/stores/theme';
	import { languageStore } from '$lib/stores/language';
	import { locale } from '$lib/translations';
	import { onMount } from 'svelte';
	import { dev } from '$app/environment';
	import { inject } from '@vercel/analytics';
	
	let { children, data } = $props();
	
	onMount(async () => {
		theme.init();

		await languageStore.init();

		languageStore.subscribe(lang => {
			locale.set(lang);
		});

		if (data.locale) {
			languageStore.set(data.locale);
		}

		// Initialize Vercel Analytics for visitor tracking
		// Tracks page views, referrers, and user geography
		if (!dev) {
			inject({
				mode: 'production'
			});
		}
	});
</script>

<div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-gray-900 dark:to-gray-800 flex flex-col transition-colors duration-300">
	<Header />
	<main class="flex-1">
		{@render children()}
	</main>
	<Footer />
</div>
