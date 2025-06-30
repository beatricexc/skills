interface Props {
	data: { email: string; skill: string; level: number }[];
	page: number;
	totalPages: number;
	inputPage: string;
	onInputPageChange: (val: string) => void;
	onSubmitPageChange: (e: React.FormEvent) => void;
	onNext: () => void;
	onPrev: () => void;
}

export default function DesktopSurveyTable({
	data,
	page,
	totalPages,
	inputPage,
	onInputPageChange,
	onSubmitPageChange,
	onNext,
	onPrev,
}: Props) {
	return (
		<div className="hidden sm:block">
			{/* Table container */}
			<div className="overflow-x-auto border border-[rgba(244,244,244,0.3)] rounded-2xl shadow-md bg-[rgba(244,244,244,0.4)] backdrop-blur-sm">
				<table className="min-w-full text-sm">
					<thead>
						<tr className="bg-[rgba(255,255,255,0.6)]">
							<th className="px-4 py-3 text-left text-[#234F8E]">Email</th>
							<th className="px-4 py-3 text-left text-[#234F8E]">Skill</th>
							<th className="px-4 py-3 text-left text-[#234F8E]">Level</th>
						</tr>
					</thead>
					<tbody>
						{data.map((entry, idx) => (
							<tr key={idx} className="border-t border-[rgba(255,255,255,0.2)] hover:bg-[rgba(255,255,255,0.2)]">
								<td className="px-4 py-2 break-words">{entry.email}</td>
								<td className="px-4 py-2">{entry.skill}</td>
								<td className="px-4 py-2">{entry.level}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Pagination controls */}
			<form
				onSubmit={onSubmitPageChange}
				className="flex justify-center items-center gap-3 mt-4"
			>
				<button
					type="button"
					onClick={onPrev}
					disabled={page === 1}
					className="px-3 py-1 text-sm rounded-xl
			  bg-[#F0b323] hover:bg-[#00A3CC] text-white
			  disabled:opacity-50 transition"
				>
					Previous
				</button>

				<label htmlFor="desktopPageInput" className="text-sm text-[#234F8E]">
					Page
				</label>
				<input
					id="desktopPageInput"
					type="number"
					min={1}
					max={totalPages}
					value={inputPage}
					onChange={(e) => onInputPageChange(e.target.value)}
					className="w-16 px-2 py-1 text-sm rounded-xl
			  border border-[rgba(244,244,244,0.3)]
			  bg-[rgba(255,255,255,0.6)] backdrop-blur-sm
			  text-gray-800"
				/>

				<button
					type="submit"
					className="px-3 py-1 text-sm rounded-xl
			  bg-[#F0b323] hover:bg-[#00A3CC] text-white
			  transition"
				>
					Go
				</button>

				<span className="text-sm text-gray-500">/ {totalPages}</span>

				<button
					type="button"
					onClick={onNext}
					disabled={page === totalPages}
					className="px-3 py-1 text-sm rounded-xl
			  bg-[#F0B323] hover:bg-[#00A3CC] text-white
			  disabled:opacity-50 transition"
				>
					Next
				</button>
			</form>
		</div>
	);
}
