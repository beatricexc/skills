'use client'
import { FC } from 'react'
import { LevelCard } from '../Level/LevelCard'
import { levelMeta } from '../../data'

export const LevelsOverview: FC = () => (
    <section
        className={`
            px-6
            sm:px-20
            py-6
            bg-white/20 backdrop-blur-sm
            border border-white/30
            rounded-2xl
            space-y-4
        `}
    >
        <h2 className="text-3xl font-semibold text-[#234F8E] mb-15 mt-5">
            How to rate your skill level
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {levelMeta.map(lvl => (
                <LevelCard key={lvl.level} {...lvl} />
            ))}
        </div>
    </section>
)
