
import { User } from '@prisma/client';
import Link from 'next/link';


export default function UserList({ users }: { users: User[] }) {
  if (users.length === 0) {
    return <p className="text-gray-500">No users found.</p>;
  }

  return (
    <div className='min-h-80'>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="h-full p-4 rounded shadow-sm hover:shadow-md transition"
          >
            <div>
              <p className="font-semibold mb-2">{user.name || 'Unnamed User'}</p>
              <p className="text-md text-black break-all">{user.email}</p>
              <p className="text-md  text-[#234F8E] capitalize">Role: <span className="italic">{user.role}</span></p>
            </div>
            <Link
              href={`/admin/users/${user.id}`}
              className=" text-[#234F8E] font-bold text-md underline hover:text-blue-800"
            >
              View Skills →
            </Link>
          </div>
        ))}
      </div>
    </div>

  );
}