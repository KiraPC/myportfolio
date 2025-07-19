import type { Parser } from 'sveltekit-i18n';
import I18n from 'sveltekit-i18n';
import lang from './lang.json';

export const defaultLocale = 'it';

const config = ({
    translations: {
        en: { lang },
        it: { lang },
    },
    loaders: [
        {
            locale: 'it',
            key: 'common',
            loader: async () => (
                await import('./it/common.json')
            ).default
        },
        {
            locale: 'it',
            key: 'home',
            routes: ['/'],
            loader: async () => (
                await import('./it/home.json')
            ).default
        },
        {
            locale: 'en',
            key: 'common',
            loader: async () => (
                await import('./en/common.json')
            ).default
        },
        {
            locale: 'en',
            key: 'home',
            routes: ['/'],
            loader: async () => (
                await import('./en/home.json')
            ).default
        },
        {
            locale: 'it',
            key: 'experiences',
            routes: ['/experiences'],
            loader: async () => (
                await import('./it/experiences.json')
            ).default
        },
        {
            locale: 'en',
            key: 'experiences',
            routes: ['/experiences'],
            loader: async () => (
                await import('./en/experiences.json')
            ).default
        },
        {
            locale: 'it',
            key: 'education',
            routes: ['/education'],
            loader: async () => (
                await import('./it/education.json')
            ).default
        },
        {
            locale: 'en',
            key: 'education',
            routes: ['/education'],
            loader: async () => (
                await import('./en/education.json')
            ).default
        },
        {
            locale: 'it',
            key: 'skills',
            routes: ['/skills'],
            loader: async () => (
                await import('./it/skills.json')
            ).default
        },
        {
            locale: 'en',
            key: 'skills',
            routes: ['/skills'],
            loader: async () => (
                await import('./en/skills.json')
            ).default
        },
        {
            locale: 'it',
            key: 'interests',
            routes: ['/interests'],
            loader: async () => (
                await import('./it/interests.json')
            ).default
        },
        {
            locale: 'en',
            key: 'interests',
            routes: ['/interests'],
            loader: async () => (
                await import('./en/interests.json')
            ).default
        },
        {
            locale: 'it',
            key: 'contact',
            routes: ['/contact'],
            loader: async () => (
                await import('./it/contact.json')
            ).default
        },
        {
            locale: 'en',
            key: 'contact',
            routes: ['/contact'],
            loader: async () => (
                await import('./en/contact.json')
            ).default
        }
    ]
});

export const { t, locale, locales, loading, loadTranslations, translations, addTranslations, setLocale, setRoute } = new I18n<Parser.Params<{}>>(config);
