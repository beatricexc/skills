// app/user/survey/[categorySlug]/page.tsx
import { prisma } from "@/lib/prisma";
import { levelInformation } from "./data";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import SkillForm from "./components/SkillForm/SkillForm";
import SkillInfo from "./components/SkillInfo/SkillInfo";
import { SurveyNavigation } from "./components/SurveyNavigation/SurveyNavigation";
import { GlassCard } from "@/components/ui/GlassCard/GlassCard";

export const dynamic = 'force-dynamic';

export default async function Page({ params }: any) {
    const session = await getServerSession(authOptions);
    if (!session?.user.id) redirect('/login');

    const categoryWithSkills = await prisma.category.findUnique({
        where: { slug: params.categorySlug },
        include: { skills: true }
    });
    if (!categoryWithSkills) return null;

    const categories = await prisma.category.findMany();
    const userSkills = await prisma.userSkill.findMany({
        where: { userId: session.user.id }
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6 bg-[rgba(244,244,244,0.6)] backdrop-blur-sm">
            {/* top nav dots */}
            <SurveyNavigation surveyFlow={categories.map(c => c.slug)} />

            <div className="mt-8 grid gap-8 md:grid-cols-3">
                {/* Skill info in a GlassCard */}
                <GlassCard className="md:col-span-1">
                    <h3 className="text-2xl font-bold text-[#234F8E] mb-3">
                        Rate your skill level
                    </h3>
                    <SkillInfo title={levelInformation.title} info={levelInformation.info} />
                </GlassCard>

                {/* The form itself, also in a GlassCard */}
                <GlassCard className="md:col-span-2">
                    <SkillForm
                        categoryWithSkills={categoryWithSkills}
                        initialUserSkills={userSkills}
                        userId={session.user.id}
                    />
                </GlassCard>
            </div>
        </div>
    );
}
