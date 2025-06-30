'use client';

import { signIn } from 'next-auth/react';

export default function LoginPage() {
    return (
      <div>
        <div
            className="min-h-screen bg-cover bg-center flex items-center justify-center"
            style={{ backgroundImage: 'url(/brain_skills.jpg)' }}
        >
          <div className="bg-white/60 p-8 rounded shadow max-w-sm w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Sign In</h1>
            <button
              onClick={() => signIn('azure-ad', { callbackUrl: '/' })}
              className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              Sign in with Microsoft
            </button>
          </div>
        </div>

      </div>
    );
}
