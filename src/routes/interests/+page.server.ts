export interface Interest {
    title: string;
    description: string;
    icon: string;
    projects?: Project[];
    details: string[];
}

export interface Project {
    name: string;
    description: string;
    technologies: string[];
    link?: string;
    impact: string;
}

export interface PersonalValue {
    title: string;
    description: string;
    icon: string;
    examples: string[];
}

export const load = async () => {
    const interests: Interest[] = [
        {
            title: 'interests.openSource.title',
            description: 'interests.openSource.description',
            icon: '🌐',
            details: [
                'interests.openSource.details.0',
                'interests.openSource.details.1',
                'interests.openSource.details.2',
                'interests.openSource.details.3'
            ],
            projects: [
                {
                    name: 'interests.openSource.projects.vitePluginSveltekitDecorators.name',
                    description: 'interests.openSource.projects.vitePluginSveltekitDecorators.description',
                    technologies: [
                        'TypeScript',
                        'Vite',
                        'SvelteKit',
                        'Node.js',
                        'Vitest'
                    ],
                    link: 'https://github.com/KiraPC/vite-plugin-sveltekit-decorators',
                    impact: 'interests.openSource.projects.vitePluginSveltekitDecorators.impact'
                },
                {
                    name: 'interests.openSource.projects.fastapiController.name',
                    description: 'interests.openSource.projects.fastapiController.description',
                    technologies: ['Python', 'FastAPI', 'Pydantic', 'Poetry'],
                    link: 'https://github.com/KiraPC/fastapi-router-controller',
                    impact: 'interests.openSource.projects.fastapiController.impact'
                },
            ]
        },
        {
            title: 'interests.smartHome.title',
            description: 'interests.smartHome.description',
            icon: '🏠',
            details: [
                'interests.smartHome.details.0',
                'interests.smartHome.details.1',
                'interests.smartHome.details.2',
                'interests.smartHome.details.3'
            ],
            projects: [
                {
                    name: 'interests.smartHome.projects.switchbotRemote.name',
                    description: 'interests.smartHome.projects.switchbotRemote.description',
                    technologies: ['Python', 'HomeAssistant', 'AsyncIO', 'BLE'],
                    link: 'https://github.com/KiraPC/ha-switchbot-remote',
                    impact: 'interests.smartHome.projects.switchbotRemote.impact'
                },
                {
                    name: 'interests.smartHome.projects.lgTvControl.name',
                    description: 'interests.smartHome.projects.lgTvControl.description',
                    technologies: ['Node.js', 'Express', 'WebSocket', 'Google Assistant SDK'],
                    link: '',
                    impact: 'interests.smartHome.projects.lgTvControl.impact'
                }
            ]
        },
        {
            title: 'interests.innovation.title',
            description: 'interests.innovation.description',
            icon: '🚀',
            details: [
                'interests.innovation.details.0',
                'interests.innovation.details.1',
                'interests.innovation.details.2',
                'interests.innovation.details.3'
            ]
        },
        {
            title: 'interests.continuousLearning.title',
            description: 'interests.continuousLearning.description',
            icon: '📚',
            details: [
                'interests.continuousLearning.details.0',
                'interests.continuousLearning.details.1',
                'interests.continuousLearning.details.2',
            ]
        },
        {
            title: 'interests.automation.title',
            description: 'interests.automation.description',
            icon: '⚡',
            details: [
                'interests.automation.details.0',
                'interests.automation.details.1',
                'interests.automation.details.2',
                'interests.automation.details.3'
            ]
        },
        {
            title: 'interests.travel.title',
            description: 'interests.travel.description',
            icon: '✈️',
            details: [
                'interests.travel.details.0',
                'interests.travel.details.1',
                'interests.travel.details.2',
                'interests.travel.details.3'
            ]
        }
    ];

    const personalValues: PersonalValue[] = [
        {
            title: 'interests.values.curiosity.title',
            description: 'interests.values.curiosity.description',
            icon: '🔍',
            examples: []
        },
        {
            title: 'interests.values.sharing.title',
            description: 'interests.values.sharing.description',
            icon: '🤝',
            examples: []
        },
        {
            title: 'interests.values.quality.title',
            description: 'interests.values.quality.description',
            icon: '💎',
            examples: []
        },
        {
            title: 'interests.values.impact.title',
            description: 'interests.values.impact.description',
            icon: '🎯',
            examples: []
        }
    ];

    return {
        interests,
        personalValues
    };
};
