import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
	const userSkills = await prisma.userSkill.findMany({
		include: {
			user: { select: { email: true } },
			skill: { select: { name: true } },
		},
	});

	const data = userSkills.map((entry) => ({
		email: entry.user.email,
		skill: entry.skill.name,
		level: entry.level,
	}));

	return NextResponse.json({ data });
}