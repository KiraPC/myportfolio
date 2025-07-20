<script lang="ts">
	import { onMount } from 'svelte';
	import { enhance } from '$app/forms';
	import { t } from '$lib/translations';
	import { analytics } from '$lib/analytics';
	import type { PageData, ActionData } from './$types.js';
	
	let { data, form }: { data: PageData; form: ActionData } = $props();
	
	let isSubmitting = $state(false);
	let formErrors = $state<Record<string, string> | null>(null);
	let formSuccess = $state(false);

	// Animation variables
	let contactFormRef: HTMLElement;
	let contactInfoRef: HTMLElement;
	let quickActionsRef: HTMLElement;
	let visibleContactForm = $state(false);
	let visibleContactInfo = $state(false);
	let visibleQuickActions = $state(false);

	function trackContactLink(action: string) {
		if (action.includes('mailto:')) {
			analytics.externalLink('email', 'contact_info');
		} else if (action.includes('linkedin.com')) {
			analytics.externalLink('linkedin', 'contact_info');
		} else if (action.includes('github.com')) {
			analytics.externalLink('github', 'contact_info');
		}
	}

	onMount(() => {
		const observers: IntersectionObserver[] = [];

		if (contactFormRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting && !visibleContactForm) {
						visibleContactForm = true;
						observer.disconnect();
					}
				},
				{ threshold: 0.1 }
			);
			
			observer.observe(contactFormRef);
			observers.push(observer);
		}

		if (contactInfoRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting && !visibleContactInfo) {
						visibleContactInfo = true;
						observer.disconnect();
					}
				},
				{ threshold: 0.1 }
			);
			
			observer.observe(contactInfoRef);
			observers.push(observer);
		}

		if (quickActionsRef) {
			const observer = new IntersectionObserver(
				([entry]) => {
					if (entry.isIntersecting && !visibleQuickActions) {
						visibleQuickActions = true;
						observer.disconnect();
					}
				},
				{ threshold: 0.1 }
			);
			
			observer.observe(quickActionsRef);
			observers.push(observer);
		}
		
		return () => {
			observers.forEach(observer => observer.disconnect());
		};
	});
</script>

<svelte:head>
	<title>{$t('contact.title')} - Pasquale Carmine Carbone</title>
	<meta name="description" content={$t('contact.metaDescription')} />
</svelte:head>

