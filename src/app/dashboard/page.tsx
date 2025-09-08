type DashboardStat = { title: string; value: number; subtext?: string };

async function getStats(): Promise<DashboardStat[]> {
  // Replace with your real endpoint or data source
  const res = await fetch("/api/stats", { cache: "no-store" });
  const json: unknown = await res.json();

  if (!Array.isArray(json)) return [];
  // Narrow unknown -> DashboardStat[]
  return json.filter((x): x is DashboardStat => {
    return (
      typeof x === "object" &&
      x !== null &&
      typeof (x as Record<string, unknown>).title === "string" &&
      typeof (x as Record<string, unknown>).value === "number" &&
      // subtext is optional if present
      (typeof (x as Record<string, unknown>).subtext === "string" ||
        typeof (x as Record<string, unknown>).subtext === "undefined")
    );
  });
}

export default async function DashboardPage({
  searchParams,
}: {
  searchParams?: Record<string, string | string[]>;
}) {
  const stats = await getStats().catch(() => []);

  return (
    <main className="py-10 space-y-4">
      <h2 className="text-2xl font-semibold">Dashboard</h2>

      {stats.length === 0 ? (
        <p className="text-neutral-400 text-sm">No stats yet.</p>
      ) : (
        <ul className="grid md:grid-cols-3 gap-3">
          {stats.map((s) => (
            <li key={s.title} className="rounded-xl border border-neutral-800 p-4">
              <div className="text-lg font-medium">{s.value}</div>
              <div className="text-sm text-neutral-300">{s.title}</div>
              {s.subtext && <div className="text-xs text-neutral-500">{s.subtext}</div>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}