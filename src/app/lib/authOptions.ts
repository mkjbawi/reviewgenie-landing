import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "../lib/prisma";

const GOOGLE_SCOPE =
  "openid email profile https://www.googleapis.com/auth/business.manage";

async function refreshGoogleAccessToken(token: any) {
  try {
    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const data = await res.json();
    if (!res.ok) throw data;

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
    };
  } catch (e) {
    console.error("Error refreshing access token", e);
    return { ...token, error: "RefreshAccessTokenError" as const };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: { scope: GOOGLE_SCOPE, access_type: "offline", prompt: "consent" },
      },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && user) {
        return {
          ...token,
          userId: user.id,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          accessTokenExpires: account.expires_at ? account.expires_at * 1000 : undefined,
        };
      }
      // AFTER (safe narrowing)
const expires = (token as any).accessTokenExpires;
if ((token as any).accessToken && typeof expires === "number" && Date.now() < expires) {
  return token;
}

      if (token.refreshToken) return await refreshGoogleAccessToken(token);
      return token;
    },
    async session({ session, token }) {
      if (token?.userId) (session.user as any).id = token.userId;
      (session as any).accessToken = (token as any).accessToken;
      (session as any).accessTokenExpires = (token as any).accessTokenExpires;
      (session as any).error = (token as any).error;
      return session;
    },
  },
};
