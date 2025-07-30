<script lang="ts">
	import { onMount } from 'svelte';
	import { t, locale } from '$lib/translations';
	import { analytics } from '$lib/analytics';

	// Props
	let { onAction }: { onAction?: () => void } = $props();

	// Dropdown state
	let isDropdownOpen = $state(false);
	let dropdownRef: HTMLDivElement;

	// Resume URLs mapping
	const resumeUrls = {
		it: 'https://rxresu.me/kirapc/senior-software-engineer-ita',
		en: 'https://rxresu.me/kirapc/senior-software-engineer-eng'
	};

	// Flag emojis
	const flags = {
		it: '🇮🇹',
		en: '🇬🇧'
	};

	// Get current language resume URL using $derived
	const currentResumeUrl = $derived(resumeUrls[$locale as keyof typeof resumeUrls] || resumeUrls.en);

	// Handle main button click - open current language resume
	function handleMainClick() {
		window.open(currentResumeUrl, '_blank');
		analytics.downloadCV();
		onAction?.();
	}

	// Handle dropdown option click
	function handleLanguageClick(lang: 'it' | 'en') {
		window.open(resumeUrls[lang], '_blank');
		analytics.downloadCV();
		isDropdownOpen = false;
		onAction?.();
	}

	// Toggle dropdown
	function toggleDropdown() {
		isDropdownOpen = !isDropdownOpen;
	}

	// Close dropdown when clicking outside
	function handleClickOutside(event: MouseEvent) {
		if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
			isDropdownOpen = false;
		}
	}

	onMount(() => {
		document.addEventListener('click', handleClickOutside);
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	});
</script>

<div class="relative inline-flex" bind:this={dropdownRef}>
	<!-- Main CV Button -->
	<button
		onclick={handleMainClick}
		class="bg-blue-600 text-white px-4 py-2 rounded-l-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium flex items-center space-x-2"
		title={$t('common.resume.download')}
	>
		<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
		</svg>
		<span>{$t('common.resume.label')}</span>
	</button>

	<!-- Dropdown Toggle Button -->
	<button
		onclick={toggleDropdown}
		class="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 border-l border-blue-500/30 dark:border-blue-400/30"
		title={$t('common.resume.selectLanguage')}
		aria-label={$t('common.resume.selectLanguage')}
	>
		<svg 
			class="w-4 h-4 transition-transform duration-200 {isDropdownOpen ? 'rotate-180' : ''}"
			fill="none" 
			stroke="currentColor" 
			viewBox="0 0 24 24"
		>
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
		</svg>
	</button>

	<!-- Dropdown Menu -->
	{#if isDropdownOpen}
		<div class="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-600 z-50 min-w-full overflow-hidden">
			<button
				onclick={() => handleLanguageClick('it')}
				class="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 text-gray-900 dark:text-white"
			>
				<span class="text-lg">{flags.it}</span>
				<span class="font-medium">{$t('common.resume.languages.it')}</span>
			</button>
			<button
				onclick={() => handleLanguageClick('en')}
				class="w-full px-4 py-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-center space-x-3 text-gray-900 dark:text-white border-t border-gray-200 dark:border-gray-600"
			>
				<span class="text-lg">{flags.en}</span>
				<span class="font-medium">{$t('common.resume.languages.en')}</span>
			</button>
		</div>
	{/if}
</div>
