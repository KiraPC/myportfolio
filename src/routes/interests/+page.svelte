<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from '$lib/translations';
	import type { Interest, Project, PersonalValue } from './+page.server.js';
	
	type Props = {
		data: {
			interests: Interest[];
			personalValues: PersonalValue[];
		};
	};
	
	let { data }: Props = $props();

	let interestRefs: HTMLElement[] = [];
	let visibleInterests = $state<boolean[]>([]);
	let valueRefs: HTMLElement[] = [];
	let visibleValues = $state<boolean[]>([]);
	let projectRefs = $state<HTMLElement[][]>([]);
	let visibleProjects = $state<boolean[][]>([]);

	onMount(() => {
		const observers: IntersectionObserver[] = [];
		
		interestRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleInterests[index]) {
							visibleInterests[index] = true;
							observer.disconnect();
						}
					},
					{ threshold: 0.1 }
				);
				
				observer.observe(ref);
				observers.push(observer);
			}
		});

		projectRefs.forEach((projectRefArray, interestIndex) => {
			projectRefArray.forEach((ref, projectIndex) => {
				if (ref) {
					const observer = new IntersectionObserver(
						([entry]) => {
							if (entry.isIntersecting && !visibleProjects[interestIndex][projectIndex]) {
								visibleProjects[interestIndex][projectIndex] = true;
								observer.disconnect();
							}
						},
						{ threshold: 0.1 }
					);
					
					observer.observe(ref);
					observers.push(observer);
				}
			});
		});

		valueRefs.forEach((ref, index) => {
			if (ref) {
				const observer = new IntersectionObserver(
					([entry]) => {
						if (entry.isIntersecting && !visibleValues[index]) {
							visibleValues[index] = true;
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

	visibleInterests = new Array(data.interests.length).fill(false);
	visibleValues = new Array(data.personalValues.length).fill(false);
	projectRefs = data.interests.map(interest => interest.projects ? new Array(interest.projects.length) : []);
	visibleProjects = data.interests.map(interest => interest.projects ? new Array(interest.projects.length).fill(false) : []);
</script>

<svelte:head>
	<title>{$t('interests.title')} - Pasquale Carmine Carbone</title>
	<meta name="description" content={$t('interests.metaDescription')} />
</svelte:head>

<div class="pt-20 pb-16">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{$t('interests.header.title')}</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				{$t('interests.header.description')}
			</p>
		</div>

		<!-- Interests Grid -->
		<div class="max-w-6xl mx-auto mb-20">
			<div class="grid lg:grid-cols-2 gap-8">
				{#each data.interests as interest, index}
					<div 
						bind:this={interestRefs[index]}
						class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-700 ease-out overflow-hidden border border-gray-100 dark:border-gray-700 transform {visibleInterests[index] 
							? 'translate-x-0 opacity-100' 
							: 'translate-x-8 opacity-0'}"
						style="animation-delay: {index * 100}ms"
					>
						<!-- Header -->
						<div class="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 border-b border-gray-100 dark:border-gray-700">
							<div class="flex items-center mb-3">
								<span class="text-3xl mr-4">{interest.icon}</span>
								<h3 class="text-xl font-bold text-gray-900 dark:text-white">{$t(interest.title)}</h3>
							</div>
							<p class="text-gray-600 dark:text-gray-300 leading-relaxed">{$t(interest.description)}</p>
						</div>
						
						<!-- Content -->
						<div class="p-6">
							<!-- Details -->
							<div class="mb-6">
								<h4 class="font-semibold text-gray-900 dark:text-white mb-3">Cosa faccio:</h4>
								<ul class="space-y-2">
									{#each interest.details as detail}
										<li class="flex items-start">
											<svg class="w-5 h-5 text-blue-500 dark:text-blue-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
												<path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
											</svg>
											<span class="text-gray-700 dark:text-gray-300 text-sm">{$t(detail)}</span>
										</li>
									{/each}
								</ul>
							</div>
							
							<!-- Projects -->
							{#if interest.projects && interest.projects.length > 0}
								<div>
									<h4 class="font-semibold text-gray-900 dark:text-white mb-4">{$t('interests.mainProjects')}:</h4>
									<div class="space-y-4">
										{#each interest.projects as project, projectIndex}
											<div 
												bind:this={projectRefs[index][projectIndex]}
												class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 hover:bg-gray-100 dark:hover:bg-gray-700 transition-all duration-700 ease-out transform {visibleProjects[index] && visibleProjects[index][projectIndex] 
												? 'translate-x-0 opacity-100' 
												: 'translate-x-8 opacity-0'}">
												<div class="flex items-start justify-between mb-2">
													<h5 class="font-semibold text-gray-900 dark:text-white">{$t(project.name)}</h5>
													{#if project.link}
														<a 
															href={project.link} 
															target="_blank" 
															rel="noopener noreferrer"
															class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
															aria-label="{$t('interests.openProject')} {$t(project.name)} {$t('interests.inNewTab')}"
														>
															<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
																<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
															</svg>
														</a>
													{/if}
												</div>
												<p class="text-gray-600 dark:text-gray-300 text-sm mb-3">{$t(project.description)}</p>
												
												<!-- Impact -->
												<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 mb-3">
													<div class="flex items-start">
														<svg class="w-4 h-4 text-green-500 dark:text-green-400 mt-0.5 mr-2" fill="currentColor" viewBox="0 0 20 20">
															<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
														</svg>
														<p class="text-green-800 dark:text-green-300 text-sm font-medium">{$t(project.impact)}</p>
													</div>
												</div>
												
												<!-- Technologies -->
												<div class="flex flex-wrap gap-1">
													{#each project.technologies as tech}
														<span class="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded text-xs font-medium">
															{tech}
														</span>
													{/each}
												</div>
											</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>

		<!-- Personal Values -->
		<div class="max-w-4xl mx-auto mb-16">
			<h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">{$t('interests.values.title')}</h2>
			
			<div class="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
				{#each data.personalValues as value, index}
					<div 
						bind:this={valueRefs[index]}
						class="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-700 ease-out transform hover:-translate-y-2 text-center border border-gray-100 dark:border-gray-700 {visibleValues[index] 
							? 'translate-y-0 opacity-100' 
							: 'translate-y-8 opacity-0'}"
						style="animation-delay: {index * 150}ms"
					>
						<div class="text-4xl mb-4">{value.icon}</div>
						<h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-3">{$t(value.title)}</h3>
						<p class="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">{$t(value.description)}</p>
					</div>
				{/each}
			</div>
		</div>

		<!-- Philosophy Section -->
		<div class="max-w-4xl mx-auto text-center">
			<div class="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
				<p class="text-lg opacity-95 italic mb-4">
					"{$t('interests.quote.text')}"
				</p>
				<p class="text-sm opacity-80">
					— {$t('interests.quote.author')}
				</p>
			</div>
		</div>
	</div>
</div>
