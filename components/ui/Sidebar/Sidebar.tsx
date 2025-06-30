'use client';

import { adminLinks, NavLink, userLinks } from '@/lib/routes';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Sidebar() {
	const { data: session } = useSession();
	const [collapsed, setCollapsed] = useState(true);
	const links: NavLink[] = session?.user.role === 'admin' ? adminLinks : userLinks;

	return (
		<aside className={
			`sticky top-0 h-screen p-4 transition-all duration-300 ${collapsed ? 'w-16' : 'w-64'}
      bg-[rgba(255,255,255,0.2)] backdrop-blur-md border-r border-[rgba(255,255,255,0.3)]`
		}>
			<div className="flex justify-end mb-6">
				<button onClick={() => setCollapsed(!collapsed)} className="text-white hover:text-opacity-80">
					{collapsed ? <ChevronRight /> : <ChevronLeft />}
				</button>
			</div>
			<nav className="flex flex-col gap-4">
				{links.map((link, idx) => {
					const Icon = link.icon;
					if (link.requiresAdmin && session?.user.role !== 'admin') return null;
					return (
						<Link
							key={idx}
							href={link.href}
							className={`flex items-center gap-2 p-2 rounded text-white hover:bg-[rgba(255,255,255,0.2)] transition ${collapsed ? 'justify-center' : ''}`}
						>
							<Icon className="w-5 h-5" />
							{!collapsed && <span>{link.text}</span>}
						</Link>
					);
				})}
			</nav>
		</aside>
	);
}