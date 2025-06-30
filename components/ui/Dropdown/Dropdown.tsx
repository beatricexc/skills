'use client';

import { signOut, useSession } from 'next-auth/react';

export default function Dropdown() {
  const { data: session } = useSession();
  const name = session?.user?.name || 'User';
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="flex items-center gap-4">
      {/* Avatar purely for display */}
      <div
        className="
          w-10 h-10
          flex items-center justify-center
          rounded-full
          bg-white/40
          ring-2 ring-white/30
          backdrop-blur-sm
          text-[#234F8E] font-semibold text-lg
        "
        aria-hidden="true"
      >
        {initial}
      </div>

      {/* Sign out link */}
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
  );
}
