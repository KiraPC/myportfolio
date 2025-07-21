import { track } from '@vercel/analytics';
import { dev } from '$app/environment';

// Umami tracking function
declare global {
    interface Window {
        umami?: {
            track: (event: string, properties?: Record<string, any>) => void;
        };
    }
}

/**
 * Track events with both Vercel Analytics and Umami
 * Only tracks in production environment
 */
export function trackEvent(name: string, properties?: Record<string, any>) {
    if (!dev) {
        // Vercel Analytics
        track(name, properties);
        
        // Umami Analytics
        if (typeof window !== 'undefined' && window.umami) {
            window.umami.track(name, properties);
        }
    }
}

/**
 * Umami-specific tracking functions
 */
export const umami = {
    track: (event: string, properties?: Record<string, any>) => {
        if (!dev && typeof window !== 'undefined' && window.umami) {
            window.umami.track(event, properties);
        }
    }
};

/**
 * Portfolio-specific event tracking functions
 */
export const analytics = {
    // Track CV download
    downloadCV: () => {
        trackEvent('CV Downloaded', {
            source: 'portfolio_website'
        });
    },

    // Track contact form submission
    contactForm: (method: 'email' | 'form') => {
        trackEvent('Contact Initiated', {
            method,
            source: 'contact_page'
        });
    },

    // Track external link clicks
    externalLink: (platform: 'linkedin' | 'github' | 'email', section: string) => {
        trackEvent('External Link Clicked', {
            platform,
            section,
            destination: `${platform}_profile`
        });
    },

    // Track language changes
    languageChange: (from: string, to: string) => {
        trackEvent('Language Changed', {
            from_language: from,
            to_language: to
        });
    },

    // Track page section engagement
    sectionView: (section: 'hero' | 'skills' | 'highlights' | 'cta') => {
        trackEvent('Section Viewed', {
            section,
            page: 'home'
        });
    }
};
