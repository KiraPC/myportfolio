import { writable } from 'svelte/store';
import { browser } from '$app/environment';

const STORAGE_KEY = 'preferred-language';

async function getLanguageByLocation(): Promise<string> {
    if (!browser) return 'it';
    
    try {
        const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        
        if (timezone === 'Europe/Rome' || timezone.includes('Italy')) {
            return 'it';
        }

        const browserLang = navigator.language;
        
        if (browserLang.startsWith('it')) {
            return 'it';
        }
        
        return 'en';
    } catch (error) {
        console.warn('Error detecting location/language:', error);
        const browserLang = navigator.language.split('-')[0];
        return browserLang === 'it' ? 'it' : 'en';
    }
}

async function getPreferredLanguage(): Promise<string> {
    if (!browser) return 'en';

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && (saved === 'it' || saved === 'en')) {
        return saved;
    }

    return await getLanguageByLocation();
}

function savePreferredLanguage(lang: string) {
    if (!browser) return;
    localStorage.setItem(STORAGE_KEY, lang);
}

function createLanguageStore() {
    const { subscribe, set, update } = writable('en');
    
    return {
        subscribe,
        set: (lang: string) => {
            savePreferredLanguage(lang);
            set(lang);
        },
        update,
        init: async () => {
            if (browser) {
                const preferredLang = await getPreferredLanguage();
                set(preferredLang);
            }
        }
    };
}

export const languageStore = createLanguageStore();
