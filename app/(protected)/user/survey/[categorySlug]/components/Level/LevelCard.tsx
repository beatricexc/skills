'use client'
import { FC } from 'react'

interface LevelCardProps {
    level: number
    title: string
    tagline: string
    definition: string
    imgSrc: string
    imgAlt?: string
}

export const LevelCard: FC<LevelCardProps> = ({
    level, title, tagline, definition, imgSrc, imgAlt = ''
}) => (
    <div
        className={`
      flex flex-col items-center text-center
      p-6 gap-3
      bg-white/20 backdrop-blur-sm
      border border-white/30
      rounded-2xl
      hover:shadow-lg transition
    `}
    >
        {/* Illustration */}
        <img
            src={imgSrc}
            alt={imgAlt}
            className="w-32 h-32 mb-3 object-contain"
        />

        {/* Level & Title */}
        <h3 className="text-lg font-semibold text-[#00BFB3]">
            Level {level}: {title}
        </h3>

        {/* Playful tagline */}
        <p className="text-sm italic text-gray-700">{tagline}</p>

        {/* Official definition (always visible) */}
        <p className="mt-2 text-xs text-gray-800 px-2">
            {definition}
        </p>
    </div>
)
