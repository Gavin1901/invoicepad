import type { Metadata } from "next";
import Link from "next/link";
import { competitors } from "./_data";

export const metadata: Metadata = {
  title: "Free vs Paid Alternatives — InvoicePad",
  description: "Compare InvoicePad against paid alternatives. See what you get for free vs what competitors charge for.",
  alternates: { canonical: "https://invoicepad.net/vs/" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-16">
      <h1 className="text-3xl font-bold leading-tight">Free vs Paid: InvoicePad Alternatives</h1>
      <p className="mt-3 text-lg text-zinc-500">Side-by-side comparison of InvoicePad (free) against paid competitors. No sign-up required.</p>
      <div className="mt-8 space-y-6">
        {competitors.map((c) => (
          <Link
            key={c.slug}
            prefetch={false}
            href={`/vs/${c.slug}/`}
            className="block rounded-xl border border-zinc-200 bg-white p-5 shadow-sm hover:border-indigo-300 hover:shadow-md transition"
          >
            <h2 className="text-lg font-semibold text-indigo-700">{c.title}</h2>
            <p className="mt-1 text-sm text-zinc-500">{c.description}</p>
            <span className="mt-2 inline-block text-xs font-medium text-indigo-500">Read comparison →</span>
          </Link>
        ))}
      </div>
    </main>
  );
}