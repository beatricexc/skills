// app/actions/createCategory.ts
'use server';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function addSkill(
	state: { error?: string },
	formData: FormData
): Promise<{ error?: string }> {
    const name = formData.get('name')?.toString().trim();
    const categoryId = formData.get('categoryId')?.toString();

    if (!name || !categoryId) {
      return { error: 'Missing fields' };
    }

    const existing = await prisma.skill.findFirst({
      where: { name, categoryId },
    });

    if (existing) {
      return { error: `A skill with the name "${name}" already exists in this category.` };
    }

    await prisma.skill.create({
        data: { name, categoryId },
    });

    revalidatePath('/skill-category');

    return {};
}

export async function deleteSkill(formData: FormData) {
  const skillId = formData.get('skillId') as string;
  const action = formData.get('action') as string;

  if (!skillId || !action) throw new Error('Missing required data');

  if (action === 'delete') {
    await prisma.userSkill.deleteMany({
      where: {
        skillId: skillId
      }
    })
    await prisma.skill.delete({ where: { id: skillId } });
    revalidatePath('/skill-category')
  } else if (action === 'edit') {
    // redirect to edit form, or set flag for UI
    console.log(`Edit skill ${skillId}`);
  }
}

export async function updateSkillName(formData: FormData) {
  const skillId = formData.get('skillId') as string;
  const name = formData.get('name') as string;

  if (!skillId || !name) throw new Error('Missing data');

  await prisma.skill.update({
    where: { id: skillId },
    data: { name },
  });

  // revalidatePath('/skill-category')
}