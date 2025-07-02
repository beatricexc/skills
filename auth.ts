import AzureADProvider from "next-auth/providers/azure-ad";
import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),

  session: {
    strategy: "database", // Use Prisma-backed sessions
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: true, // 🔍 Enable debug logging always

  pages: {
    signIn: "/login",
  },

  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENT_ID!,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET!,
      tenantId: process.env.AZURE_AD_TENANT_ID!,
      authorization: {
        params: {
          scope: "openid profile email",
        },
      },
      profile(profile) {
        console.log(" AzureAD profile received:", profile);

        const email = profile.email ?? profile.preferred_username ?? null;

        return {
          id: profile.sub,
          name: profile.name,
          email,
          image: profile.picture ?? null,
        };
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      console.log("🔑 signIn callback triggered:", {
        user,
        account,
        profile,
      });
      return true; // Allow all sign-ins unless explicitly blocked
    },

    async session({ session }) {
      if (!session.user?.email) {
        console.warn("⚠️ Session started without user email");
        return session;
      }

      const dbUser = await prisma.user.findUnique({
        where: { email: session.user.email },
      });

      if (dbUser) {
        session.user.id = dbUser.id;
        session.user.role = dbUser.role;
      } else {
        console.warn("⚠️ No user found in DB for email:", session.user.email);
      }

      return session;
    },
  },
};