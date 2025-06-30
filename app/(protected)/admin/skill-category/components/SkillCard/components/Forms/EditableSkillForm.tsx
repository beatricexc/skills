'use client'

import { useState } from 'react'
import { Pencil, Check } from 'lucide-react'
import { updateSkillName } from '@/app/actions/skill'
import { Skill } from '@prisma/client'
import RemoveSkillForm from './RemoveSkillForm'

export default function EditableSkillRow({ skill }: { skill: Skill }) {
	const [editing, setEditing] = useState(false)
	const [name, setName] = useState(skill.name)

	async function handleSubmit(formData: FormData) {
		await updateSkillName(formData)
		setEditing(false)
	}


	return (
		<div className="flex items-center justify-between py-1 px-2 min-w-0">
			{editing ? (
				<form
					action={handleSubmit}
					className="flex items-center gap-2 flex-grow min-w-0"
				>
					<input type="hidden" name="skillId" value={skill.id} />

					<input
						name="name"
						value={name}
						onChange={e => setName(e.target.value)}
						className="
              flex-grow min-w-0
              bg-[rgba(255,255,255,0.2)] text-[rgba(35,79,142,0.9)]
              placeholder-[rgba(35,79,142,0.5)]
              px-2 py-1 rounded
              border-b border-[rgba(35,79,142,0.4)]
              focus:outline-none focus:ring-0 focus:border-[rgba(35,79,142,0.7)]
              transition
            "
					/>

					<button
						type="submit"
						className="p-1 text-[14px] text-[rgba(0,191,179,1)] hover:text-[rgba(0,191,179,0.8)]"
						aria-label="Save"
					>
						<Check className="w-4 h-4" />
					</button>
				</form>
			) : (
				<div className="flex items-center gap-2 flex-grow min-w-0">
					<span className="truncate flex-grow text-[rgba(35,79,142,0.9)]">
						{name}
					</span>
					<button
						type="button"
						onClick={() => setEditing(true)}
						className="p-1 text-[rgba(0,191,179,1)] hover:text-[rgba(0,191,179,0.8)]"
						aria-label="Edit"
					>
						<Pencil className="w-4 h-4" />
					</button>
				</div>
			)}

			<div className="ml-2">
				<RemoveSkillForm skillId={skill.id} />
			</div>
		</div>
	)
}
