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
            title: 'interests.upstream.title',
            description: 'interests.upstream.description',
            icon: '🔀',
            details: [
                'interests.upstream.details.0',
                'interests.upstream.details.1',
                'interests.upstream.details.2',
                'interests.upstream.details.3'
            ],
            projects: [
                {
                    name: 'interests.upstream.projects.mastra.name',
                    description: 'interests.upstream.projects.mastra.description',
                    technologies: ['TypeScript', 'AI Agents', 'AWS Bedrock', 'S3'],
                    link: 'https://github.com/mastra-ai/mastra/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.mastra.impact'
                },
                {
                    name: 'interests.upstream.projects.vercelAi.name',
                    description: 'interests.upstream.projects.vercelAi.description',
                    technologies: ['TypeScript', 'AI SDK', 'Amazon Bedrock', 'LLM'],
                    link: 'https://github.com/vercel/ai/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.vercelAi.impact'
                },
                {
                    name: 'interests.upstream.projects.sveltekit.name',
                    description: 'interests.upstream.projects.sveltekit.description',
                    technologies: ['TypeScript', 'SvelteKit', 'adapter-node'],
                    link: 'https://github.com/sveltejs/kit/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.sveltekit.impact'
                },
                {
                    name: 'interests.upstream.projects.homeAssistant.name',
                    description: 'interests.upstream.projects.homeAssistant.description',
                    technologies: ['Python', 'OAuth', 'Home Assistant', 'AsyncIO'],
                    link: 'https://github.com/fronzbot/blinkpy/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.homeAssistant.impact'
                },
                {
                    name: 'interests.upstream.projects.undici.name',
                    description: 'interests.upstream.projects.undici.description',
                    technologies: ['Node.js', 'HTTP', 'TLS'],
                    link: 'https://github.com/nodejs/undici/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.undici.impact'
                },
                {
                    name: 'interests.upstream.projects.fastify.name',
                    description: 'interests.upstream.projects.fastify.description',
                    technologies: ['Node.js', 'TypeScript', 'JSON Schema', 'OpenAPI'],
                    link: 'https://github.com/fastify/fastify/pulls?q=is%3Apr+author%3AKiraPC',
                    impact: 'interests.upstream.projects.fastify.impact'
                }
            ]
        },
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
                {
                    name: 'interests.openSource.projects.fastapiMvcBoilerplate.name',
                    description: 'interests.openSource.projects.fastapiMvcBoilerplate.description',
                    technologies: ['Python', 'FastAPI', 'MVC', 'Docker'],
                    link: 'https://github.com/KiraPC/fastapi-mvc-boilerplate',
                    impact: 'interests.openSource.projects.fastapiMvcBoilerplate.impact'
                },
                {
                    name: 'interests.openSource.projects.vscodeMastraTraceViewer.name',
                    description: 'interests.openSource.projects.vscodeMastraTraceViewer.description',
                    technologies: ['TypeScript', 'VS Code API', 'Mastra', 'Observability'],
                    link: 'https://github.com/KiraPC/vscode-mastra-trace-viewer',
                    impact: 'interests.openSource.projects.vscodeMastraTraceViewer.impact'
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
            ],
            projects: [
                {
                    name: 'interests.innovation.projects.gullivr.name',
                    description: 'interests.innovation.projects.gullivr.description',
                    technologies: ['SvelteKit', 'Svelte 5', 'Supabase', 'MCP', 'OpenAI Apps SDK', 'Vercel'],
                    impact: 'interests.innovation.projects.gullivr.impact'
                },
                {
                    name: 'interests.innovation.projects.aiFaq.name',
                    description: 'interests.innovation.projects.aiFaq.description',
                    technologies: ['MongoDB Atlas', 'Vector Search', 'FireworksAI', 'Python'],
                    impact: 'interests.innovation.projects.aiFaq.impact'
                },
                {
                    name: 'interests.innovation.projects.smartTeacher.name',
                    description: 'interests.innovation.projects.smartTeacher.description',
                    technologies: ['Google Assistant', 'Google Home', 'Node.js'],
                    impact: 'interests.innovation.projects.smartTeacher.impact'
                }
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
