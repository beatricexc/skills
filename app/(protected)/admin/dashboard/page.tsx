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
import { User, Brain, Layers, FileBarChart } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard/GlassCard';

export default function AdminDashboardPage() {
	const [stats, setStats] = useState({ users: 0, skills: 0, categories: 0 });
	const [topSkills, setTopSkills] = useState<{ skill: string; count: number }[]>([]);

	useEffect(() => {
		(async () => {
			const [summary, top] = await Promise.all([
				axios.get('/api/stats/summary'),
				axios.get('/api/stats/top-skills')
			]);
			setStats(summary.data);
			setTopSkills(top.data);
		})();
	}, []);

	return (
		<div className="min-h-[calc(100vh-4rem)] p-8">
			{/* Frosted-glass container */}
			<div className="relative z-10 w-full h-full
                      backdrop-blur-sm bg-[rgba(244,244,244,0.6)]
                      border border-[rgba(244,244,244,0.3)] rounded-2xl
                      p-4 sm:p-8 space-y-8">

				<h1 className="text-4xl font-bold text-[#234F8E]">Admin Dashboard</h1>

				{/* Metrics */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
					<GlassCard title="Total Users" icon={<User className="w-6 h-6 text-[#00BFB3]" />}>
						<p className="text-3xl font-bold text-[#00BFB3]">{stats.users}</p>
					</GlassCard>

					<GlassCard title="Skills Tracked" icon={<Brain className="w-6 h-6 text-[#00BFB3]" />}>
						<p className="text-3xl font-bold text-[#00BFB3]">{stats.skills}</p>
					</GlassCard>

					<GlassCard title="Categories" icon={<Layers className="w-6 h-6 text-[#00BFB3]" />}>
						<p className="text-3xl font-bold text-[#00BFB3]">{stats.categories}</p>
					</GlassCard>

					<GlassCard
						title="Survey Reports"
						icon={<FileBarChart className="w-6 h-6 text-[#F0B323]" />}
						link="/admin/export-tool"
						className="bg-[rgba(240,179,35,0.2)]"
					>
						<p className="text-3xl font-bold text-[#F0B323]">Export</p>
					</GlassCard>
				</div>

				{/* Content Grid */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
					{/* Chart (8/12) */}
					<div className="lg:col-span-8">
						<GlassCard title="Top 10 Skills by User Count">
							<div className="h-[350px] overflow-x-auto">
								<ResponsiveContainer width="100%" height="100%">
									<BarChart data={topSkills}>
										<defs>
											<linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
												<stop offset="0%" stopColor="#234F8E" />
												<stop offset="100%" stopColor="#6C579B" />
											</linearGradient>
										</defs>
										<XAxis dataKey="skill" interval={0} tickLine={false} />
										<YAxis />
										<Tooltip />
										<CartesianGrid stroke="rgba(255,255,255,0.2)" horizontal vertical={false} />
										<Bar dataKey="count" fill="url(#barGradient)" />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</GlassCard>
					</div>

					{/* Quick Actions (4/12) */}
					<div className="lg:col-span-4">
						<GlassCard
							title="Quick Actions"
							className="h-[350px] flex flex-col justify-center"
						>
							<div className="flex flex-col items-center space-y-4">
								<a href="/admin/skill-category" className="block w-full py-3 bg-[#00B5BE] rounded-xl text-white font-medium text-center">
									Manage Categories
								</a>
								<a href="/admin/users" className="block w-full py-3 bg-[#00CCFF] rounded-xl text-white font-medium text-center">
									Manage Users
								</a>
								<a href="/admin/export-tool" className="block w-full py-3 bg-[#F0B323] rounded-xl text-white font-medium text-center">
									Export Survey
								</a>
							</div>
						</GlassCard>
					</div>
				</div>
			</div>
		</div>
	);
}