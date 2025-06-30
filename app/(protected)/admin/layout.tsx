'use client';

import React from 'react';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import Sidebar from '@/components/ui/Sidebar/Sidebar';
import FrostyLogo from '@/components/ui/FrostyLogo/FrostyLogo';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen">
      {/* Full-page brain background with heavy blur */}
      <img
        src="/brain_skills.jpg"
        alt="Brain background"
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110"
      />

      {/* overlay to tone down/brighten */}
      <div className="absolute inset-0 bg-black/10" />

      {/* content sits on top */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full border-b-2 border-violet-200">
          <div className="container mx-auto px-8 flex justify-between items-center py-6">
            <FrostyLogo className="animate-frost-wave" />
            <Dropdown />
          </div>
        </header>

        {/* Sidebar + Main */}
        <div className="flex flex-1">
          <Sidebar />
          <main className="flex-1 container mx-auto px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
