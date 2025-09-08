import { getServerSession } from "next-auth";
import { authOptions } from "../lib/authOptions";
import Link from "next/link";

export default async function Dashboard() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return (
      <main className="py-24 text-center">
        <p>You are not signed in.</p>
        <Link className="underline" href="/">Go to sign in</Link>
      </main>
    );
  }

  return (
    <main className="py-10 space-y-6">
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <div className="rounded-xl border border-neutral-800 p-4">
        <h3 className="font-medium mb-2">Google Auth Status</h3>
        <ul className="text-sm text-neutral-300 space-y-1">
          <li>Access token: {(session as any).accessToken ? "✅ present" : "❌ missing"}</li>
          <li>business.manage scope requested: ✅</li>
        </ul>
      </div>
      <div>
        <a
          className="inline-block rounded-lg border border-neutral-700 px-4 py-2 text-sm hover:bg-neutral-900"
          href="/dashboard/locations"
        >
          View Locations
        </a>
      </div>
    </main>
  );
}
