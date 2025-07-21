export interface Skill {
    name: string;
    level: number;
    category: string;
    years: number;
    description: string;
}

export interface SkillCategory {
    name: string;
    icon: string;
    description: string;
    skills: Skill[];
}

export interface ExpertiseArea {
    title: string;
    description: string;
    icon: string;
    technologies: string[];
}

export const load = async () => {
    const expertiseAreas: ExpertiseArea[] = [
        {
            title: 'skills.expertise.fullStack.title',
            description: 'skills.expertise.fullStack.description',
            icon: '🎯',
            technologies: ['SvelteKit', 'FastAPI', 'PostgreSQL', 'TailwindCSS', 'TypeScript']
        },
        {
            title: 'skills.expertise.cloudNative.title',
            description: 'skills.expertise.cloudNative.description',
            icon: '🏗️',
            technologies: ['AWS Lambda', 'API Gateway', 'ECS', 'SQS/SNS', 'CloudFormation']
        },
        {
            title: 'skills.expertise.devops.title',
            description: 'skills.expertise.devops.description',
            icon: '⚙️',
            technologies: ['Jenkins', 'Kubernetes', 'Docker', 'Terraform', 'GitHub Actions']
        },
        {
            title: 'skills.expertise.dataEngineering.title',
            description: 'skills.expertise.dataEngineering.description',
            icon: '📊',
            technologies: ['Apache Spark', 'Kafka', 'Delta Lake', 'Databricks', 'OpenSearch']
        }
    ];

    const skillCategories: SkillCategory[] = [
        {
            name: 'skills.categories.programming.name',
            icon: '💻',
            description: 'skills.categories.programming.description',
            skills: [
                { name: 'JavaScript/TypeScript', level: 95, category: 'frontend', years: 7, description: 'skills.categories.programming.skills.javascript.description' },
                { name: 'Python', level: 90, category: 'backend', years: 5, description: 'skills.categories.programming.skills.python.description' },
                { name: 'Java', level: 85, category: 'backend', years: 6, description: 'skills.categories.programming.skills.java.description' },
                { name: 'Go', level: 80, category: 'backend', years: 3, description: 'skills.categories.programming.skills.go.description' },
            ]
        },
        {
            name: 'skills.categories.frameworks.name',
            icon: '🚀',
            description: 'skills.categories.frameworks.description',
            skills: [
                { name: 'SvelteKit', level: 90, category: 'frontend', years: 2, description: 'skills.categories.frameworks.skills.sveltekit.description' },
                { name: 'FastAPI', level: 85, category: 'backend', years: 3, description: 'skills.categories.frameworks.skills.fastapi.description' },
                { name: 'Spring Boot', level: 85, category: 'backend', years: 4, description: 'skills.categories.frameworks.skills.springboot.description' },
                { name: 'Express.js', level: 80, category: 'backend', years: 5, description: 'skills.categories.frameworks.skills.express.description' },
                { name: 'React', level: 75, category: 'frontend', years: 3, description: 'skills.categories.frameworks.skills.react.description' }
            ]
        },
        {
            name: 'skills.categories.cloudDevops.name',
            icon: '☁️',
            description: 'skills.categories.cloudDevops.description',
            skills: [
                { name: 'AWS', level: 90, category: 'cloud', years: 5, description: 'skills.categories.cloudDevops.skills.aws.description' },
                { name: 'Kubernetes', level: 80, category: 'devops', years: 3, description: 'skills.categories.cloudDevops.skills.kubernetes.description' },
                { name: 'Docker', level: 85, category: 'devops', years: 4, description: 'skills.categories.cloudDevops.skills.docker.description' },
                { name: 'CI/CD', level: 85, category: 'devops', years: 4, description: 'skills.categories.cloudDevops.skills.cicd.description' },
                { name: 'Azure', level: 70, category: 'cloud', years: 2, description: 'skills.categories.cloudDevops.skills.azure.description' }
            ]
        },
        {
            name: 'skills.categories.database.name',
            icon: '🗄️',
            description: 'skills.categories.database.description',
            skills: [
                { name: 'MongoDB', level: 85, category: 'database', years: 4, description: 'skills.categories.database.skills.mongodb.description' },
                { name: 'PostgreSQL', level: 80, category: 'database', years: 4, description: 'skills.categories.database.skills.postgresql.description' },
                { name: 'AWS OpenSearch', level: 85, category: 'search', years: 3, description: 'skills.categories.database.skills.opensearch.description' },
                { name: 'Apache Kafka', level: 75, category: 'streaming', years: 2, description: 'skills.categories.database.skills.kafka.description' },
                { name: 'Apache Spark', level: 70, category: 'bigdata', years: 2, description: 'skills.categories.database.skills.spark.description' }
            ]
        },
        {
            name: 'skills.categories.tools.name',
            icon: '🛠️',
            description: 'skills.categories.tools.description',
            skills: [
                { name: 'Git/GitHub', level: 90, category: 'tools', years: 7, description: 'skills.categories.tools.skills.git.description' },
                { name: 'Agile/Scrum', level: 85, category: 'methodology', years: 5, description: 'skills.categories.tools.skills.agile.description' },
                { name: 'Test Automation', level: 80, category: 'testing', years: 4, description: 'skills.categories.tools.skills.testing.description' },
                { name: 'API Design', level: 85, category: 'architecture', years: 5, description: 'skills.categories.tools.skills.api.description' },
                { name: 'Monitoring', level: 75, category: 'observability', years: 3, description: 'skills.categories.tools.skills.monitoring.description' }
            ]
        }
    ];

    return {
        expertiseAreas,
        skillCategories
    };
};
