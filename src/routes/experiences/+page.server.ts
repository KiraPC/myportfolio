export interface Project {
    name: string;
    description: string;
    technologies: string[];
    impact?: string;
}

export interface Experience {
    company: string;
    role: string;
    period: string;
    description: string;
    projects: Project[];
    type?: 'main' | 'side';
    icon?: string;
}

export const load = async () => {
    const experiences: Experience[] = [
        {
            company: 'Poste Italiane',
            role: 'experiences.posteItaliane.role',
            period: 'experiences.posteItaliane.period',
            description: 'experiences.posteItaliane.description',
            type: 'main',
            icon: '/logos/poste-italiane.jpeg',
            projects: [
                {
                    name: 'experiences.posteItaliane.projects.nuovaAreaComunicazioni.name',
                    description: 'experiences.posteItaliane.projects.nuovaAreaComunicazioni.description',
                    technologies: ['AWS', 'Java Spring', 'Golang', 'OpenSearch', 'Lambda', 'SQS', 'SNS', 'S3', 'DynamoDB', 'OpenShift', 'TypeScript CDK', 'EventBridge', 'StepFunctions', 'Freemarker', 'Python'],
                    impact: 'experiences.posteItaliane.projects.nuovaAreaComunicazioni.impact'
                },
                {
                    name: 'experiences.posteItaliane.projects.dataProducts.name',
                    description: 'experiences.posteItaliane.projects.dataProducts.description',
                    technologies: ['Azure Databricks', 'PySpark', 'Azure DataFactory', 'Azure EventHub', 'Azure Blob Storage', 'Delta Framework', 'Parquet'],
                    impact: 'experiences.posteItaliane.projects.dataProducts.impact'
                },
                {
                    name: 'experiences.posteItaliane.projects.assuranceConsoles.name',
                    description: 'experiences.posteItaliane.projects.assuranceConsoles.description',
                    technologies: ['SvelteJS', 'SvelteKit', 'SSR', 'CSR', 'Tailwind CSS'],
                    impact: 'experiences.posteItaliane.projects.assuranceConsoles.impact'
                },
                {
                    name: 'experiences.posteItaliane.projects.smartCatalog.name',
                    description: 'experiences.posteItaliane.projects.smartCatalog.description',
                    technologies: ['SvelteKit', 'Tailwind CSS', 'Flowbite', 'Monitoring', 'Tracing'],
                    impact: 'experiences.posteItaliane.projects.smartCatalog.impact'
                }
            ]
        },
        {
            company: 'Enel',
            role: 'experiences.enel.role',
            period: 'experiences.enel.period',
            description: 'experiences.enel.description',
            type: 'main',
            icon: '/logos/enel.jpeg',
            projects: [
                {
                    name: 'experiences.enel.projects.iotPlatform.name',
                    description: 'experiences.enel.projects.iotPlatform.description',
                    technologies: ['Python', 'FastAPI', 'MongoDB', 'Beanie ODM', 'gRPC', 'Kafka', 'REST API'],
                    impact: 'experiences.enel.projects.iotPlatform.impact'
                },
                {
                    name: 'experiences.enel.projects.mlPlatform.name',
                    description: 'experiences.enel.projects.mlPlatform.description',
                    technologies: ['AWS', 'StepFunctions', 'Lambda', 'SageMaker', 'ElasticSearch', 'API Gateway', 'BitBucket', 'Bamboo', 'MLOps'],
                    impact: 'experiences.enel.projects.mlPlatform.impact'
                },
                {
                    name: 'experiences.enel.projects.dataCatalog.name',
                    description: 'experiences.enel.projects.dataCatalog.description',
                    technologies: ['Angular 9', 'Material Design', 'Wildfly', 'MongoDB', 'REST API'],
                    impact: 'experiences.enel.projects.dataCatalog.impact'
                },
                {
                    name: 'experiences.enel.projects.dataScienceSupport.name',
                    description: 'experiences.enel.projects.dataScienceSupport.description',
                    technologies: ['FastAPI', 'Kubernetes', 'CI/CD', 'ETL', 'Python', 'GitFlow', 'Docker'],
                    impact: 'experiences.enel.projects.dataScienceSupport.impact'
                }
            ]
        },
        {
            company: 'Accenture Technology Solution',
            role: 'experiences.accenture.role',
            period: 'experiences.accenture.period',
            description: 'experiences.accenture.description',
            type: 'main',
            icon: '/logos/ats.jpeg',
            projects: [
                {
                    name: 'experiences.accenture.projects.applicationGateway.name',
                    description: 'experiences.accenture.projects.applicationGateway.description',
                    technologies: ['Node.js', 'Express.js', 'Chai', 'Mocha', 'REST API', 'Agile', 'Design First'],
                    impact: 'experiences.accenture.projects.applicationGateway.impact'
                },
                {
                    name: 'experiences.accenture.projects.modularGateway.name',
                    description: 'experiences.accenture.projects.modularGateway.description',
                    technologies: ['Node.js', 'TypeScript', 'Express.js', 'IoC Pattern', 'npm', 'Microservices'],
                    impact: 'experiences.accenture.projects.modularGateway.impact'
                },
                {
                    name: 'experiences.accenture.projects.websocketGateway.name',
                    description: 'experiences.accenture.projects.websocketGateway.description',
                    technologies: ['Node.js', 'Socket.IO', 'WebSocket', 'Real-time'],
                    impact: 'experiences.accenture.projects.websocketGateway.impact'
                },
                {
                    name: 'experiences.accenture.projects.cloudNative.name',
                    description: 'experiences.accenture.projects.cloudNative.description',
                    technologies: ['AWS', 'Jenkins', 'SAM', 'CloudFormation', 'Lambda', 'API Gateway', 'DynamoDB', 'ElasticSearch', 'Kibana', 'GDPR'],
                    impact: 'experiences.accenture.projects.cloudNative.impact'
                },
                {
                    name: 'experiences.accenture.projects.rosTurtlebot.name',
                    description: 'experiences.accenture.projects.rosTurtlebot.description',
                    technologies: ['ROS', 'AWS RoboMaker', 'Lidar', 'AWS Rekognition', 'Computer Vision', 'Robotics'],
                    impact: 'experiences.accenture.projects.rosTurtlebot.impact'
                }
            ]
        },
        {
            company: 'Tegel Srl',
            role: 'experiences.tegel.role',
            period: 'experiences.tegel.period',
            description: 'experiences.tegel.description',
            type: 'side',
            icon: '/logos/tegel.jpeg',
            projects: [
                {
                    name: 'experiences.tegel.projects.dwelly.name',
                    description: 'experiences.tegel.projects.dwelly.description',
                    technologies: ['Node.js', 'Strapi CMS', 'PostgreSQL', 'SvelteKit', 'Tailwind CSS', 'Kubernetes', 'OVH', 'Jenkins', 'SaaS'],
                    impact: 'experiences.tegel.projects.dwelly.impact'
                }
            ]
        }
    ];

    return {
        experiences
    };
}