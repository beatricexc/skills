import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
	try {
		const [users, skills, categories] = await Promise.all([
			prisma.user.count(),
			prisma.skill.count(),
			prisma.category.count(),
		]);

		return NextResponse.json({ users, skills, categories });
	} catch (error) {
		console.error('[STATS_SUMMARY_ERROR]', error);
		return NextResponse.json({ error: 'Failed to fetch summary stats' }, { status: 500 });
	}
}