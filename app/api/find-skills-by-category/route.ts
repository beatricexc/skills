import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('categorySlug');
    console.log({categorySlug})

    if (!categorySlug) {
        return NextResponse.json({
            message: 'Category not selected',
            success: false,
            data: []
        }, {status: 400});
    }

    const category= await prisma.category.findUnique({
        where: {
            slug: categorySlug
        },
        include: {
            skills: {
                orderBy: {
                    name: 'asc'
                },
            },
        }
    });
    console.log({category})

    return NextResponse.json({
        success: true,
        message: 'Skills fetched successfully',
        data: category?.skills
    })
}