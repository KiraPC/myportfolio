import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type Theme = 'light' | 'dark';

function createThemeStore() {
	const { subscribe, set, update } = writable<Theme>('dark');

	const applyTheme = (newTheme: Theme) => {
		if (browser) {
			const html = document.documentElement;
			if (newTheme === 'dark') {
				html.classList.add('dark');
			} else {
				html.classList.remove('dark');
			}
			localStorage.setItem('theme', newTheme);
		}
	};

	return {
		subscribe,
		toggle: () => update(currentTheme => {
			const newTheme = currentTheme === 'light' ? 'dark' : 'light';
			applyTheme(newTheme);
			return newTheme;
		}),
		set: (theme: Theme) => {
			applyTheme(theme);
			set(theme);
		},
		init: () => {
			if (browser) {
				const stored = localStorage.getItem('theme') as Theme;
				if (stored) {
					applyTheme(stored);
					return set(stored);
				}

				const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
				const systemTheme = prefersDark ? 'dark' : 'light';
				const defaultTheme = systemTheme || 'dark';
				
				applyTheme(defaultTheme);
				set(defaultTheme);
			}
		}
	};
}

export const theme = createThemeStore();
