interface TechStackItem {
  name: string;
  icon: string;
}

interface TechStackSection {
  title: string;
  icon: string;
  items: TechStackItem[];
}

const techStackData: TechStackSection[] = [
  {
    title: 'Languages',
    icon: '🧪',
    items: [
      {
        name: 'Kotlin',
        icon: 'https://img.shields.io/badge/Kotlin-7F52FF?style=for-the-badge&logo=kotlin&logoColor=white',
      },
      {
        name: 'Java',
        icon: 'https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=OpenJDK&logoColor=white',
      },
      {
        name: 'TypeScript',
        icon: 'https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white',
      },
      {
        name: 'JavaScript',
        icon: 'https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black',
      },
    ],
  },
  {
    title: 'Front-End',
    icon: '🧩',
    items: [
      {
        name: 'React',
        icon: 'https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black',
      },
      {
        name: 'Next.js',
        icon: 'https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white',
      },
      {
        name: 'Vue.js',
        icon: 'https://img.shields.io/badge/Vue.js-4FC08D?style=for-the-badge&logo=vue.js&logoColor=white',
      },
      {
        name: 'React Query',
        icon: 'https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white',
      },
    ],
  },
  {
    title: 'Back-End',
    icon: '🧠',
    items: [
      {
        name: 'Spring Boot',
        icon: 'https://img.shields.io/badge/Spring Boot-6DB33F?style=for-the-badge&logo=springboot&logoColor=white',
      },
      {
        name: 'JPA',
        icon: 'https://img.shields.io/badge/JPA-007396?style=for-the-badge&logo=hibernate&logoColor=white',
      },
      { name: 'Querydsl', icon: 'https://img.shields.io/badge/Querydsl-4285F4?style=for-the-badge&logoColor=white' },
      {
        name: 'Spring Security',
        icon: 'https://img.shields.io/badge/Spring Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white',
      },
      {
        name: 'Kotest',
        icon: 'https://img.shields.io/badge/Kotest-0095D5?style=for-the-badge&logo=kotest&logoColor=white',
      },
      {
        name: 'Kotlin JDSL',
        icon: 'https://img.shields.io/badge/Kotlin JDSL-0095D5?style=for-the-badge&logo=kotlin&logoColor=white',
      },
      {
        name: 'NestJS',
        icon: 'https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white',
      },
    ],
  },
  {
    title: 'Infrastructure & DevOps',
    icon: '☁️',
    items: [
      {
        name: 'AWS EC2',
        icon: 'https://img.shields.io/badge/AWS EC2-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS Lambda',
        icon: 'https://img.shields.io/badge/AWS Lambda-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS S3',
        icon: 'https://img.shields.io/badge/AWS S3-569A31?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS DynamoDB',
        icon: 'https://img.shields.io/badge/AWS DynamoDB-4053D6?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS ECS Fargate',
        icon: 'https://img.shields.io/badge/AWS ECS Fargate-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS Elastic Cache',
        icon: 'https://img.shields.io/badge/AWS Elastic Cache-0052CC?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
      {
        name: 'AWS RDS',
        icon: 'https://img.shields.io/badge/AWS RDS-527FFF?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
    ],
  },
  {
    title: 'Database',
    icon: '🗄️',
    items: [
      {
        name: 'MySQL',
        icon: 'https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white',
      },
      {
        name: 'PostgreSQL',
        icon: 'https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white',
      },
      {
        name: 'Redis',
        icon: 'https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white',
      },
    ],
  },
  {
    title: 'Monitoring',
    icon: '📈',
    items: [
      {
        name: 'Grafana',
        icon: 'https://img.shields.io/badge/Grafana-F46800?style=for-the-badge&logo=grafana&logoColor=white',
      },
      {
        name: 'Prometheus',
        icon: 'https://img.shields.io/badge/Prometheus-E6522C?style=for-the-badge&logo=prometheus&logoColor=white',
      },
      {
        name: 'AWS CloudWatch',
        icon: 'https://img.shields.io/badge/AWS CloudWatch-FF4F8B?style=for-the-badge&logo=amazonaws&logoColor=white',
      },
    ],
  },
  {
    title: 'Tools & Environment',
    icon: '🧰',
    items: [
      {
        name: 'IntelliJ IDEA',
        icon: 'https://img.shields.io/badge/IntelliJ IDEA-000000?style=for-the-badge&logo=intellijidea&logoColor=white',
      },
      {
        name: 'VS Code',
        icon: 'https://img.shields.io/badge/VS Code-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white',
      },
      {
        name: 'WebStorm',
        icon: 'https://img.shields.io/badge/WebStorm-000000?style=for-the-badge&logo=webstorm&logoColor=white',
      },
      { name: 'Git', icon: 'https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white' },
    ],
  },
  {
    title: 'Communication & Collaboration',
    icon: '🤝',
    items: [
      {
        name: 'Notion',
        icon: 'https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=notion&logoColor=white',
      },
      {
        name: 'Slack',
        icon: 'https://img.shields.io/badge/Slack-4A154B?style=for-the-badge&logo=slack&logoColor=white',
      },
      { name: 'Jira', icon: 'https://img.shields.io/badge/Jira-0052CC?style=for-the-badge&logo=jira&logoColor=white' },
    ],
  },
];

export default techStackData;
