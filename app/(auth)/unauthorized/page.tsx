// app/unauthorized/page.tsx

import Link from 'next/link';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded shadow">
        <h1 className="text-3xl font-bold text-red-600 mb-4">403 - Unauthorized</h1>
        <p className="text-gray-700 mb-6">
          You don’t have permission to access this page.
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/">
            <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
              Go Home
            </button>
          </Link>
          <Link href="/api/auth/signin">
            <button className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400">
              Log In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
