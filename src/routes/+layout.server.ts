import { loadTranslations, translations, defaultLocale } from '$lib/translations';

export const load = async ({ url, cookies }) => {
    const { pathname, searchParams } = url;

    const initLocale = searchParams.get('lang') || cookies.get('locale') || defaultLocale;

    cookies.set('locale', initLocale, {
        path: '/',
    });

    await loadTranslations(initLocale, pathname);

    return {
        i18n: { locale: initLocale, route: pathname },
        translations: translations.get()
    };
};
