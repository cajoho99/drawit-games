import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

// Prisma adapter for NextAuth, optional and can be removed
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "../../../server/db/client";
import { env } from "../../../env/server.mjs";
import { GammaProvider } from "next-auth-gamma-provider/lib/gamma-provider";

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  adapter: PrismaAdapter(prisma),
  providers: [
    GammaProvider({
      clientId: env.GAMMA_ID,
      clientSecret: env.GAMMA_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
