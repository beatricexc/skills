'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	CartesianGrid
} from 'recharts';
import { GlassCard } from '@/components/ui/GlassCard/GlassCard';

interface SkillStat {
	skill: string;
	category: string;
	count: number;
	avgLevel: string;
}

export default function SkillStatsPage() {
	const [stats, setStats] = useState<SkillStat[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const [showAll, setShowAll] = useState(false);
	const [filter, setFilter] = useState('');

	useEffect(() => {
		(async () => {
			try {
				const res = await axios.get('/api/stats/skills');
				setStats(res.data.skillStats);
			} catch {
				setError('Failed to fetch skill stats');
			} finally {
				setLoading(false);
			}
		})();
	}, []);

	if (loading) return <p className="text-center p-4">Loading...</p>;
	if (error) return <p className="text-center text-red-500 p-4">{error}</p>;

	const filtered = filter
		? stats.filter((s) => s.category === filter)
		: stats;
	const sorted = [...filtered].sort((a, b) => b.count - a.count);
	const display = showAll ? sorted : sorted.slice(0, 10);

	// shared GlassCard style from AdminDashboardPage:
	const glassStyle =
		'backdrop-blur-sm bg-[rgba(244,244,244,0.6)] border border-[rgba(244,244,244,0.3)] rounded-2xl p-4 sm:p-8 space-y-6';

	return (
		<div className="min-h-[calc(100vh-4rem)] p-8">
			<GlassCard className={glassStyle}>
				{/* Page title */}
				<h1 className="text-4xl font-bold text-[#234F8E]">
					User Skill Statistics
				</h1>

				{/* Filter Controls */}
				<div className="flex flex-wrap items-center gap-4">
					<label className="text-sm font-medium text-[#234F8E]">
						Category:
					</label>

					<select
						value={filter}
						onChange={(e) => setFilter(e.target.value)}
						className="backdrop-blur-sm bg-white/30 border border-white/50 rounded-2xl py-2 px-4 text-sm text-[#234F8E] focus:outline-none focus:ring-2 focus:ring-[#234F8E]/50 transition"
					>
						<option value="">All</option>
						{Array.from(new Set(stats.map((s) => s.category))).map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</select>

					{stats.length > 10 && (
						<button
							onClick={() => setShowAll(!showAll)}
							className="py-2 px-4 bg-[#00BFB3]/80 hover:bg-[#00BFB3] text-white font-medium rounded-2xl text-sm transition"
						>
							{showAll ? 'Show Top 10' : 'Show All'}
						</button>
					)}
				</div>


				{/* Chart Section */}
				<GlassCard title="Users per Skill" className={glassStyle}>
					<div className="h-64 overflow-x-auto">
						<ResponsiveContainer width="100%" height="100%">
							<BarChart data={display}>
								<defs>
									<linearGradient id="skillBarGrad" x1="0" y1="0" x2="0" y2="1">
										<stop offset="0%" stopColor="#6C579B" />
										<stop offset="100%" stopColor="#234F8E" />
									</linearGradient>
								</defs>
								<XAxis dataKey="skill" tickLine={false} />
								<YAxis />
								<Tooltip
									cursor={{ fill: 'rgba(0,0,0,0.1)' }}
									contentStyle={{ backgroundColor: 'rgba(255,255,255,0.9)' }}
								/>
								<CartesianGrid
									stroke="rgba(255,255,255,0.4)"
									strokeDasharray="3 3"
								/>
								<Bar
									dataKey="count"
									fill="url(#skillBarGrad)"
									barSize={40}
									radius={[4, 4, 0, 0]}
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</GlassCard>

				{/* Table Section */}
				<GlassCard title="Skill Details" className={glassStyle}>
					<div className="overflow-x-auto">
						<table className="min-w-full text-left text-sm">
							<thead className="bg-gray-100">
								<tr>
									<th className="p-2">Skill</th>
									<th className="p-2">Category</th>
									<th className="p-2">Users</th>
									<th className="p-2">Avg. Level</th>
								</tr>
							</thead>
							<tbody>
								{display.map((s) => (
									<tr key={s.skill} className="border-t">
										<td className="p-2">{s.skill}</td>
										<td className="p-2">{s.category}</td>
										<td className="p-2">{s.count}</td>
										<td className="p-2">{s.avgLevel}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</GlassCard>
			</GlassCard>
		</div>
	);
}
