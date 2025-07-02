import { prisma } from '@/lib/prisma';
import { updateRole } from '@/app/actions/user'; import Link from 'next/link';


export const dynamic = 'force-dynamic';
export default async function UsersPage({
  searchParams,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
}: any) {
  const page = Number(searchParams.page ?? 1);
  const pageSize = 14;

  const [users, totalUsers] = await Promise.all([
    prisma.user.findMany({
      skip: (page - 1) * pageSize,
      take: pageSize,
      orderBy: { name: 'asc' },
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalUsers / pageSize);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 space-y-6
          bg-gradient-to-br 
          from-white/30        /* White at 30% opacity, top-left */
          to-[#c6d8e5]/60         /* White at 20% opacity */
          backdrop-blur-sm
          border border-[rgba(244,244,244,0.3)]
          rounded-xl
          ">
      <h1 className="text-2xl font-bold text-[#234F8E]">Manage Users</h1>

      <div className="overflow-x-auto">
        <table className="w-full text-left min-w-[600px]">
          <thead>
            <tr className="text-[#234F8E] border-b-2 border-b-blue-200">
              <th className="py-6">Name</th>
              <th>Email</th>
              <th>Role</th>
              <th className="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className=" border-b border-b-blue-200">
                <td className="py-4">{user.name ?? '—'}</td>
                <td className="break-words">{user.email ?? '—'}</td>
                <td className="capitalize">{user.role}</td>
                <td className="text-right">
                  <form action={updateRole} className="inline-block">
                    <input type="hidden" name="userId" value={user.id} />
                    <input
                      type="hidden"
                      name="newRole"
                      value={user.role === 'admin' ? 'user' : 'admin'}
                    />
                    <button
                      type="submit"
                      className="
                          px-4 py-2 text-white font-medium text-sm
                          bg-[#00CCFF] hover:bg-[#0089ab]
                          rounded-xl transition"
                    >
                      Make {user.role === 'admin' ? 'User' : 'Admin'}
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }, (_, i) => {
          const current = i + 1 === page;
          return (
            <Link
              key={i}
              href={`?page=${i + 1}`}
              className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  ${current
                  ? 'bg-[#00CCFF] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100'}
                `}
            >
              {i + 1}
            </Link>
          );
        })}
      </div>
    </div>

  );
}