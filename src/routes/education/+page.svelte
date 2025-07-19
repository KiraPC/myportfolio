<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	
	let { data } = $props();
	
	let educationRefs: HTMLElement[] = [];
	let visibleEducation = $state<boolean[]>([]);
	let learningRefs: HTMLElement[] = [];
	let visibleLearning = $state<boolean[]>([]);

	onMount(() => {
		const observers: IntersectionObserver[] = [];
		
		educationRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleEducation[index]) {
							visibleEducation[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.1 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		learningRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleLearning[index]) {
							visibleLearning[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.1 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		return () => {
			observers.forEach(observer => observer.disconnect());
		};
	});	

	visibleEducation = new Array(data.educationData.length).fill(false);
	visibleLearning = new Array(data.continuousLearning.length).fill(false);
</script>

<svelte:head>
	<title>{$t('education.title')} - Pasquale Carmine Carbone</title>
	<meta name="description" content={$t('education.metaDescription')} />
</svelte:head>

<div class="pt-20 pb-16">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{$t('education.header.title')}</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				{$t('education.header.description')}
			</p>
		</div>

		<!-- Education Timeline -->
		<div class="max-w-4xl mx-auto mb-20">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{$t('education.timeline.title')}</h2>
			
			<div class="space-y-8">
				{#each data.educationData as education, index}
					<div 
						bind:this={educationRefs[index]}
						class="relative"
					>
						<!-- Timeline line -->
						{#if index < data.educationData.length - 1}
							<div class="absolute left-6 top-16 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400 hidden md:block transform transition-all duration-1000 {visibleEducation[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}" style="animation-delay: {index * 150}ms"></div>
						{/if}
						
						<div class="flex items-start">
							<!-- Icon (parte della timeline) -->
							<div class="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg mr-6 z-10 transform transition-all duration-1000 {visibleEducation[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}" style="animation-delay: {index * 150}ms">
								{education.icon}
							</div>
							
							<!-- Content (card da destra) -->
							<div class="flex-1 bg-white dark:bg-gray-900 rounded-xl shadow-lg hover:shadow-xl p-6 border border-gray-100 dark:border-gray-700 transform transition-all duration-1000 {visibleEducation[index] ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}" style="animation-delay: {(index * 150) + 200}ms">
								<div class="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
									<div class="flex-1">
										<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-1">{$t(education.degree)}</h3>
										<h4 class="text-lg text-blue-600 dark:text-blue-400 font-semibold mb-2">{$t(education.institution)}</h4>
										<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{$t(education.description)}</p>
									</div>
									<div class="flex-shrink-0 ml-4">
										<span class="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md">
											{education.year}
										</span>
									</div>
								</div>
								
								<div class="flex items-center">
									<span class="text-sm font-medium px-3 py-1 rounded-full {
										education.type === 'degree' ? 'bg-blue-50 text-blue-700' :
										education.type === 'certification' ? 'bg-green-50 text-green-700' :
										'bg-yellow-50 text-yellow-700'
									}">
										{education.type === 'degree' ? $t('education.badges.degree') :
										 education.type === 'certification' ? $t('education.badges.certification') :
										 $t('education.badges.achievement')}
									</span>
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Continuous Learning -->
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{$t('education.continuousLearning.title')}</h2>
			
			<div class="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-8 mb-12">
				<div class="text-center mb-8">
					<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-4">{$t('education.continuousLearning.intro.title')}</h3>
					<p class="text-gray-700 dark:text-gray-300 max-w-3xl mx-auto">
						{$t('education.continuousLearning.intro.description')}
					</p>
				</div>
				
				<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
					{#each data.continuousLearning as learning, index}
						<div 
							bind:this={learningRefs[index]}
							class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all transform hover:-translate-y-1 border border-gray-100 dark:border-gray-700 {visibleLearning[index] ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'}"
							style="transition-duration: 800ms; animation-delay: {index * 100}ms"
						>
							<h4 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{$t(learning.area)}</h4>
							<p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{$t(learning.description)}</p>
							
							<div class="space-y-2">
								{#each learning.technologies as tech}
									<span class="inline-block bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-2 py-1 rounded text-xs font-medium mr-1 mb-1">
										{tech}
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		</div>

		<!-- Learning Philosophy -->
		<div class="max-w-4xl mx-auto text-center">
			<div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
				<h3 class="text-2xl font-bold mb-4">{$t('education.philosophy.title')}</h3>
				<p class="text-lg opacity-90 mb-6">
					{$t('education.philosophy.quote')}
				</p>
				<div class="grid md:grid-cols-3 gap-6 mt-8">
					<div class="text-center">
						<div class="text-3xl mb-2">📚</div>
						<h4 class="font-semibold mb-2">{$t('education.philosophy.pillars.learn.title')}</h4>
						<p class="text-sm opacity-80">{$t('education.philosophy.pillars.learn.description')}</p>
					</div>
					<div class="text-center">
						<div class="text-3xl mb-2">🛠️</div>
						<h4 class="font-semibold mb-2">{$t('education.philosophy.pillars.build.title')}</h4>
						<p class="text-sm opacity-80">{$t('education.philosophy.pillars.build.description')}</p>
					</div>
					<div class="text-center">
						<div class="text-3xl mb-2">🤝</div>
						<h4 class="font-semibold mb-2">{$t('education.philosophy.pillars.share.title')}</h4>
						<p class="text-sm opacity-80">{$t('education.philosophy.pillars.share.description')}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
