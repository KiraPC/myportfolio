<script lang="ts">
	import { locale, loadTranslations } from '$lib/translations';
	import { languageStore } from '$lib/stores/language';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { analytics } from '$lib/analytics';

	let currentLocale = $state($locale);

	$effect(() => {
		currentLocale = $locale;
	});

	const handleLanguageChange = async (event: Event) => {
		const target = event.target as HTMLSelectElement;
		const newLocale = target.value;
		
		if (newLocale !== $locale) {
			const oldLocale = $locale;
			
			locale.set(newLocale);
			languageStore.set(newLocale);
			
			// Track language change
			analytics.languageChange(oldLocale, newLocale);
			
			await loadTranslations(newLocale, page.url.pathname);
			
			const currentPath = page.url.pathname;
			const searchParams = new URLSearchParams(page.url.searchParams);
			searchParams.set('lang', newLocale);
			const newUrl = `${currentPath}?${searchParams.toString()}`;
			
			await goto(newUrl, { invalidateAll: true });
		}
	};

	const languages = [
		{ code: 'it', name: 'Italiano', flag: '🇮🇹' },
		{ code: 'en', name: 'English', flag: '🇺🇸' }
	];
</script>

<div class="relative">
	<select
		bind:value={currentLocale}
		onchange={handleLanguageChange}
		class="bg-gray-800 dark:bg-gray-900 text-white border border-gray-600 dark:border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none cursor-pointer pr-10"
	>
		{#each languages as lang}
			<option value={lang.code}>
				{lang.flag} {lang.name}
			</option>
		{/each}
	</select>
	
	<!-- Custom dropdown arrow -->
	<div class="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
		<svg class="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
		</svg>
	</div>
</div>
