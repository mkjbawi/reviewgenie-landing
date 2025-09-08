import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import type { NextAuthOptions, Account, Profile, Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { prisma } from "../lib/prisma";

const GOOGLE_SCOPE =
  "openid email profile https://www.googleapis.com/auth/business.manage";

// ---- Type augmentation
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    accessTokenExpires?: number;
    error?: "RefreshAccessTokenError";
    user?: (User & { id?: string }) | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    userId?: string;
    accessToken?: string;
    refreshToken?: string;
    accessTokenExpires?: number; // epoch ms
    error?: "RefreshAccessTokenError";
  }
}

type TokenWithGoogle = JWT & {
  refreshToken?: string;
  accessToken?: string;
  accessTokenExpires?: number;
  error?: "RefreshAccessTokenError";
};

async function refreshGoogleAccessToken(token: TokenWithGoogle): Promise<TokenWithGoogle> {
  try {
    if (!token.refreshToken) return { ...token, error: "RefreshAccessTokenError" };

    const params = new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID ?? "",
      client_secret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      grant_type: "refresh_token",
      refresh_token: token.refreshToken,
    });

    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    const raw: unknown = await res.json();
    if (!res.ok || typeof raw !== "object" || raw === null) {
      throw new Error("Failed to refresh token");
    }

    const data = raw as {
      access_token?: string;
      expires_in?: number;
      refresh_token?: string;
    };

    if (!data.access_token || typeof data.expires_in !== "number") {
      throw new Error("Invalid token response");
    }

    return {
      ...token,
      accessToken: data.access_token,
      accessTokenExpires: Date.now() + data.expires_in * 1000,
      refreshToken: data.refresh_token ?? token.refreshToken,
      error: undefined,
    };
  } catch (e) {
    // eslint-disable-next-line no-console
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: { scope: GOOGLE_SCOPE, access_type: "offline", prompt: "consent" },
      },
    }),
  ],
  callbacks: {
    async jwt({
  token,
  account,
  user,
  profile: _profile, // <- underscore
}: {
  token: JWT;
  account?: Account | null;
  user?: User | null;
  profile?: Profile | null;
}): Promise<JWT> {
      // Initial sign-in: persist provider tokens
      if (account && user) {
        const acc = account as Account & {
          access_token?: string;
          refresh_token?: string;
          expires_at?: number;
        };

        return {
          ...token,
          userId: user.id,
          accessToken: acc.access_token,
          refreshToken: acc.refresh_token ?? (token as JWT).refreshToken,
          accessTokenExpires: acc.expires_at ? acc.expires_at * 1000 : (token as JWT).accessTokenExpires,
        };
      }

      const t = token as TokenWithGoogle;

      // If token is still valid, return it
      if (t.accessToken && typeof t.accessTokenExpires === "number" && Date.now() < t.accessTokenExpires) {
        return token;
      }

      // Otherwise try to refresh
      if (t.refreshToken) {
        return await refreshGoogleAccessToken(t);
      }

      return token;
    },

    async session({
      session,
      token,
    }: {
      session: Session;
      token: JWT;
    }): Promise<Session> {
      const t = token as TokenWithGoogle;

      if (session.user && t.userId) {
        // assign only when defined; id is optional in augmentation
        (session.user as Partial<User> & { id?: string }).id = t.userId;
      }

      session.accessToken = t.accessToken;
      session.accessTokenExpires = t.accessTokenExpires;
      session.error = t.error;

      return session;
    },
  },
};
