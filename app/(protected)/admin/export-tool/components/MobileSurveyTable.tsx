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

export default function MobileSurveyCards({
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
		<div className="sm:hidden">
			<div className="space-y-4">
				{data.map((entry, idx) => (
					<div
						key={idx}
						className="rounded-2xl p-4
						 bg-[rgba(244,244,244,0.4)] backdrop-blur-sm
						 border border-[rgba(244,244,244,0.3)]
						 shadow-md space-y-2"
					>
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold text-[#234F8E]">📧 Email:</span>
							<span className="text-sm text-gray-800 break-all">{entry.email}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold text-[#234F8E]">💼 Skill:</span>
							<span className="text-sm text-gray-800">{entry.skill}</span>
						</div>
						<div className="flex items-center gap-2">
							<span className="text-sm font-semibold text-[#234F8E]">📈 Level:</span>
							<span className="text-sm text-gray-800">{entry.level}</span>
						</div>
					</div>
				))}
			</div>

			{totalPages > 1 && (
				<form
					onSubmit={onSubmitPageChange}
					className="flex flex-wrap justify-center items-center gap-3 mt-6"
				>
					<button
						type="button"
						onClick={onPrev}
						disabled={page === 1}
						className="px-3 py-1 text-sm rounded-xl
						 bg-[#00CCFF] hover:bg-[#00A3CC] text-white
						 disabled:opacity-50 transition"
					>
						Previous
					</button>

					<label htmlFor="pageInput" className="text-sm text-[#234F8E]">
						Page
					</label>
					<input
						id="pageInput"
						type="number"
						min={1}
						max={totalPages}
						value={inputPage}
						onChange={(e) => onInputPageChange(e.target.value)}
						className="w-16 px-2 py-1 text-sm rounded-xl
						 bg-[rgba(255,255,255,0.6)] backdrop-blur-sm
						 border border-[rgba(244,244,244,0.3)]
						 text-gray-800"
					/>

					<button
						type="submit"
						className="px-3 py-1 text-sm rounded-xl
						 bg-[#00CCFF] hover:bg-[#00A3CC] text-white
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
						 bg-[#00CCFF] hover:bg-[#00A3CC] text-white
						 disabled:opacity-50 transition"
					>
						Next
					</button>
				</form>
			)}
		</div>
	);
}
