// app/user/survey/page.tsx
import { authOptions } from '@/auth'
import { prisma } from '@/lib/prisma'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'
import { LevelsOverview } from './[categorySlug]/components/Level/LevelOverview'

export const dynamic = 'force-dynamic'

export default async function UserSurveyLanding() {
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) redirect('/login')

    const firstName = session.user.name?.split(' ')[0] || 'there'
    const categories = await prisma.category.findMany()

    return (
        <div className="relative min-h-screen">
            {/* Brain BG */}
            <img
                src="/brain_skills.jpg"
                alt="Brain background"
                className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110"
            />
            <div className="relative z-10 max-w-8xl mx-auto py-12 px-6 space-y-12">
                {/* Greeting */}
                <div>
                    <h1 className="text-5xl font-bold text-white drop-shadow-lg">
                        Hey, {firstName}!
                    </h1>
                    <p className="mt-2 text-xl text-white/90 drop-shadow">
                        Welcome to the Skills Survey. First, see how we define each level below.
                    </p>
                </div>

                {/* Level infographic cards */}
                <LevelsOverview />

                {/* Available Sections */}
                <section className="space-y-4">
                    <h2 className="text-2xl font-semibold text-white drop-shadow">
                        Available Sections
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {categories.map(cat => (
                            <Link key={cat.id} href={`/user/survey/${cat.slug}`} passHref>
                                <GlassCard className="bg-[rgba(244,244,244,0.6)] backdrop-blur-sm cursor-pointer">
                                    <h3 className="text-xl font-semibold text-[#234F8E] mb-2">
                                        {cat.name}
                                    </h3>
                                    <p className="text-sm text-blue-900">
                                        Start or resume the {cat.name} section.
                                    </p>
                                </GlassCard>
                            </Link>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
