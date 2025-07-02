'use client';

import { createCategory } from '@/app/actions/category';
import { useActionState } from 'react';
import { useEffect, useRef, useState } from 'react';

export default function CategoryForm() {
	const [state, formAction] = useActionState(createCategory, {});
	const [showSuccess, setShowSuccess] = useState(false);
	const formRef = useRef<HTMLFormElement>(null);

	// Trigger the success message and reset form if needed
	useEffect(() => {
		if (state.success) {
			setShowSuccess(true);
			formRef.current?.reset();

			const timer = setTimeout(() => {
				setShowSuccess(false);
			}, 3000); // Hide after 3 seconds

			return () => clearTimeout(timer);
		}
	}, [state.success]);

	return (
		<form action={formAction} ref={formRef} className="space-y-4 max-w-md p-6">
			<label className="block">
				<span className="text-sm font-medium text-gray-700">Category Name</span>
				<input
					type="text"
					name="name"
					required
					placeholder="e.g. Frontend"
					className="
						mt-1 block w-full p-2
						bg-white/30 backdrop-blur-sm
						border border-gray-300 rounded
						placeholder-gray-400
						focus:outline-none focus:border-[#B8E0E2]
					"
				/>
			</label>

			{state.error && (
				<p className="text-sm text-red-600">{state.error}</p>
			)}

			<button
				type="submit"
				className="inline-block px-4 py-2 text-sm font-medium bg-[#00BFB3] hover:bg-[#00A69E] text-white rounded transition"
			>
				Create Category
			</button>

			{showSuccess && (
				<p  className="text-teal-700 font-medium">{state.success}</p>
			)}
		</form>
	);
}
