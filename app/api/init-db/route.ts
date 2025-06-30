export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {

    // GET route
    try {
        const adminEmail = 'benediccelina@outlook.com';
        const existingAdmin = await prisma.user.findFirst({ where: { email: adminEmail } });

        if (!existingAdmin) {
            await prisma.user.create({
                data: {
                    email: adminEmail,
                    name: 'Admin',
                    role: 'admin',
                },
            });
        }

        const skills = [
            { name: 'React', category: 'Frontend' },
            { name: 'Next.js', category: 'Frontend' },
            { name: 'PostgreSQL', category: 'Database' },
            { name: 'Prisma', category: 'Backend' },
            { name: 'Docker', category: 'DevOps' },
        ];

        for (const { name, category } of skills) {
            let categoryRecord = await prisma.category.findFirst({ where: { name: category } });

            if (!categoryRecord) {
                categoryRecord = await prisma.category.create({
                    data: {
                        name: category,
                        slug: category.toLowerCase().replace(/\s+/g, '-'),
                    },
                });
            }

            const existingSkill = await prisma.skill.findFirst({ where: { name } });

            if (!existingSkill) {
                await prisma.skill.create({
                    data: {
                        name,
                        categoryId: categoryRecord.id,
                    },
                });
            }
        }

        return NextResponse.json({ message: '✅ Seed successful' });
    } catch (e) {
        console.error('❌ Seed failed:', e);
        return NextResponse.json({ error: `Seeding failed error: ${e}` }, { status: 500 });
    } finally {
        await prisma.$disconnect();
    }
}
