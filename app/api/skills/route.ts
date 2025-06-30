import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  const skills = await prisma.skill.findMany({
    orderBy: { name: 'asc' },
    select: { id: true, name: true },
  });

  return NextResponse.json(skills);
}