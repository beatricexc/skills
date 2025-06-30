import { PrismaClient } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const categories = {
    Frontend: ['React', 'Vue', 'Angular', 'Next.js', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript', 'TypeScript'],
    Backend: ['Node.js', 'Express', 'NestJS', 'GraphQL', 'REST API', 'JWT', 'Socket.IO', 'Prisma'],
    DevOps: ['Docker', 'Kubernetes', 'CI/CD', 'Terraform', 'AWS', 'Azure', 'Jenkins', 'Linux'],
    Database: ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'SQLite', 'Supabase', 'Firebase', 'ElasticSearch'],
};

async function seed() {
    console.log('Seeding...');

    const skillMap = new Map<string, string>(); // skillName -> skillId

    for (const [categoryName, skills] of Object.entries(categories)) {
        const slug = categoryName.toLowerCase().replace(/\s+/g, '-');

        const category = await prisma.category.upsert({
            where: { slug }, // assuming slug is unique
            update: {},
            create: {
                name: categoryName,
                slug,
            },
        });

        for (const skillName of skills) {
            const skill = await prisma.skill.upsert({
                where: {
                    name_categoryId: {
                        name: skillName,
                        categoryId: category.id,
                    },
                },
                update: {},
                create: {
                    name: skillName,
                    categoryId: category.id,
                },
            });

            skillMap.set(skill.name, skill.id);
        }
    }

    for (let i = 0; i < 100; i++) {
        const email = faker.internet.email().toLowerCase();
        const name = faker.person.fullName();

        const user = await prisma.user.create({
            data: {
                email,
                name,
                role: 'user',
            },
        });

        const skillsArray = Array.from(skillMap.entries());
        const numSkills = faker.number.int({ min: 5, max: 10 });
        const selectedSkills = faker.helpers.arrayElements(skillsArray, numSkills);

        for (const [_, skillId] of selectedSkills) {
            await prisma.userSkill.create({
                data: {
                    userId: user.id,
                    skillId,
                    level: faker.number.int({ min: 1, max: 5 }),
                },
            });
        }
    }

    console.log('✅ Seed complete');
}

seed()
    .catch((e) => {
        console.error('❌ Seeding failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
