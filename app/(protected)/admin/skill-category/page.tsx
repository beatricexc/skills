// app/(protected)/admin/skill-category/page.tsx
import { prisma } from '@/lib/prisma';
import SkillCard from './components/SkillCard/SkillCard';
import CreateCategoryForm from './components/CreateCategoryForm/CreateCategoryForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';
import { redirect } from 'next/navigation';
import { FlashController } from '@/components/ui/FlashController/FlashController';

export const dynamic = 'force-dynamic';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default async function Page({ searchParams }: any) {
    const session = await getServerSession(authOptions);
    const error = searchParams?.error;
    const success = searchParams?.success;

    if (!session || session.user.role !== 'admin') {
        redirect('/unauthorized');
    }

    const categories = await prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: { skills: { orderBy: { name: 'asc' } } },
    });

    return (
        <div className="min-h-[calc(100vh-4rem)] p-6">
            {/* client-side flash handling */}
            <FlashController />

            <div
                className="
          relative z-10
          backdrop-blur-sm bg-[rgba(244,244,244,0.6)]
          border border-[rgba(244,244,244,0.3)]
          rounded-2xl
          max-w-5xl mx-auto
          p-6 sm:p-8
          space-y-6
        "
            >
                {/* only render flash when present */}
                {(error || success) && (
                    <div>
                        {error ? (
                            <p
                                className="
                  flex items-center gap-2
                  w-full
                  px-4 py-2 rounded-lg
                  backdrop-blur-sm bg-[rgba(255,255,255,0.2)]
                  border border-red-400
                  text-red-600 font-medium
                "
                            >
                                <svg
                                    className="w-5 h-5 text-red-500 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M8.257 3.099c.765-1.36 2.721-1.36 3.486 0l5.454 9.73c.75 1.336-.213 2.971-1.742 2.971H4.545c-1.529 0-2.492-1.635-1.742-2.97l5.454-9.73zM9 13a1 1 0 112 0 1 1 0 01-2 0zm.25-5a.75.75 0 011.5 0v2.5a.75.75 0 01-1.5 0V8z" />
                                </svg>
                                {decodeURIComponent(error)}
                            </p>
                        ) : (
                            <p
                                className="
                  flex items-center gap-2
                  w-full
                  px-4 py-2 rounded-lg
                  backdrop-blur-sm bg-[rgba(255,255,255,0.2)]
                  border border-teal-300
                  text-teal-700 font-medium
                "
                            >
                                <svg
                                    className="w-5 h-5 text-teal-500 flex-shrink-0"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707l-4 4a1 1 0 01-1.414 0l-2-2a1 1 0 111.414-1.414L9 10.586l3.293-3.293a1 1 0 111.414 1.414z" />
                                </svg>
                                {decodeURIComponent(success)}
                            </p>
                        )}
                    </div>
                )}

                <h1 className="text-3xl font-semibold text-[#234F8E]">Skill Categories</h1>

                <CreateCategoryForm />

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category) => (
                        <SkillCard
                            key={category.id}
                            category={category}
                            name={category.name}
                            slug={category.slug}
                            skills={category.skills}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
