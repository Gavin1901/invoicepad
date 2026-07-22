import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SiteShell from "@/components/SiteShell";
import {
  PROFESSIONS,
  PROFESSION_SLUGS,
  professionBySlug,
  formatMoney,
  subtotal,
  lineTotal,
} from "@/lib/invoice";

export function generateStaticParams() {
  return PROFESSION_SLUGS.map((profession) => ({ profession }));
}

type Props = { params: Promise<{ profession: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profession } = await params;
  const p = professionBySlug(profession);
  if (!p) return {};
  const title = `${p.name} Invoice Template — Free PDF Generator`;
  const url = `https://invoicepad.net/invoice-template/${p.slug}`;
  return {
    title,
    description: `Free 2026 invoice template and generator for ${p.plural}. See typical ${p.name.toLowerCase()} rates, invoicing tips, sample line items, and ${p.billing.toLowerCase()} billing. Create a professional PDF in minutes — no sign-up, no watermark, private.`,
    alternates: { canonical: url },
    openGraph: { title, url, type: "article" },
  };
}

export default async function Page({ params }: Props) {
  const { profession } = await params;
  const p = professionBySlug(profession);
  if (!p) notFound();

  const sampleSub = subtotal(p.sampleItems);
  const others = PROFESSIONS.filter((x) => x.slug !== p.slug).slice(0, 8);

  // 扩展FAQ到6-8条
  const faq = [
    {
      q: `What should a ${p.name.toLowerCase()} invoice include?`,
      a: `A ${p.name.toLowerCase()} invoice should include your business details, the client's details, a unique invoice number, the date and due date, an itemized list of services, the subtotal, any tax, and a clear total. ${p.tips[0]} ${p.rateNote}`,
    },
    {
      q: `How do ${p.plural} usually charge clients in 2026?`,
      a: `${p.plural.charAt(0).toUpperCase() + p.plural.slice(1)} most commonly bill on a "${p.billing.toLowerCase()}" basis. ${p.rateNote} Choosing the right billing model avoids disputes — fixed-price for defined scope, hourly for open-ended work, retainer for recurring engagements.`,
    },
    {
      q: `What payment terms should a ${p.name.toLowerCase()} use?`,
      a: `A common arrangement is: ${p.terms} Always put the due date and payment instructions on the invoice so there's no confusion. Late payment penalties (1.5% monthly interest) are standard in many industries.`,
    },
    {
      q: `Is this ${p.name.toLowerCase()} invoice template free in 2026?`,
      a: `Yes — it's completely free with no sign-up and no watermark. Use the generator above to fill in your details and save a professional PDF. Your data stays in your browser and is never uploaded. We monetize through ads, not your data.`,
    },
    {
      q: `Can I add tax to my ${p.name.toLowerCase()} invoice?`,
      a: `Yes. InvoicePad supports US sales tax, UK VAT (20%), EU VAT by country, Australia GST (10%), and Canada GST/HST by province. Just pick your tax country in the generator and the correct rate is pre-filled. Add your EIN, VAT number, ABN or BN for compliance.`,
    },
    {
      q: `Should ${p.plural} charge a deposit?`,
      a: `Yes — most ${p.plural} should charge 30-50% upfront for new clients, especially on projects over $1,000. A deposit filters serious clients, covers initial work, and aligns incentives. Put the deposit amount and balance due clearly on your invoice. ${p.terms}`,
    },
    {
      q: `How do I avoid clients delaying payment?`,
      a: `Set a clear due date, include your payment instructions (bank transfer, PayPal, Wise, Stripe link) directly on the invoice, and follow up the day after the due date. Clients pay faster when they know exactly how to pay. A professional invoice with no watermark signals you're serious.`,
    },
    {
      q: `What other tools do ${p.plural} use for billing?`,
      a: `${p.plural.charAt(0).toUpperCase() + p.plural.slice(1)} often use InvoicePad for quick one-off invoices alongside time trackers (Toggl, Clockify), project management tools (Notion, Trello), and accounting software (QuickBooks, Wave). InvoicePad fills the gap for instant, no-login PDF invoices.`,
    },
  ];

  const ld = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <SiteShell>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }} />
      <div className="mx-auto max-w-3xl px-4 py-8">
        <nav className="text-xs text-slate-400">
          <Link href="/" className="hover:text-indigo-700">Home</Link>{" / "}
          <Link href="/invoice-templates" className="hover:text-indigo-700">Templates</Link>{" / "}
          <span className="text-slate-600">{p.name}</span>
        </nav>

        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">
          <span className="mr-2">{p.emoji}</span>
          2026 Invoice Template for {p.name}s
        </h1>
        <p className="mt-2 text-slate-600">
          {p.blurb} This free {p.name.toLowerCase()} invoice template shows you exactly what to put on
          your invoice, how to bill in 2026, and lets you create and download a clean PDF — no sign-up, no
          watermark.
        </p>

        <Link
          href="/"
          className="mt-5 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          Create your invoice now →
        </Link>

        {/* 独有：职业费率 + 发票结构 */}
        <section className="mt-10 prose prose-slate max-w-none text-slate-600">
          <h2 className="text-lg font-bold text-slate-900">How {p.plural} should invoice in 2026</h2>
          <p className="mt-2">{p.rateNote}</p>
          <p className="mt-2">
            As a {p.name.toLowerCase()}, the clearest way to get paid is to itemize each service on
            its own line so the client sees precisely what they&apos;re paying for. Below is a typical{" "}
            {p.name.toLowerCase()} invoice structure you can use as a starting point.
          </p>

          <h3 className="mt-6 text-base font-bold text-slate-900">
            Typical {p.name.toLowerCase()} invoice breakdown
          </h3>
          <ul className="mt-2 list-disc space-y-1 pl-5">
            <li><strong>Header:</strong> Your business name and the word &quot;INVOICE&quot;</li>
            <li><strong>Invoice number:</strong> Sequential (INV-0001, INV-0002) for easy tracking</li>
            <li><strong>Dates:</strong> Issue date and due date — {p.terms.toLowerCase()}</li>
            <li><strong>From:</strong> Your full contact details and tax ID</li>
            <li><strong>To:</strong> Client name, company, email</li>
            <li><strong>Services:</strong> Each deliverable on its own line — description, quantity, rate, amount</li>
            <li><strong>Tax:</strong> If applicable — VAT, GST, or sales tax based on your country</li>
            <li><strong>Total:</strong> Bold, unmistakable — the exact amount the client pays</li>
            <li><strong>Payment instructions:</strong> Bank details, PayPal, Wise or Stripe link</li>
            <li><strong>Notes:</strong> Thank-you, late payment policy, next steps</li>
          </ul>
        </section>

        <section className="mt-6">
          <h2 className="text-lg font-bold text-slate-900">Sample {p.name.toLowerCase()} invoice</h2>
          <div className="mt-3 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-slate-500">
                  <th className="p-3">Description</th>
                  <th className="p-3 text-right">Qty</th>
                  <th className="p-3 text-right">Rate</th>
                  <th className="p-3 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {p.sampleItems.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="p-3 text-slate-800">{it.description}</td>
                    <td className="p-3 text-right text-slate-600">{it.qty}</td>
                    <td className="p-3 text-right text-slate-600">{formatMoney(it.rate)}</td>
                    <td className="p-3 text-right font-medium text-slate-800">
                      {formatMoney(lineTotal(it))}
                    </td>
                  </tr>
                ))}
                <tr className="bg-slate-50">
                  <td className="p-3 font-semibold text-slate-700" colSpan={3}>
                    Subtotal
                  </td>
                  <td className="p-3 text-right font-bold text-indigo-700">
                    {formatMoney(sampleSub)}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Invoicing tips for {p.plural}</h2>
          <ul className="mt-3 space-y-2">
            {p.tips.map((t, i) => (
              <li key={i} className="flex gap-2 text-sm text-slate-700">
                <span className="text-indigo-500">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4 text-sm text-slate-700">
            <p><strong>Typical billing model:</strong> {p.billing}</p>
            <p className="mt-1"><strong>Suggested payment terms:</strong> {p.terms}</p>
            <p className="mt-2 text-xs text-slate-400">
              Pro tip: For new clients, always collect a deposit. For recurring clients, move them to retainer billing — it stabilizes your monthly income and reduces admin.
            </p>
          </div>
        </section>

        {/* 独有：税务提醒卡片 */}
        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-4">
          <h2 className="text-sm font-bold text-amber-800">Tax reminder for {p.plural}</h2>
          <p className="mt-1 text-sm text-amber-700">
            Depending on your location, you may need to charge sales tax, VAT, or GST on your{" "}
            {p.name.toLowerCase()} services. InvoicePad supports tax for US, UK, EU, Australia and
            Canada. Pick your tax country in the generator and the right rate is applied automatically.
            Always verify your tax obligations with a local accountant — especially for cross-border
            work where reverse-charge rules or digital services taxes may apply.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-lg font-bold text-slate-900">Frequently asked questions</h2>
          <div className="mt-3 space-y-3">
            {faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-800">{f.q}</h3>
                <p className="mt-1 text-sm text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 text-center">
          <h2 className="text-lg font-bold text-slate-900">
            Ready to send your {p.name.toLowerCase()} invoice?
          </h2>
          <p className="mt-1 text-sm text-slate-600">
            Fill it in, save a professional PDF — free, no sign-up, no watermark.
          </p>
          <Link
            href="/"
            className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
          >
            Open the invoice generator →
          </Link>
        </section>

        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-500">Invoice templates for other professions</h2>
          <div className="mt-2 flex flex-wrap gap-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/invoice-template/${o.slug}`}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1 text-sm text-slate-600 hover:text-indigo-700"
              >
                {o.emoji} {o.name}
              </Link>
            ))}
          </div>
          <div className="mt-4 flex flex-wrap gap-2 text-sm">
            <Link href="/receipt-maker" className="text-indigo-600 hover:underline">Receipt maker</Link>
            <Link href="/estimate-generator" className="text-indigo-600 hover:underline">Estimate generator</Link>
            <Link href="/invoice-templates" className="text-indigo-600 hover:underline">All templates</Link>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
