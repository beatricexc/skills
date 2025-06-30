// app/actions/updateUserRole.ts
'use server';

import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';

export async function updateRole(formData: FormData) {
  const userId = formData.get('userId') as string;
  const newRole = formData.get('newRole') as string;

  if (!userId || !newRole) throw new Error('Missing data');

  await prisma.user.update({
    where: { id: userId },
    data: { role: newRole },
  });

  revalidatePath('/admin/users'); // Refresh the user list
}