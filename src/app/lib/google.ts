import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export async function googleFetch(path: string, init?: RequestInit) {
  const session = await getServerSession(authOptions);
  if (!session || !(session as any).accessToken) {
    const err = new Error("Not authenticated or missing access token");
    (err as any).status = 401;
    throw err;
  }
  const res = await fetch(`https://${path}`, {
    ...init,
    headers: {
      ...(init?.headers || {}),
      Authorization: `Bearer ${(session as any).accessToken}`,
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Google API ${res.status}: ${body}`);
  }
  return res.json();
}
