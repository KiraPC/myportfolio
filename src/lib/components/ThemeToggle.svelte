<script lang="ts">
	import { theme } from '$lib/stores/theme';
	
	function toggleTheme() {
		theme.toggle();
	}
</script>

<button
	onclick={toggleTheme}
	class="relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
	aria-label="Cambia tema"
	title="Cambia tema"
>
	<!-- Sun Icon (visible in dark mode) -->
	<svg 
		class="w-5 h-5 text-yellow-500 transition-all duration-300 {$theme === 'dark' ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'} absolute inset-2" 
		fill="currentColor" 
		viewBox="0 0 20 20"
	>
		<path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
	</svg>
	
	<!-- Moon Icon (visible in light mode) -->
	<svg 
		class="w-5 h-5 text-blue-600 dark:text-blue-400 transition-all duration-300 {$theme === 'light' ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-0 opacity-0'} absolute inset-2" 
		fill="currentColor" 
		viewBox="0 0 20 20"
	>
		<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
	</svg>
	
	<!-- Placeholder for consistent sizing -->
	<div class="w-5 h-5 opacity-0"></div>
</button>
