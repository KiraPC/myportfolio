<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	
	let { data } = $props();

	let expertiseRefs: HTMLElement[] = [];
	let visibleExpertise = $state<boolean[]>([]);
	let categoryRefs: HTMLElement[] = [];
	let visibleCategories = $state<boolean[]>([]);
	let skillRefs = $state<HTMLElement[][]>([]);
	let visibleSkills = $state<boolean[][]>([]);
	let expandedCategories = $state<boolean[]>([]);

	onMount(() => {
		const observers: IntersectionObserver[] = [];
		
		expertiseRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleExpertise[index]) {
							visibleExpertise[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.1 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		categoryRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleCategories[index]) {
							visibleCategories[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.1 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		skillRefs.forEach((categorySkills, catIndex) => {
			categorySkills.forEach((skillRef, skillIndex) => {
				if (skillRef) {
					const observer = new IntersectionObserver(
						([entry]) => {
							if (entry.isIntersecting && !visibleSkills[catIndex]?.[skillIndex]) {
								if (!visibleSkills[catIndex]) {
									visibleSkills[catIndex] = [];
								}
								visibleSkills[catIndex][skillIndex] = true;
								observer.disconnect();
							}
						},
						{ threshold: 0.1 }
					);
					
					observer.observe(skillRef);
					observers.push(observer);
				}
			});
		});
		
		return () => {
			observers.forEach(observer => observer.disconnect());
		};
	});

	function getSkillColor(level: number): string {
		if (level >= 90) return 'from-green-500 to-emerald-500';
		if (level >= 80) return 'from-blue-500 to-cyan-500';
		if (level >= 70) return 'from-yellow-500 to-orange-500';
		return 'from-gray-500 to-slate-500';
	}

	function getSkillLabel(level: number): string {
		if (level >= 90) return $t('skills.levelLabels.expert');
		if (level >= 80) return $t('skills.levelLabels.advanced');
		if (level >= 70) return $t('skills.levelLabels.intermediate');
		return $t('skills.levelLabels.beginner');
	}

	function toggleCategory(index: number) {
		expandedCategories[index] = !expandedCategories[index];
		
		if (expandedCategories[index]) {
			setTimeout(() => {
				if (!visibleSkills[index]) {
					visibleSkills[index] = [];
				}
				for (let i = 0; i < data.skillCategories[index].skills.length; i++) {
					setTimeout(() => {
						visibleSkills[index][i] = true;
					}, i * 150);
				}
			}, 200);
		}
	}

	visibleExpertise = new Array(data.expertiseAreas.length).fill(false);
	visibleCategories = new Array(data.skillCategories.length).fill(false);
	skillRefs = data.skillCategories.map(() => []);
	visibleSkills = data.skillCategories.map(cat => new Array(cat.skills.length).fill(false));
	expandedCategories = new Array(data.skillCategories.length).fill(false);
</script>

<svelte:head>
	<title>{$t('skills.title')} - Pasquale Carmine Carbone</title>
	<meta name="description" content={$t('skills.metaDescription')} />
</svelte:head>

<div class="pt-20 pb-16">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{$t('skills.header.title')}</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				{$t('skills.header.description')}
			</p>
		</div>

		<!-- Expertise Areas -->
		<div class="mb-20">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Aree di Competenza</h2>
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
				{#each data.expertiseAreas as area, index}
					<div 
						bind:this={expertiseRefs[index]}
						class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-2 border border-gray-100 dark:border-gray-700 {visibleExpertise[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}"
						style="transition-duration: 800ms; animation-delay: {index * 100}ms"
					>
						<div class="text-4xl mb-4">{area.icon}</div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{area.title}</h3>
						<p class="text-gray-600 dark:text-gray-300 text-sm mb-4 leading-relaxed">{area.description}</p>
						<div class="space-y-1">
							{#each area.technologies as tech}
								<span class="inline-block bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium mr-1">
									{tech}
								</span>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Skills by Category -->
		<div class="max-w-6xl mx-auto">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{$t('skills.categories.title')}</h2>
			
			<div class="space-y-12">
				{#each data.skillCategories as category, categoryIndex}
					<div 
						bind:this={categoryRefs[categoryIndex]}
						class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 transform transition-all duration-1000 {visibleCategories[categoryIndex] ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}"
						style="animation-delay: {categoryIndex * 200}ms"
					>
						<!-- Category Header -->
						<div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-b border-gray-100 dark:border-gray-700 {expandedCategories[categoryIndex] ? '' : 'rounded-b-2xl'} hover:from-blue-100 hover:to-purple-100 dark:hover:from-blue-800/40 dark:hover:to-purple-800/40 transition-all duration-300 cursor-pointer">
							<button 
								class="w-full flex items-center justify-between p-6 transition-all duration-300 ease-in-out transform hover:scale-[1.01] {expandedCategories[categoryIndex] ? 'rounded-t-2xl' : 'rounded-2xl'} cursor-pointer"
								onclick={() => toggleCategory(categoryIndex)}
							>
								<div class="flex items-center">
									<span class="text-3xl mr-4 transition-transform duration-300 {expandedCategories[categoryIndex] ? 'scale-110' : 'scale-100'}">{category.icon}</span>
									<div class="text-left">
										<h3 class="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">{$t(category.name)}</h3>
										<p class="text-gray-600 dark:text-gray-300 transition-colors duration-300">{$t(category.description)}</p>
									</div>
								</div>
								<div class="flex items-center ml-4">
									<!-- Skills count badge -->
									<span class="bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium mr-3 transition-all duration-300 {expandedCategories[categoryIndex] ? 'bg-green-100 dark:bg-green-900/50 text-green-800 dark:text-green-300' : ''}">
										{category.skills.length} {$t('skills.competenze')}
									</span>
									<!-- Expand/Collapse icon -->
									<svg 
										class="w-6 h-6 text-gray-500 dark:text-gray-400 transition-all duration-500 ease-in-out transform {expandedCategories[categoryIndex] ? 'rotate-180 text-blue-600 dark:text-blue-400 scale-110' : 'rotate-0 hover:scale-110'}"
										fill="none" 
										stroke="currentColor" 
										viewBox="0 0 24 24"
									>
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
									</svg>
								</div>
							</button>
							
							<!-- Collapsed view - skills list -->
							{#if !expandedCategories[categoryIndex]}
								<div class="mt-4 pt-4 pb-4 border-t border-gray-200 dark:border-gray-600 px-6">
									<div class="flex flex-wrap gap-2">
										{#each category.skills as skill}
											<span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r {getSkillColor(skill.level)} text-white">
												{skill.name}
											</span>
										{/each}
									</div>
								</div>
							{/if}
						</div>
						
						<!-- Skills Grid - Expanded view -->
						<div class="overflow-hidden transition-all duration-500 ease-in-out {expandedCategories[categoryIndex] ? 'max-h-none opacity-100' : 'max-h-0 opacity-0'}">
							<div class="p-6 pb-12 transition-all duration-300 ease-in-out">
								<div class="space-y-6">
									{#each category.skills as skill, skillIndex}
										<div 
											bind:this={skillRefs[categoryIndex][skillIndex]}
											class="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all transform {visibleSkills[categoryIndex]?.[skillIndex] ? 'translate-x-0 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-95'}"
											style="transition-duration: 600ms; animation-delay: {skillIndex * 100}ms"
										>
											<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
												<div class="flex-1">
													<div class="flex items-center mb-2">
														<h4 class="text-lg font-semibold text-gray-900 dark:text-white mr-3">{$t(skill.name)}</h4>
														<span class="px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r {getSkillColor(skill.level)} text-white">
															{getSkillLabel(skill.level)}
														</span>
													</div>
													<p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{$t(skill.description)}</p>
													<p class="text-gray-500 dark:text-gray-400 text-xs">{skill.years} {$t('skills.yearsSuffix')}</p>
												</div>
											</div>
											
											<!-- Progress Bar -->
											<div class="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
												<div 
													class="h-full bg-gradient-to-r {getSkillColor(skill.level)} transition-all duration-2000 ease-out rounded-full"
													style="width: {visibleSkills[categoryIndex]?.[skillIndex] ? skill.level : 0}%"
												></div>
											</div>
											<div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
												<span>{$t('skills.levelLabels.beginner')}</span>
												<span>{$t('skills.levelLabels.expert')}</span>
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Skills Philosophy -->
		<div class="mt-20 max-w-4xl mx-auto text-center">
			<div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
				<h3 class="text-2xl font-bold mb-4">{$t('skills.philosophy.title')}</h3>
				<p class="text-lg opacity-90 mb-8">
					{$t('skills.philosophy.quote')}
				</p>
				
				<div class="grid md:grid-cols-3 gap-6">
					<div class="text-center">
						<div class="text-3xl mb-3">🎯</div>
						<h4 class="font-semibold mb-2">{$t('skills.philosophy.principles.results.title')}</h4>
						<p class="text-sm opacity-80">{$t('skills.philosophy.principles.results.description')}</p>
					</div>
					<div class="text-center">
						<div class="text-3xl mb-3">🔄</div>
						<h4 class="font-semibold mb-2">{$t('skills.philosophy.principles.improvement.title')}</h4>
						<p class="text-sm opacity-80">{$t('skills.philosophy.principles.improvement.description')}</p>
					</div>
					<div class="text-center">
						<div class="text-3xl mb-3">🤝</div>
						<h4 class="font-semibold mb-2">{$t('skills.philosophy.principles.collaboration.title')}</h4>
						<p class="text-sm opacity-80">{$t('skills.philosophy.principles.collaboration.description')}</p>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
