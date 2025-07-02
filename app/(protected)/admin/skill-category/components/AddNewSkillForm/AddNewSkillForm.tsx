'use client'

import * as Dialog from '@radix-ui/react-dialog'
import { Plus, X } from 'lucide-react'
import { addSkill } from '@/app/actions/skill'
import { useActionState, useEffect, useRef, useState } from 'react'
import { Category } from '@prisma/client'
import { GlassCard } from '@/components/ui/GlassCard/GlassCard'

export default function AddSkillToCategoryForm({ category }: { category: Category }) {
	const [open, setOpen] = useState(false)
	const [state, formAction] = useActionState(addSkill, {})
	const [showSuccess, setShowSuccess] = useState(false)
	const formRef = useRef<HTMLFormElement>(null)

	// Reset form and show success when state.success is updated
	useEffect(() => {
		if (state.success) {
			setShowSuccess(true)
			formRef.current?.reset()

			const timer = setTimeout(() => setShowSuccess(false), 3000)
			return () => clearTimeout(timer)
		}
	}, [state.success])

	return (
		<Dialog.Root open={open} onOpenChange={setOpen}>
			<Dialog.Trigger asChild>
				<button
					type="button"
					className="inline-flex items-center justify-center bg-[#00BFB3] text-white px-4 py-2 rounded-lg shadow-sm hover:bg-[#009b93] focus:outline-none focus:ring-2 focus:ring-[#00BFB3]/50"
				>
					Add skill
					<Plus className="ml-2 w-4 h-4" />
				</button>
			</Dialog.Trigger>

			<Dialog.Portal>
				<Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
				<Dialog.Content className="fixed z-50 inset-0 flex items-center justify-center p-4">
					<GlassCard className="w-full max-w-md p-6">
						<div className="flex justify-between items-center mb-4">
							<Dialog.Title className="text-xl font-semibold text-[#234F8E]">
								Add Skill
							</Dialog.Title>
							<Dialog.Close asChild>
								<button className="text-gray-500 hover:text-gray-700 focus:outline-none">
									<X className="w-5 h-5" />
								</button>
							</Dialog.Close>
						</div>

						<form action={formAction} ref={formRef} className="space-y-4">
							<input type="hidden" name="categoryId" value={category.id} />

							<input
								id="name"
								name="name"
								required
								placeholder="Skill name"
								className="w-full p-2 border-b-2 border-b-[#00BFB3] bg-transparent placeholder-gray-700 text-black focus:outline-none focus:ring-0"
							/>

							{state.error && (
								<p className="text-sm text-red-600 mt-1">{state.error}</p>
							)}

							<div className="h-5">
								<p
									className={`
										text-sm text-teal-700 mt-1 transition-opacity duration-300
										${showSuccess ? 'opacity-100' : 'opacity-0'}
									`}
								>
									{state.success}
								</p>
							</div>
							<div className="flex justify-end space-x-3 pt-4">
								<Dialog.Close asChild>
									<button
										type="button"
										className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 focus:outline-none"
									>
										Cancel
									</button>
								</Dialog.Close>

								<button
									type="submit"
									className="px-4 py-2 bg-[#00BFB3] text-white text-sm rounded-lg shadow-sm hover:bg-[#009b93] focus:outline-none focus:ring-2 focus:ring-[#00BFB3]/50"
								>
									Save Skill
								</button>
							</div>
						</form>
					</GlassCard>
				</Dialog.Content>
			</Dialog.Portal>
		</Dialog.Root>
	)
}
