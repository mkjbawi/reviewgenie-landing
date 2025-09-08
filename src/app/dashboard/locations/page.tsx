import Link from "next/link";
// import { cookies as _cookies } from "next/headers"; // intentionally unused

export const dynamic = "force-dynamic";

type StorefrontAddress = {
  addressLines?: string[];
  locality?: string;
  administrativeArea?: string;
  postalCode?: string;
  regionCode?: string;
};

type PhoneNumbers = {
  primaryPhone?: string;
};

export type GoogleLocation = {
  name: string; // e.g. "locations/111"
  title?: string;
  storefrontAddress?: StorefrontAddress;
  phoneNumbers?: PhoneNumbers;
  websiteUri?: string;
  storeCode?: string;
};

type LocationsResponse =
  | { error: string }
  | { accounts?: Array<{ name: string; accountName?: string }>; locations: GoogleLocation[] };

async function getLocations(): Promise<LocationsResponse> {
  const res = await fetch("/api/google/locations", {
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to load locations: ${res.status} ${text}`);
  }
  return (await res.json()) as LocationsResponse;
}

export default async function LocationsPage() {
  const data = await getLocations();

  if ("error" in data) {
    return (
      <main className="py-10">
        <h2 className="text-2xl font-semibold mb-4">Locations</h2>
        <p className="text-red-400 text-sm mb-4">Error: {data.error}</p>
        <Link className="underline" href="/dashboard">
          Back
        </Link>
      </main>
    );
  }

  const locations = data.locations ?? [];

  return (
    <main className="py-10 space-y-6">
      <h2 className="text-2xl font-semibold">Locations</h2>
      {locations.length === 0 ? (
        <p className="text-neutral-300">No locations found for your account.</p>
      ) : (
        <ul className="space-y-3">
          {locations.map((loc) => (
            <li key={loc.name} className="rounded-xl border border-neutral-800 p-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-medium">{loc.title ?? "Untitled Location"}</h3>
                  <p className="text-sm text-neutral-400">
                    {loc.storefrontAddress
                      ? [
                          loc.storefrontAddress.addressLines?.join(", "),
                          loc.storefrontAddress.locality,
                          loc.storefrontAddress.administrativeArea,
                          loc.storefrontAddress.postalCode,
                          loc.storefrontAddress.regionCode,
                        ]
                          .filter(Boolean)
                          .join(", ")
                      : "No address"}
                  </p>
                  {loc.phoneNumbers?.primaryPhone && (
                    <p className="text-sm text-neutral-400">{loc.phoneNumbers.primaryPhone}</p>
                  )}
                </div>
                {loc.websiteUri && (
                  <a
                    className="text-sm underline underline-offset-4"
                    href={loc.websiteUri}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Website
                  </a>
                )}
              </div>
              <p className="mt-2 text-xs text-neutral-500">
                {loc.name} {loc.storeCode ? `• Store code: ${loc.storeCode}` : ""}
              </p>
            </li>
          ))}
        </ul>
      )}
      <Link className="underline" href="/dashboard">
        Back
      </Link>
    </main>
  );
}
