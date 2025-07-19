<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import ThemeToggle from './ThemeToggle.svelte';
	
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
	
	const navigationItems = [
		{ href: '/', labelKey: 'common.navigation.home' },
		{ href: '/experiences', labelKey: 'common.navigation.experiences' },
		{ href: '/education', labelKey: 'common.navigation.education' },
		{ href: '/skills', labelKey: 'common.navigation.skills' },
		{ href: '/interests', labelKey: 'common.navigation.interests' },
		{ href: '/contact', labelKey: 'common.navigation.contact' }
	];

	function toggleMenu() {
		isMenuOpen = !isMenuOpen;
	}
	
	function closeMenu() {
		isMenuOpen = false;
	}
</script>

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'}">
	<nav class="container mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo/Nome -->
			<a href="/" class="text-2xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
				{$t('common.name')}
			</a>
			
			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center space-x-8">
				{#each navigationItems as item}
					<a 
						href={item.href} 
						class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium relative group {$page.url.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}"
					>
						{$t(item.labelKey)}
						<span class="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 dark:bg-blue-400 transition-all group-hover:w-full {$page.url.pathname === item.href ? 'w-full' : ''}"></span>
					</a>
				{/each}
				
				<!-- Theme Toggle -->
				<ThemeToggle />
				
				<!-- CV Download Button -->
				<a 
					href="/cv.pdf" 
					target="_blank"
					class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium"
				>
					{$t('common.resume')}
				</a>
			</div>
			
			<!-- Mobile Menu Button -->
			<div class="md:hidden flex items-center space-x-4">
				<!-- Theme Toggle Mobile -->
				<ThemeToggle />
				
				<button 
					class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
					onclick={toggleMenu}
					aria-label="Toggle menu"
				>
					<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						{#if isMenuOpen}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
						{:else}
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
						{/if}
					</svg>
				</button>
			</div>
		</div>
		
		<!-- Mobile Navigation -->
		{#if isMenuOpen}
			<div class="md:hidden mt-4 pb-4 border-t border-gray-200 dark:border-gray-700 pt-4 bg-white dark:bg-gray-900">
				{#each navigationItems as item}
					<a 
						href={item.href} 
						class="block py-2 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium {$page.url.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}"
						onclick={closeMenu}
					>
						{$t(item.labelKey)}
					</a>
				{/each}
				<a 
					href="/cv.pdf" 
					target="_blank"
					class="block mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors font-medium text-center"
					onclick={closeMenu}
				>
					{$t('common.resume')}
				</a>
			</div>
		{/if}
	</nav>
</header>
