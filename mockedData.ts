export type formData = {
    personalInfo: {
        fullName: string
        email: string
        phoneNumber: string
        address: {
            zipCode: string
            street: string
            number: string
            neighborhood: string
            city: string
            state: string
        }
    }
    professionalSummary: string
    workExperience: {
        position: string
        company: string
        startDate: string
        endDate: string
        description: string
    }[]
    education: {
        course: string
        institution: string
        completionYear: string
    }[]
    languages: {
        language: string
        level: "Básico" | "Intermediário" | "Avançado" | "Fluente"
    }[]
}

export const MOCKED_CVS: formData[] = [
    {
        personalInfo: {
            fullName: "Ana Maria de Souza",
            email: "ana.souza@email.com",
            phoneNumber: "(11) 98765-4321",
            address: {
                zipCode: "12345-678",
                street: "Rua das Flores",
                number: "100",
                neighborhood: "Jardim Paulista",
                city: "São Paulo",
                state: "SP",
            },
        },
        professionalSummary: "Desenvolvedora front-end com 5 anos de experiência, focada em React e TypeScript.",
        workExperience: [
            {
                position: "Desenvolvedora Front-End Sênior",
                company: "Tech Solutions",
                startDate: "2020-01-15",
                endDate: "2024-05-20",
                description: "Desenvolvimento e manutenção de aplicações web utilizando React, Redux e Next.js.",
            },
        ],
        education: [
            {
                course: "Ciência da Computação",
                institution: "Universidade XYZ",
                completionYear: "2019",
            },
        ],
        languages: [
            { language: "Inglês", level: "Fluente" },
            { language: "Espanhol", level: "Básico" },
        ],
    },
    {
        personalInfo: {
            fullName: "Carlos Eduardo Farias",
            email: "carlos.farias@email.com",
            phoneNumber: "(21) 91234-5678",
            address: {
                zipCode: "87654-321",
                street: "Avenida Central",
                number: "50",
                neighborhood: "Centro",
                city: "Rio de Janeiro",
                state: "RJ",
            },
        },
        professionalSummary: "Gestor de projetos com foco em metodologias ágeis e liderança de equipes.",
        workExperience: [
            {
                position: "Gerente de Projetos",
                company: "Inovatech",
                startDate: "2018-03-01",
                endDate: "2023-10-30",
                description: "Gestão de projetos de software, planejamento de sprints e comunicação com stakeholders.",
            },
        ],
        education: [
            {
                course: "Engenharia de Software",
                institution: "Faculdade ABC",
                completionYear: "2017",
            },
        ],
        languages: [
            { language: "Inglês", level: "Avançado" },
        ],
    },
    {
        personalInfo: {
            fullName: "Juliana Lima",
            email: "juliana.lima@email.com",
            phoneNumber: "(31) 99876-5432",
            address: {
                zipCode: "54321-098",
                street: "Rua do Comércio",
                number: "20",
                neighborhood: "Savassi",
                city: "Belo Horizonte",
                state: "MG",
            },
        },
        professionalSummary: "Designer UX/UI com habilidades em prototipagem e testes de usabilidade.",
        workExperience: [
            {
                position: "Designer UX/UI",
                company: "Creative Minds",
                startDate: "2021-06-01",
                endDate: "2024-01-20",
                description: "Criação de wireframes, protótipos e interfaces para aplicações mobile e web.",
            },
        ],
        education: [
            {
                course: "Design Gráfico",
                institution: "Instituto de Artes",
                completionYear: "2020",
            },
        ],
        languages: [
            { language: "Inglês", level: "Intermediário" },
        ],
    },
];
