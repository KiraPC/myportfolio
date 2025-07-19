export interface ContactInfo {
    icon: string;
    title: string;
    value: string;
    action: string;
}

export interface Availability {
    type: string;
    description: string;
    icon: string;
}

export const load = async () => {
    const contactInfo: ContactInfo[] = [
        {
            icon: '📧',
            title: 'contact.info.email.title',
            value: 'contact.info.email.value',
            action: 'mailto:me@pcarbone.it'
        },
        {
            icon: '💼',
            title: 'contact.info.linkedin.title',
            value: 'contact.info.linkedin.value',
            action: 'https://linkedin.com/in/pasquale-carmine-carbone'
        },
        {
            icon: '🐙',
            title: 'contact.info.github.title',
            value: 'contact.info.github.value',
            action: 'https://github.com/KiraPC'
        },
        {
            icon: '📍',
            title: 'contact.info.location.title',
            value: 'contact.info.location.value',
            action: ''
        }
    ];

    return {
        contactInfo
    };
};
