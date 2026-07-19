import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { PROFESSIONS } from "@/lib/invoice";

export const metadata: Metadata = {
  title: "2026 Free Invoice Templates by Profession — 20+ Freelance Templates (2026)",
  description: "Free 2026 invoice templates for 20+ freelancer professions: designers, developers, writers, photographers, consultants, tutors and more.",
  alternates: { canonical: "https://invoicepad.net/invoice-templates" },
};

export default function TemplatesIndex() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Free Invoice Templates by Profession</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Every line of work bills a little differently. Pick your profession for a tailored invoice
          template — the right line items, the usual billing model and payment terms — then create a
          professional PDF in the generator. Free, no sign-up, no watermark.
        </p>

        <section className="mt-8 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <h2 className="text-lg font-bold text-slate-900">Popular invoice templates</h2>
          <p className="mt-1 text-sm text-slate-600">Start with the templates people are already searching for, then open the generator and save a clean PDF.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Link href="/seo-service-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">SEO service invoice template</Link>
            <Link href="/web-developer-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">Web developer invoice template</Link>
            <Link href="/freelance-writer-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">Freelance writer invoice template</Link>
            <Link href="/handyman-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">Handyman invoice template</Link>
            <Link href="/freelancer-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">Freelancer invoice template</Link>
            <Link href="/consultant-invoice-template/" className="rounded-xl border border-indigo-100 bg-white p-4 text-sm font-semibold text-indigo-800 hover:border-indigo-300">Consultant invoice template</Link>
          </div>
        </section>

        <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
          {PROFESSIONS.map((p) => (
            <Link
              key={p.slug}
              href={`/invoice-template/${p.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-4 hover:border-indigo-300"
            >
              <p className="font-bold text-slate-800">
                <span className="mr-1">{p.emoji}</span>
                {p.name}
              </p>
              <p className="mt-1 text-sm text-slate-600">{p.blurb}</p>
              <p className="mt-1 text-xs text-slate-400">Bills: {p.billing}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-wrap gap-3 text-sm">
          <Link href="/" className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700">Open invoice generator →</Link>
          <Link href="/receipt-maker" className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:border-indigo-300">Receipt maker</Link>
          <Link href="/estimate-generator" className="rounded-lg border border-slate-200 px-4 py-2 text-slate-700 hover:border-indigo-300">Estimate generator</Link>
        </div>
      </div>
    </SiteShell>
  );
}
