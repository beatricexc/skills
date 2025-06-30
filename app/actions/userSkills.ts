'use server';
import { prisma } from "@/lib/prisma";
import { UserSkill } from "@prisma/client";

/* eslint-disable @typescript-eslint/no-explicit-any */
export async function submitSkills(_prevState: UserSkill[], formData: FormData): Promise<UserSkill[]> {
  let userId = '';
  const userskills: { userId: string; skillId: string; level: number }[] = [];
  for (const [key, value] of formData.entries()) {
      if (key.startsWith('$ACTION')) continue;
  
      if (key === 'userId') {
        userId = value as string
      }
      else {
        userskills.push({
          userId,
          skillId: key as string, // assuming input name="skill-abc123"
          level: parseInt(value as string, 10),
        });
      }
  }

  const updatedSkills = await Promise.all(
    userskills.map(({ skillId, level }) => {
      return prisma.userSkill.upsert({
        where: { userId_skillId: { userId, skillId } },
        update: { level },
        create: { userId, skillId, level },
      })
    })
  );

  return updatedSkills;
}
