import { UserSkill } from '@prisma/client';

export function getLevel(skillId: string, userSkills: UserSkill[]): string {
    const match = userSkills.find((s) => s.skillId === skillId);
    return match ? String(match.level) : '';
  }