<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import ThemeToggle from './ThemeToggle.svelte';
	import CVDownload from './CVDownload.svelte';
	
	let isMenuOpen = $state(false);
	let isScrolled = $state(false);
	
	onMount(() => {
		const handleScroll = () => {
			isScrolled = window.scrollY > 50;
		};
		
		const handleClickOutside = (event: Event) => {
			const target = event.target as Element;
			if (isMenuOpen && !target.closest('.mobile-sidebar') && !target.closest('.menu-toggle')) {
				isMenuOpen = false;
			}
		};
		
		const handleBodyScroll = () => {
			if (isMenuOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		};
		
		$effect(() => {
			handleBodyScroll();
		});
		
		window.addEventListener('scroll', handleScroll);
		document.addEventListener('click', handleClickOutside);
		
		return () => {
			window.removeEventListener('scroll', handleScroll);
			document.removeEventListener('click', handleClickOutside);
			document.body.style.overflow = '';
		};
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

<header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 {isMenuOpen ? 'bg-white dark:bg-gray-900 z-40' : (isScrolled ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg' : 'bg-transparent')}">
	<nav class="container mx-auto px-6 py-4">
		<div class="flex items-center justify-between">
			<!-- Logo/Nome -->
			<a href="/" class="text-lg md:text-xl font-bold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
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
				<CVDownload />
			</div>
			
			<!-- Mobile Menu Button -->
			<div class="md:hidden flex items-center space-x-4">
				<!-- Theme Toggle Mobile -->
				<ThemeToggle />
				
				<button 
					class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors menu-toggle p-2 -m-2"
					onclick={(e) => {
						e.stopPropagation();
						toggleMenu();
					}}
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
	</nav>
</header>

<!-- Mobile Navigation Sidebar (fuori dall'header) -->
<!-- Overlay -->
{#if isMenuOpen}
	<div 
		class="fixed inset-0 bg-black/50 backdrop-blur-sm z-[55] md:hidden transition-opacity duration-300"
		role="button"
		tabindex="0"
		onclick={closeMenu}
		onkeydown={(e) => e.key === 'Escape' && closeMenu()}
		aria-label="Close menu"
	></div>
{/if}

<!-- Sidebar -->
<div class="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-900 shadow-2xl z-[60] md:hidden transform transition-transform duration-300 ease-out mobile-sidebar border-l border-gray-200 dark:border-gray-700 {isMenuOpen ? 'translate-x-0' : 'translate-x-full'}">
	<!-- Sidebar Header -->
	<div class="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
		<h2 class="text-xl font-bold text-gray-900 dark:text-white">Menu</h2>
		<button 
			class="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
			onclick={closeMenu}
			aria-label="Close menu"
		>
			<svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
			</svg>
		</button>
	</div>
	
	<!-- Navigation Links -->
	<div class="px-6 py-4 flex flex-col space-y-4">
		{#each navigationItems as item}
			<a 
				href={item.href} 
				class="flex items-center py-3 text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors font-medium border-b border-gray-100 dark:border-gray-800 {$page.url.pathname === item.href ? 'text-blue-600 dark:text-blue-400' : ''}"
				onclick={closeMenu}
			>
				<span class="text-lg">{$t(item.labelKey)}</span>
				{#if $page.url.pathname === item.href}
					<svg class="w-5 h-5 ml-auto" fill="currentColor" viewBox="0 0 20 20">
						<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
					</svg>
				{/if}
			</a>
		{/each}
		
		<!-- CV Download Button -->
		<div class="mt-6">
			<CVDownload onAction={closeMenu} />
		</div>
	</div>
</div>
