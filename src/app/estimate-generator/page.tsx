import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import InvoiceTool from "@/components/InvoiceTool";
import { PROFESSIONS, BILLING_MODELS } from "@/lib/invoice";

export const metadata: Metadata = {
  title: "2026 Free Estimate & Quote Generator — Create a PDF Quote (No Sign-Up) (2026)",
  description: "Free 2026 estimate and quote generator for freelancers. Send professional quotes before starting work, save as PDF — no sign-up, no watermark.",
  alternates: { canonical: "https://invoicepad.net/estimate-generator" },
};

export default function EstimateGenerator() {
  const faq = [
    {
      q: "What's the difference between an estimate and an invoice?",
      a: "An estimate (or quote) is what you send before the work starts — it shows the client the expected cost so they can approve it. An invoice is what you request payment with once the work is done. The structure is nearly identical, so you can build your estimate here, get it approved, then reuse the line items as your invoice.",
    },
    {
      q: "Is this estimate generator free in 2026?",
      a: "Yes — completely free with no sign-up, no account and no watermark. Build your estimate, save it as a PDF, and share it with your client. We monetize through ads, not your data.",
    },
    {
      q: "Can I turn an approved estimate into an invoice?",
      a: "Yes. Because the line items are saved in your browser, you can open the generator again, edit the same details, change the title in your notes from 'Estimate' to 'Invoice', and save the final version once the client approves. No re-typing required.",
    },
    {
      q: "What should an estimate include?",
      a: "A professional estimate needs: a unique reference number, the date, an expiry date (typically 30 days), your business details, the client's details, a clear list of each deliverable or service with its estimated cost, any tax, the total, and a note that figures are estimates subject to change if scope changes. Add your payment terms so the client knows what to expect.",
    },
    {
      q: "What billing model should I use for estimates?",
      a: "Match the billing model to the project type. Use fixed-price estimates for defined-scope projects (logos, websites), hourly estimates for open-ended work (consulting, development), milestone-based estimates for phased projects, and retainer estimates for ongoing monthly work. The generator supports all four models.",
    },
    {
      q: "How long should an estimate be valid?",
      a: "Most freelancers set a 30-day expiry on estimates. This protects you if your costs or availability change, and it gives the client a deadline to decide. Put the expiry date prominently on the estimate. For urgent projects, 7-14 days is reasonable.",
    },
    {
      q: "Can I add tax to an estimate?",
      a: "Yes. If you know the tax rate that will apply, include it on the estimate so the client sees the full expected cost. InvoicePad supports US sales tax, UK VAT (20%), EU VAT by country, Australia GST (10%), and Canada GST/HST. The estimate should match what the final invoice will show.",
    },
  ];

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <div className="mx-auto max-w-5xl px-4 py-8">
        <nav className="text-xs text-slate-400">
          <Link href="/" className="hover:text-indigo-700">Home</Link>{" / "}
          <span className="text-slate-600">Estimate Generator</span>
        </nav>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">2026 Free Estimate &amp; Quote Generator</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Send clients a clear, professional estimate before you start — then reuse it as your invoice
          once it&apos;s approved. Free, no sign-up, no watermark. Supports all four billing models so
          you estimate the way you actually work.
        </p>

        <div className="mt-6">
          <InvoiceTool
            presetItems={[
              { description: "Project — estimated scope", qty: 1, rate: 1200 },
              { description: "Estimated revisions", qty: 2, rate: 100 },
            ]}
          />
        </div>

        <section className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-slate-900">How to write a project estimate in 2026</h2>
          <p className="mt-3 text-slate-600">
            A good estimate protects you from scope creep and protects the client from surprises. List
            each part of the project as its own line with a clear description and price, note that the
            figures are estimates that may change if scope changes, and add an expiry date so the quote
            isn&apos;t open forever. Once the client approves, you keep the same line items and turn it
            into your first invoice — no re-typing. Build yours above and save it as a PDF.
          </p>

          <h3 className="mt-6 text-lg font-bold text-slate-900">Estimate by billing model</h3>
          <div className="mt-3 grid gap-4 sm:grid-cols-2">
            {BILLING_MODELS.map((bm) => (
              <div key={bm.type} className="rounded-xl border border-slate-200 bg-white p-4 not-prose">
                <h4 className="font-semibold text-slate-800">{bm.label}</h4>
                <p className="mt-1 text-sm text-slate-600">{bm.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="mt-6 text-lg font-bold text-slate-900">Estimate pro tips for freelancers</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li>Always put an expiry date — open-ended quotes lose urgency.</li>
            <li>Include a note: &quot;Prices may change if the scope changes.&quot;</li>
            <li>Number your estimates (EST-0001) separately from invoices.</li>
            <li>For big projects, break the estimate into phases with milestones.</li>
            <li>Add tax even on estimates — the client should see the full anticipated cost.</li>
            <li>Save your estimates as PDFs so you have a record of what you quoted.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-4 space-y-4">
            {faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-800">{f.q}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-500">Invoice templates by profession</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {PROFESSIONS.slice(0, 10).map((p) => (
              <Link key={p.slug} href={`/invoice-template/${p.slug}`} className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:text-indigo-700">
                {p.emoji} {p.name}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
