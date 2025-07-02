'use client';

import React from 'react';
import FrostyLogo from '@/components/ui/FrostyLogo/FrostyLogo';
import { signOut, useSession } from 'next-auth/react';
import Link from 'next/link';

interface UserLayoutProps {
  children: React.ReactNode;
}

export default function UserLayout({ children }: UserLayoutProps) {
  const { data: session } = useSession();
  const name = session?.user?.name || 'User';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="relative min-h-screen">
      {/* Full-page blurred brain background */}
      <img
        src="/brain_skills.jpg"
        alt="Background graphic"
        className="absolute inset-0 w-full h-full object-cover filter blur-3xl scale-110"
      />

      {/* subtle overlay for contrast */}
      <div className="absolute inset-0 bg-black/10" />

      {/* content wrapper */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full border-b border-[rgba(244,244,244,0.3)]">
          <div className="container mx-auto px-8 flex justify-between items-center py-6">
            {/* Logo */}
            <Link href="/"><FrostyLogo className="animate-frost-wave" /></Link>
         

            {/* User avatar + sign out */}
            <div className="flex items-center gap-4">
              <div
                className="
                  w-10 h-10
                  flex items-center justify-center
                  rounded-full
                  bg-white/40
                  ring-2 ring-white/30
                  backdrop-blur-sm
                  text-[#234F8E]
                  font-semibold text-lg
                "
              >
                {initial}
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="
                  text-sm font-medium
                  text-[#234F8E]
                  hover:text-[#00BFB3]
                  transition
                "
              >
                Sign out
              </button>
            </div>
          </div>
        </header>

        {/* Main content */}
        <main className="flex-1 container mx-auto px-8 py-8">
          {children}
        </main>
      </div>
    </div>
  );
}
