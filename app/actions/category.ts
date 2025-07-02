'use server';

import { redirect } from 'next/navigation';
import { prisma } from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Prisma } from '@prisma/client';


export async function createCategory(
	state: { error?: string },
	formData: FormData
): Promise<{ error?: string, success?: string }> {
	const name = formData.get('name')?.toString().trim();

	if (!name) {
		return { error: 'Name is required' };
	}

	const slug = name
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9\-]/g, '');

	try {
		await prisma.category.create({
			data: { name, slug },
		});

		revalidatePath('/admin/skill-category');
		return { success: `Category ${name} created successfully` };
	} catch (error) {
		// Safely check if it's a Prisma known request error
		if (
			error instanceof Prisma.PrismaClientKnownRequestError &&
			error.code === 'P2002'
		) {
			return { error: 'A category with this name already exists.' };
		}

		console.error('Unexpected error:', error);
		return { error: 'Something went wrong while creating the category.' };
	}
}

export async function deleteCategory(formData: FormData) {
	const categoryId = formData.get('categoryId') as string;
	const categorySlug = formData.get('categorySlug') as string;

	let errorMessage;
	let encoded;

	errorMessage = `Missing category id`;
	encoded = encodeURIComponent(errorMessage);

	if (!categoryId) {
		redirect(`/admin/skill-category?error=${encoded}`);
	}

	const skillCount = await prisma.skill.count({
		where: { categoryId }
	});

	errorMessage = `Cannot delete category "${categorySlug}" with existing skills. Please delete skills first.`;
	encoded = encodeURIComponent(errorMessage);
	if (skillCount > 0) {
		redirect(`/admin/skill-category?error=${encoded}`);
	}

	await prisma.category.delete({ where: { id: categoryId } });

	redirect('/admin/skill-category?success=Category+deleted');
}
