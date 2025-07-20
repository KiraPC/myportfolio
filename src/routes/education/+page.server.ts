export interface Education {
    institution: string;
    degree: string;
    description: string;
    type: 'degree' | 'certification' | 'achievement';
    year: string;
    icon?: string;
}

export interface ContinuousLearning {
    area: string;
    description: string;
    technologies: string[];
}

export const load = async () => {
    const educationData: Education[] = [
        {
            institution: 'education.university.institution',
            degree: 'education.university.degree',
            description: 'education.university.description',
            type: 'degree',
            year: '2016',
            icon: '🎓'
        },
        {
            institution: 'education.safeCertification.institution',
            degree: 'education.safeCertification.degree',
            description: 'education.safeCertification.description',
            type: 'certification',
            year: '2018',
            icon: '⚡'
        },
        {
            institution: 'education.awsCertification.institution',
            degree: 'education.awsCertification.degree',
            description: 'education.awsCertification.description',
            type: 'certification',
            year: '2019',
            icon: '☁️'
        },
        {
            institution: 'education.kpnHackathon.institution',
            degree: 'education.kpnHackathon.degree',
            description: 'education.kpnHackathon.description',
            type: 'achievement',
            year: '2019',
            icon: '🏆'
        },
        {
            institution: 'education.mongodbHackathon.institution',
            degree: 'education.mongodbHackathon.degree',
            description: 'education.mongodbHackathon.description',
            type: 'achievement',
            year: '2024',
            icon: '🥇'
        }
    ];

    const continuousLearning: ContinuousLearning[] = [
        {
            area: 'education.continuousLearning.modernFrameworks.area',
            description: 'education.continuousLearning.modernFrameworks.description',
            technologies: ['SvelteKit', 'FastAPI', 'SpringBoot', 'Fastify']
        },
        {
            area: 'education.continuousLearning.cloudTechnologies.area',
            description: 'education.continuousLearning.cloudTechnologies.description',
            technologies: ['AWS Lambda', 'Azure Functions', 'Kubernetes', 'Docker']
        },
        {
            area: 'education.continuousLearning.devopsAutomation.area',
            description: 'education.continuousLearning.devopsAutomation.description',
            technologies: ['CI/CD', 'GitHub Actions', 'Jenkins']
        },
        {
            area: 'education.continuousLearning.artificialIntelligence.area',
            description: 'education.continuousLearning.artificialIntelligence.description',
            technologies: ['OpenAI GPT', 'MongoDB Vector Search', 'Embeddings', 'FireworksAI']
        },
    ];

    return {
        educationData,
        continuousLearning
    };
};
