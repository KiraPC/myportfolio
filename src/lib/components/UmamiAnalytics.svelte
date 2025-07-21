<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';
	import { env } from '$env/dynamic/public';

	// Umami configuration - only load in production
	const UMAMI_WEBSITE_ID = env.PUBLIC_UMAMI_WEBSITE_ID;
	const UMAMI_SRC = env.PUBLIC_UMAMI_SRC || 'https://cloud.umami.is/script.js';
	const UMAMI_DOMAINS = env.PUBLIC_UMAMI_DOMAINS || '';

	onMount(() => {
		// Only initialize Umami in production and if website ID is configured
		if (!dev && UMAMI_WEBSITE_ID && typeof window !== 'undefined') {
			initUmami();
		}
	});

	function initUmami() {
		// Check if Umami script is already loaded
		const existingScript = document.querySelector(`script[src="${UMAMI_SRC}"]`);
		if (existingScript) {
			return;
		}

		// Create and load Umami script
		const script = document.createElement('script');
		script.async = true;
		script.src = UMAMI_SRC;
		script.setAttribute('data-website-id', UMAMI_WEBSITE_ID!);
		
		// Optional: Set allowed domains
		if (UMAMI_DOMAINS) {
			script.setAttribute('data-domains', UMAMI_DOMAINS);
		}

		// Add script to head
		document.head.appendChild(script);
		
		console.log('Umami Analytics initialized with Website ID:', UMAMI_WEBSITE_ID);
	}
</script>

<!-- Component doesn't render anything, it just loads Umami -->