<div class="pt-20 pb-16">
	<div class="container mx-auto px-6">
		<!-- Header -->
		<div class="text-center mb-16">
			<h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">{$t('contact.header.title')}</h1>
			<p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
				{$t('contact.header.description')}
			</p>
		</div>

		<div class="max-w-6xl mx-auto">
			<div class="grid lg:grid-cols-2 gap-12">
				<!-- Contact Form -->
				<div 
					bind:this={contactFormRef}
					class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 order-2 lg:order-1 transition-all duration-700 ease-out transform {visibleContactForm 
						? 'translate-x-0 opacity-100' 
						: 'translate-x-8 opacity-0'}"
				>
					<h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">{$t('contact.form.title')}</h2>
					
					{#if formSuccess}
						<div class="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
							<div class="flex items-center">
								<svg class="w-5 h-5 text-green-500 dark:text-green-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
								</svg>
								<span class="text-green-700 dark:text-green-300 font-medium">{$t('contact.form.successMessage')}</span>
							</div>
						</div>
					{:else if formErrors && Object.keys(formErrors).length > 0}
						<div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
							<div class="flex items-center">
								<svg class="w-5 h-5 text-red-500 dark:text-red-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
									<path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
								</svg>
								<span class="text-red-700 dark:text-red-300 font-medium">
									{#if formErrors.general}
										{$t(formErrors.general)}
									{:else}
										{$t('contact.form.errorMessage')}
									{/if}
								</span>
							</div>
						</div>
					{/if}
					
					<form 
						method="POST" 
						action="?/contact"
						use:enhance={() => {
							isSubmitting = true;
							formErrors = null;
							formSuccess = false;
							analytics.contactForm('form');
							
							return async ({ result }) => {
								isSubmitting = false;
								
								if (result.type === 'failure') {
									formErrors = (result.data?.errors as Record<string, string>) || null;
								} else {
									formSuccess = true;
								}
							};
						}}
					>
						
						<div class="mb-6">
							<label for="name" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{$t('contact.form.name.label')} *
							</label>
							<input
								type="text"
								id="name"
								name="name"
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white {formErrors?.name ? 'border-red-500' : ''}"
								placeholder={$t('contact.form.name.placeholder')}
								required
							/>
							{#if formErrors?.name}
								<p class="text-red-600 dark:text-red-400 text-sm mt-1">{$t(formErrors.name)}</p>
							{/if}
						</div>
						
						
						<div class="mb-6">
							<label for="email" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{$t('contact.form.email.label')} *
							</label>
							<input
								type="email"
								id="email"
								name="email"
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white {formErrors?.email ? 'border-red-500' : ''}"
								placeholder={$t('contact.form.email.placeholder')}
								required
							/>
							{#if formErrors?.email}
								<p class="text-red-600 dark:text-red-400 text-sm mt-1">{$t(formErrors.email)}</p>
							{/if}
						</div>
						
						
						<div class="mb-6">
							<label for="subject" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{$t('contact.form.subject.label')} *
							</label>
							<input
								type="text"
								id="subject"
								name="subject"
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-white {formErrors?.subject ? 'border-red-500' : ''}"
								placeholder={$t('contact.form.subject.placeholder')}
								required
							/>
							{#if formErrors?.subject}
								<p class="text-red-600 dark:text-red-400 text-sm mt-1">{$t(formErrors.subject)}</p>
							{/if}
						</div>
					
						<div class="mb-6">
							<label for="message" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
								{$t('contact.form.message.label')} *
							</label>
							<textarea
								id="message"
								name="message"
								rows="6"
								class="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none bg-white dark:bg-gray-800 text-gray-900 dark:text-white {formErrors?.message ? 'border-red-500' : ''}"
								placeholder={$t('contact.form.message.placeholder')}
								required
							></textarea>
							{#if formErrors?.message}
								<p class="text-red-600 dark:text-red-400 text-sm mt-1">{$t(formErrors.message)}</p>
							{/if}
						</div>
						
						
						<button
							type="submit"
							disabled={isSubmitting}
							class="w-full bg-blue-600 dark:bg-blue-500 text-white py-4 px-6 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
						>
							{#if isSubmitting}
								<svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
									<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
									<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
								</svg>
								{$t('contact.form.submitting')}
							{:else}
								{$t('contact.form.submit')}
							{/if}
						</button>
					</form>
				</div>
				
				<!-- Contact Info -->
				<div class="space-y-8 order-1 lg:order-2">
					<div 
						bind:this={contactInfoRef}
						class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all duration-700 ease-out transform {visibleContactInfo 
							? 'translate-y-0 opacity-100' 
							: 'translate-y-8 opacity-0'}"
					>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{$t('contact.info.title')}</h3>
						<div class="space-y-4">
							{#each data.contactInfo as contact}
								<div class="flex items-center">
									<span class="text-2xl mr-4">{contact.icon}</span>
									<div class="flex-1">
										<h4 class="font-medium text-gray-900 dark:text-white">{$t(contact.title)}</h4>
										{#if contact.action}
											<a 
												href={contact.action} 
												target="_blank" 
												rel="noopener noreferrer"
												onclick={() => contact.action && trackContactLink(contact.action)}
												class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors text-sm"
											>
												{$t(contact.value)}
											</a>
										{:else}
											<p class="text-gray-600 dark:text-gray-300 text-sm">{$t(contact.value)}</p>
										{/if}
									</div>
								</div>
							{/each}
						</div>
					</div>
					
					<!-- Quick Actions -->
					<div 
						bind:this={quickActionsRef}
						class="bg-white dark:bg-gray-900 rounded-2xl shadow-lg p-8 border border-gray-100 dark:border-gray-700 transition-all duration-700 ease-out transform {visibleQuickActions 
							? 'translate-x-0 opacity-100' 
							: 'translate-x-8 opacity-0'}"
					>
						<h3 class="text-xl font-bold text-gray-900 dark:text-white mb-6">{$t('contact.quickActions.title')}</h3>
						<div class="space-y-3">
							<a 
								href="/cv.pdf" 
								target="_blank"
								onclick={() => analytics.downloadCV()}
								class="flex items-center justify-between w-full p-4 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
							>
								<div class="flex items-center">
									<svg class="w-5 h-5 text-blue-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
									</svg>
									<span class="font-medium text-gray-900 dark:text-white">{$t('contact.quickActions.downloadCV')}</span>
								</div>
								<svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
								</svg>
							</a>
							
							<a 
								href="https://linkedin.com/in/pasquale-carmine-carbone" 
								target="_blank"
								rel="noopener noreferrer"
								onclick={() => analytics.externalLink('linkedin', 'quick_actions')}
								class="flex items-center justify-between w-full p-4 bg-blue-50 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-gray-700 rounded-lg transition-colors group"
							>
								<div class="flex items-center">
									<svg class="w-5 h-5 text-blue-600 mr-3" fill="currentColor" viewBox="0 0 24 24">
										<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
									</svg>
									<span class="font-medium text-gray-900 dark:text-white">{$t('contact.quickActions.connectLinkedIn')}</span>
								</div>
								<svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
								</svg>
							</a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>