'use client';

import React from 'react';
import LogoSrc from '@/app/assets/skillSurvey_logo.png';
import Image from 'next/image';
interface FrostyLogoProps {
    className?: string;
    alt?: string;
}

export default function FrostyLogo({
    className = '',
    alt = 'Skill Survey Logo',
}: FrostyLogoProps) {
    return (
        <div className={`w-32 h-auto ${className}`}>
            <Image
                src={LogoSrc}
                alt={alt}
                width={128}
                height={300}
                className="w-full h-auto"
            />
        </div>
    );
}
