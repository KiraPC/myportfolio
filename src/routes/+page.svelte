<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	
	let heroRef: HTMLElement;
	let highlightsRef: HTMLElement;
	let skillsRef: HTMLElement;
	let isVisible = $state(false);
	let highlightsVisible = $state(false);
	let skillsVisible = $state(false);
	let cardsDealt = $state<boolean[]>([]);
	let skillsBubbled = $state<boolean[]>([]);
	
	onMount(() => {
		const heroObserver = new IntersectionObserver(
			([entry]) => {
				isVisible = entry.isIntersecting;
			},
			{ threshold: 0.1 }
		);
		
		const highlightsObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !highlightsVisible) {
					highlightsVisible = true;
					highlights.forEach((_, index) => {
						setTimeout(() => {
							cardsDealt[index] = true;
						}, index * 150);
					});
				}
			},
			{ threshold: 0.1 }
		);
		
		const skillsObserver = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting && !skillsVisible) {
					skillsVisible = true;
					skills.forEach((_, index) => {
						setTimeout(() => {
							skillsBubbled[index] = true;
						}, index * 150);
					});
				}
			},
			{ threshold: 0.1 }
		);
		
		if (heroRef) {
			heroObserver.observe(heroRef);
		}
		
		if (highlightsRef) {
			highlightsObserver.observe(highlightsRef);
		}
		
		if (skillsRef) {
			skillsObserver.observe(skillsRef);
		}
		
		return () => {
			heroObserver.disconnect();
			highlightsObserver.disconnect();
			skillsObserver.disconnect();
		};
	});
	
	const skills = [
		'Git',
		'JavaScript/TypeScript',
		'Node.js',
		'Python',
		'Java',
		'SvelteKit',
		'Go',
		'AWS',
		'Docker',
		'Kubernetes',
	];
	
	const highlights = [
		{
			icon: '🚀',
			titleKey: 'home.highlights.items.cloud.title',
			descriptionKey: 'home.highlights.items.cloud.description'
		},
		{
			icon: '⚡',
			titleKey: 'home.highlights.items.microservices.title',
			descriptionKey: 'home.highlights.items.microservices.description'
		},
		{
			icon: '🤖',
			titleKey: 'home.highlights.items.automation.title',
			descriptionKey: 'home.highlights.items.automation.description'
		},
		{
			icon: '📊',
			titleKey: 'home.highlights.items.dataEngineering.title',
			descriptionKey: 'home.highlights.items.dataEngineering.description'
		}
	];
	
	const parseMarkup = (text: string) => {
		return text.replace(/{strong}(.*?){\/strong}/g, '<strong>$1</strong>');
	};
	
	cardsDealt = new Array(highlights.length).fill(false);
	skillsBubbled = new Array(skills.length).fill(false);
</script>

<svelte:head>
	<title>{$t('home.title')}</title>
	<meta name="description" content={$t('home.metaDescription')} />
</svelte:head>

<!-- Hero Section -->
<section bind:this={heroRef} class="pt-20 pb-16 px-6 min-h-screen flex items-center">
	<div class="container mx-auto">
		<div class="max-w-4xl mx-auto text-center">
			<div class="transform transition-all duration-1000 {isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}">
				<h1 class="text-5xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6">
					{$t('home.hero.greeting')}
					<span class="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
						{$t('home.hero.name')}
					</span>
				</h1>
				
				<h2 class="text-2xl md:text-3xl text-gray-600 dark:text-gray-300 mb-8 font-light">
					{$t('home.hero.jobTitle')}
				</h2>
				
				<p class="text-lg md:text-xl text-gray-700 dark:text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
					{@html parseMarkup($t('home.hero.description'))}
				</p>
				
				<div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
					<a 
						href="/contact" 
						class="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg"
					>
						{$t('home.hero.contactButton')}
					</a>
					<a 
						href="/experiences" 
						class="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 font-semibold text-lg"
					>
						{$t('home.hero.experienceButton')}
					</a>
				</div>
			</div>
		</div>
	</div>
</section>

<!-- Skills Preview -->
<section class="py-16 bg-white dark:bg-gray-900 transition-colors duration-300">
	<div class="container mx-auto px-6">
		<div class="text-center mb-12">
			<h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{$t('home.skills.title')}</h3>
			<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				{$t('home.skills.description')}
			</p>
		</div>

		<div bind:this={skillsRef} class="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
			{#each skills as skill, index}
				<div 
					class="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-6 py-3 rounded-full font-medium hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 transition-all transform hover:scale-110 shadow-sm cursor-pointer
					{skillsBubbled[index] 
						? 'scale-100 opacity-100' 
						: 'scale-0 opacity-0'
					}"
					style="
						transition-duration: 600ms;
						transition-timing-function: cubic-bezier(0.68, -0.55, 0.265, 1.55);
						transform-origin: center;
					"
				>
					{skill}
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- Highlights -->
<section class="py-16 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
	<div class="container mx-auto px-6">
		<div class="text-center mb-16">
			<h3 class="text-3xl font-bold text-gray-900 dark:text-white mb-4">{$t('home.highlights.title')}</h3>
			<p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
				{$t('home.highlights.description')}
			</p>
		</div>
		
		<div bind:this={highlightsRef} class="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto relative">
			{#each highlights as highlight, index}
				<div 
					class="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 dark:border-gray-700 text-center transform transition-all duration-700 ease-out cursor-pointer group
					{cardsDealt[index] 
						? 'translate-x-0 translate-y-0 rotate-0 opacity-100 scale-100' 
						: 'translate-x-[-200px] translate-y-[-100px] rotate-[-15deg] opacity-0 scale-75'
					}
					hover:-translate-y-2 hover:scale-105 hover:rotate-1 hover:shadow-xl"
					style="
						transition-delay: {cardsDealt[index] ? '0ms' : '0ms'};
						transform-origin: center;
						z-index: {highlights.length - index};
					"
				>
					<div class="text-4xl mb-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:animate-bounce">{highlight.icon}</div>
					<h4 class="text-xl font-semibold text-gray-900 dark:text-white mb-3 transition-colors duration-300">{$t(highlight.titleKey)}</h4>
					<p class="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">{$t(highlight.descriptionKey)}</p>
					
					<!-- Effetto carta: bordo sottile e ombra -->
					<div class="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-200 dark:group-hover:border-blue-700 transition-colors duration-300 pointer-events-none"></div>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CTA Section -->
<section class="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
	<div class="container mx-auto px-6 text-center">
		<h3 class="text-3xl font-bold mb-4">{$t('home.cta.title')}</h3>
		<p class="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
			{$t('home.cta.description')}
		</p>
		<a 
			href="/contact" 
			class="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition-all transform hover:scale-105 font-semibold text-lg shadow-lg inline-block"
		>
			{$t('home.cta.button')}
		</a>
	</div>
</section>
