import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const skills = await prisma.skill.findMany({
			include: {
				userSkills: true,
			},
		});

		const topSkills = skills
			.map(skill => ({
				skill: skill.name,
				count: skill.userSkills.length,
			}))
			.sort((a, b) => b.count - a.count)
			.slice(0, 10);

		return NextResponse.json(topSkills);
	} catch (error) {
		console.error('[TOP_SKILLS_ERROR]', error);
		return NextResponse.json({ error: 'Failed to fetch top skills' }, { status: 500 });
	}
}