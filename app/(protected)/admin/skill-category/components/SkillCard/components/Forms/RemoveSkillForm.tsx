'use client'

import { deleteSkill } from '@/app/actions/skill'
import { Trash2 } from 'lucide-react'

type SkillActionsProps = {
  skillId: string
  iconSize?: number
  iconColor?: string
}

export default function RemoveSkillForm({
  skillId,
  iconSize = 16,
  iconColor = '#234F8E',
}: SkillActionsProps) {
  return (
    <form action={deleteSkill}>
      <input type="hidden" name="skillId" value={skillId} />
      <button
        type="submit"
        name="action"
        value="delete"
        aria-label="Delete"
        className="
          p-1
          text-[rgba(35,79,142,0.8)]
          hover:text-[rgba(35,79,142,1)]
          transition
        "
        style={{ color: iconColor }}
      >
        <Trash2 className={`w-${iconSize / 4} h-${iconSize / 4}`} />
      </button>
    </form>
  )
}
