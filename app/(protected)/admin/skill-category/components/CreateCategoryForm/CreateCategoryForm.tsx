'use client';

import { useFormState } from 'react-dom';
import { createCategory } from '@/app/actions/category';

export default function CategoryForm() {
	const [state, formAction] = useFormState(createCategory, {});

	return (
		<form action={formAction} className="space-y-4 max-w-md p-6">
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
				className="
          inline-block px-4 py-2 text-sm font-medium
          bg-[#00BFB3] hover:bg-[#00A69E]
          text-white rounded transition
        "
			>
				Create Category
			</button>
		</form>
	);
}
