import NextAuth from 'next-auth';
import { authOptions } from '@/auth'; // path to your auth config

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };