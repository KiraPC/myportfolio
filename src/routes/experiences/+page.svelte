<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
    import { t } from '$lib/translations';
	
	let { data }: { data: PageData } = $props();
	let { experiences } = data;


	let experienceRefs: HTMLElement[] = [];
	let visibleExperiences = $state<boolean[]>([]);
	let projectRefs = $state<HTMLElement[][]>([]);
	let visibleProjects = $state<boolean[][]>([]);
	let imageLoadErrors = $state<boolean[]>([]);

	onMount(() => {
		const observers: IntersectionObserver[] = [];
		
		experienceRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleExperiences[index]) {
							visibleExperiences[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.01 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		projectRefs.forEach((experienceProjects, expIndex) => {
			experienceProjects.forEach((projectRef, projIndex) => {
				if (projectRef) {
					const observer = new IntersectionObserver(
						([entry]) => {
							if (entry.isIntersecting && !visibleProjects[expIndex]?.[projIndex]) {
								if (!visibleProjects[expIndex]) {
									visibleProjects[expIndex] = [];
								}
								visibleProjects[expIndex][projIndex] = true;
								observer.disconnect();
							}
						},
						{ threshold: 0.1 }
					);
					
					observer.observe(projectRef);
					observers.push(observer);
				}
			});
		});
		
		return () => {
			observers.forEach(observer => observer.disconnect());
		};
	});

	visibleExperiences = new Array(experiences.length).fill(false);
	projectRefs = experiences.map(() => []);
	visibleProjects = experiences.map(exp => new Array(exp.projects.length).fill(false));
	imageLoadErrors = new Array(experiences.length).fill(false);
</script>

<svelte:head>
	<title>{$t('experiences.title')} - Pasquale Carmine Carbone</title>
	<meta name="description" content={$t('experiences.metaDescription')} />
</svelte:head>

<div class="pt-20 pb-16">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{$t('experiences.title')}</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				{$t('experiences.subtitle')}
			</p>
		</div>

		<!-- Timeline -->
		<div class="max-w-6xl mx-auto">
			{#each experiences as experience, index}
				<div 
					bind:this={experienceRefs[index]} 
					class="relative transform transition-all duration-1000 {visibleExperiences[index] ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}"
					style="animation-delay: {index * 200}ms"
				>
					<!-- Timeline line -->
					{#if index < experiences.length - 1}
						<div class="absolute left-8 top-24 w-0.5 h-full bg-gradient-to-b from-blue-400 to-purple-400 hidden md:block"></div>
					{/if}
					
					<!-- Experience card -->
					<div class="mb-16 md:flex md:items-start">
						<!-- Timeline marker -->
						<div class="hidden md:flex md:flex-col md:items-center md:mr-8">
							<div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white shadow-lg mb-4 overflow-hidden">
								{#if experience.icon && !imageLoadErrors[index]}
									<img 
										src={experience.icon} 
										alt="{experience.company} logo"
										class="w-full h-full object-cover rounded-full"
										onerror={() => imageLoadErrors[index] = true}
									/>
								{:else}
									<span class="text-lg font-bold">
										{experience.company.split(' ').map(word => word[0]).join('')}
									</span>
								{/if}
							</div>
							{#if experience.type === 'side'}
								<span class="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
									{$t('experiences.sideProject')}
								</span>
							{/if}
						</div>
						
						<!-- Content -->
						<div class="flex-1 bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700">
							<!-- Header -->
							<div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 border-b border-gray-100 dark:border-gray-700">
								<div class="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
									<div>
										<h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">{experience.company}</h3>
										<h4 class="text-xl text-blue-600 dark:text-blue-400 font-semibold">{$t(experience.role)}</h4>
									</div>
									<div class="mt-4 md:mt-0">
										<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-4 py-2 rounded-full font-medium">
											{$t(experience.period)}
										</span>
									</div>
								</div>
								<p class="text-gray-700 dark:text-gray-300 leading-relaxed">{$t(experience.description)}</p>
							</div>
							
							<!-- Projects -->
							<div class="p-6">
								<h5 class="text-lg font-semibold text-gray-900 dark:text-white mb-6">{$t('experiences.mainProjects')}</h5>
								<div class="space-y-6">
									{#each experience.projects as project, projectIndex}
										<div 
											bind:this={projectRefs[index][projectIndex]}
											class="border border-gray-200 dark:border-gray-600 rounded-xl p-6 hover:border-green-600 transition-all transform {visibleProjects[index]?.[projectIndex] ? 'translate-x-0 opacity-100' : 'translate-x-12 opacity-0'}"
											style="transition-duration: 800ms;"
										>
											<h6 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{$t(project.name)}</h6>
											<p class="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">{$t(project.description)}</p>
											
											{#if project.impact}
												<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-4">
													<div class="flex items-start">
														<svg class="w-5 h-5 text-green-500 dark:text-green-400 mt-1 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
															<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
														</svg>
														<div>
															<h7 class="font-medium text-green-900 dark:text-green-200 mb-1">{$t('experiences.impact')}</h7>
															<p class="text-green-800 dark:text-green-300 text-sm">{$t(project.impact)}</p>
														</div>
													</div>
												</div>
											{/if}
											
											<div class="flex flex-wrap gap-2">
												{#each project.technologies as tech}
													<span class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 dark:hover:bg-blue-900 hover:text-blue-800 dark:hover:text-blue-200 transition-colors">
														{tech}
													</span>
												{/each}
											</div>
										</div>
									{/each}
								</div>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>
	</div>
</div>
