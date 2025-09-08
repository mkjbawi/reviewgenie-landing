
export type GoogleFetchInit = Omit<RequestInit, "headers"> & {
  accessToken?: string;
  headers?: Record<string, string>;
};

/**
 * Fetch Google APIs with optional bearer token.
 * Returns `unknown`; call sites should narrow/assert.
 */
export async function googleFetch(path: string, init?: GoogleFetchInit): Promise<unknown> {
  const url = path.startsWith("http") ? path : `https://${path}`;
  const { accessToken, headers, ...rest } = init ?? {};

  const res = await fetch(url, {
    ...rest,
    headers: {
      ...(headers ?? {}),
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
  });

  const contentType = res.headers.get("content-type") ?? "";
  const body: unknown = contentType.includes("application/json")
    ? await res.json()
    : await res.text();

  if (!res.ok) {
    const msg = typeof body === "string" ? body : JSON.stringify(body);
    throw new Error(msg || `HTTP ${res.status}`);
  }

  return body;
}

