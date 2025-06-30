import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";


export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'database', // ✅ use database session with Prisma
  },
  secret: process.env.NEXTAUTH_SECRET, // ✅ must be set in .env
  debug: process.env.NODE_ENV !== 'production', // optional
  pages: {
    signIn: '/login'
  },
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: 'openid profile email',
        },
    
      },
    }),
  ],

  callbacks: {
    async session({ session }) {
      if (!session.user?.email) return session;

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      }

      return session;
    },
  },
};