import { authOptions } from "@/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";


export default async function Page() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login'); // ✅ force login
  }

  if (session.user.role === 'admin') {
    redirect('/admin/dashboard');
  } 

  if (session.user.role === 'user') {
    redirect('/user/survey');
  }

  return <div>&nbsp;</div>
}
