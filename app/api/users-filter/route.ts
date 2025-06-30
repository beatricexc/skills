import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const categorySlug = searchParams.get('categorySlug');
    const skill = searchParams.get('skill');
    const level = parseInt(searchParams.get('level') || '', 10);
    const operator = searchParams.get('operator');
    const page = parseInt(searchParams.get('page') as string) || 1;
    const pageSize = parseInt(searchParams.get('pageSize') as string) || 4;
    

    if (!categorySlug || !skill) {
        return NextResponse.json({
            message: 'Category slug or skill not selected',
            success: false,
            data: []
        }, {status: 400});
    }


    const levelFilter = {
        [`${operator}`]: Number(level)
    };

    const skip = (page - 1) * pageSize;
   
    const [userWithSkills, totalUserWithSkills] = await Promise.all([
        prisma.user.findMany({
            skip: skip,
            take: pageSize,
            where: {
                userSkills: {
                    some: {
                        skill: {
                            name: skill
                        },
                        level: levelFilter
                    }
                }
            }
        }),
        prisma.user.count({
            where: {
                userSkills: {
                    some: {
                        skill: {
                            name: skill
                        },
                        level: levelFilter
                    }
                }
            }
        })
    ])

    return NextResponse.json({
        success: true,
        message: `Users retrieved with filters:
            categorySlug ${categorySlug};
            skill ${skill};
            level ${level};
            operator ${operator}
            page ${page}
            pageSize ${pageSize}

            fetched successfully`,
        data: {
            userWithSkills,
            totalUserWithSkills
        }
    })
}