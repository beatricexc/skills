// components/ui/GlassCard/GlassCard.tsx
'use client';

import React, { ReactNode, HTMLAttributes } from 'react';
import Link from 'next/link';

// Extend the standard div attributes so className (and style, id, etc.) are all valid
export interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
    title?: string;
    value?: string | number;
    icon?: ReactNode;
    link?: string;
    children?: ReactNode;
}

export function GlassCard({
    title,
    value,
    icon,
    link,
    children,
    className = '',
    ...htmlProps
}: GlassCardProps) {
    const content = (
        <div
            className={`
          ${className}
          flex flex-col justify-between p-6
          bg-gradient-to-br 
          from-white/30        /* White at 30% opacity, top-left */
          to-[#c6d8e5]/60         /* White at 20% opacity */
          backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          rounded-2xl shadow-lg hover:shadow-xl transition
        `}
            {...htmlProps}
        >
            {title && <h3 className="text-lg font-semibold mb-2 text-[#234F8E]">{title}</h3>}
            {value !== undefined && <p className="text-2xl font-bold text-[#00BFB3] mt-1">{value}</p>}
            {children}
            {icon && (
                <div className="mt-4 self-end bg-[rgba(0,191,179,0.3)] p-2 rounded-full">
                    {icon}
                </div>
            )}
        </div>
    );

    return link ? <Link href={link}>{content}</Link> : content;
}