// app/api/stats/skills/route.ts
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	const skills = await prisma.skill.findMany({
		include: {
			userSkills: true,
			category: true,
		},
	});

	const skillStats = skills.map((skill) => {
		const count = skill.userSkills.length;
		const avgLevel =
			count > 0
				? skill.userSkills.reduce((sum, s) => sum + s.level, 0) / count
				: 0;

		return {
			skill: skill.name,
			category: skill.category.name,
			count,
			avgLevel: avgLevel.toFixed(2),
		};
	});

	return NextResponse.json({ skillStats });
}
