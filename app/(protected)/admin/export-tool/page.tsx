'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import DesktopSurveyTable from './components/DesktopSurveyTable';
import MobileSurveyCards from './components/MobileSurveyTable';

export default function SurveyExportPage() {
	const [allData, setAllData] = useState<{ email: string; skill: string; level: number }[]>([]);
	const [page, setPage] = useState(1);
	const [inputPage, setInputPage] = useState('1');
	const pageSize = 16;

	useEffect(() => {
		axios.get('/api/export-tool').then(({ data }) => setAllData(data.data));
	}, []);

	const exportToCSV = () => {
		const csvRows = [
			['Email', 'Skill', 'Level'],
			...allData.map((r) => [r.email, r.skill, r.level.toString()]),
		];
		const blob = new Blob([csvRows.map((r) => r.join(',')).join('\n')], {
			type: 'text/csv;charset=utf-8;',
		});
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;

		const timestamp = new Date()
			.toLocaleString('en-GB', {
				year: 'numeric',
				month: '2-digit',
				day: '2-digit',
				hour: '2-digit',
				minute: '2-digit',
				second: '2-digit',
			})
			.replace(/[/:]/g, '-')
			.replace(/, /g, '_');

		link.setAttribute('download', `survey_export_${timestamp}.csv`);
		link.click();
	};

	const totalPages = Math.ceil(allData.length / pageSize);
	const paginatedData = allData.slice((page - 1) * pageSize, page * pageSize);

	const handlePageChange = (e: React.FormEvent) => {
		e.preventDefault();
		const p = parseInt(inputPage, 10);
		if (p >= 1 && p <= totalPages) setPage(p);
	};
	const handleNext = () => page < totalPages && setPage((p) => { setInputPage((p + 1).toString()); return p + 1; });
	const handlePrev = () => page > 1 && setPage((p) => { setInputPage((p - 1).toString()); return p - 1; });

	return (
		<div className="relative z-10 max-w-5xl mx-auto p-6
      backdrop-blur-sm bg-[rgba(244,244,244,0.6)]
      border border-[rgba(244,244,244,0.3)] rounded-2xl space-y-6"
		>
			<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
				<h1 className="text-2xl font-semibold text-[#234F8E]">Survey Export</h1>
				<button
					onClick={exportToCSV}
					className="px-4 py-2 text-sm font-medium
            bg-[#F0b323] hover:bg-[#00A3CC] text-white
            rounded-xl transition"
				>
					Export All to CSV
				</button>
			</div>

			<DesktopSurveyTable
				data={paginatedData}
				page={page}
				totalPages={totalPages}
				inputPage={inputPage}
				onInputPageChange={setInputPage}
				onSubmitPageChange={handlePageChange}
				onNext={handleNext}
				onPrev={handlePrev}
			/>

			<MobileSurveyCards
				data={paginatedData}
				page={page}
				totalPages={totalPages}
				inputPage={inputPage}
				onInputPageChange={setInputPage}
				onSubmitPageChange={handlePageChange}
				onNext={handleNext}
				onPrev={handlePrev}
			/>
		</div>
	);
}
