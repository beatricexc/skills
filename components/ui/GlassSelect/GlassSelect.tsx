'use client'

import React, { SelectHTMLAttributes } from 'react'

interface GlassSelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    label: string
}

export function GlassSelect({
    label,
    className = '',
    disabled,
    ...props
}: GlassSelectProps) {
    return (
        <div>
            <label className="block text-sm font-medium text-[#234F8E] mb-1">
                {label}
            </label>
            <select
                {...props}
                disabled={disabled}
                className={`
          block w-full px-4 py-2 text-sm rounded-lg
          bg-[rgba(255,255,255,0.2)] backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          focus:outline-none focus:ring-2 focus:ring-[#A1DAD7] focus:border-transparent
          transition
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${className}
        `}
            />
        </div>
    )
}
