'use client'
import { useState } from 'react'
import { useUpdateSearchParams } from '../hooks/updateSearchParams'
import { Category, Skill } from '@prisma/client'
import { GlassSelect } from '@/components/ui/GlassSelect/GlassSelect'

type CategoryWithSkillsProps = {
    propSkills: Skill[]
    propCategories: Category[]
    propCategorySlug: string
    propSkillName: string
}

export default function CategoryWithSkills({
    propCategorySlug,
    propSkillName,
    propSkills,
    propCategories,
}: CategoryWithSkillsProps) {
    const updateParams = useUpdateSearchParams()
    const [currentCategories] = useState(propCategories)

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
        e.target.value && updateParams({ categorySlug: e.target.value })

    const handleSkillSelect = (e: React.ChangeEvent<HTMLSelectElement>) =>
        e.target.value && updateParams({ skill: e.target.value })

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <GlassSelect
                label="Category"
                value={propCategorySlug || ''}
                onChange={handleCategoryChange}
            >
                <option value="">Select category…</option>
                {currentCategories.map(cat => (
                    <option key={cat.id} value={cat.slug}>
                        {cat.name}
                    </option>
                ))}
            </GlassSelect>

            <GlassSelect
                label="Skill"
                value={propSkillName || ''}
                onChange={handleSkillSelect}
                disabled={!propSkills.length}
            >
                <option value="">Select skill…</option>
                {propSkills.map(s => (
                    <option key={s.id} value={s.name}>
                        {s.name}
                    </option>
                ))}
            </GlassSelect>
        </div>
    )
}
