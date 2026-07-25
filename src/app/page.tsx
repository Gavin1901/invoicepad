import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import InvoiceTool from "@/components/InvoiceTool";
import { PROFESSIONS, TAX_REGIMES, BILLING_MODELS } from "@/lib/invoice";

export default function Home() {
  const faq = [
    {
      q: "Is InvoicePad really free in 2026?",
      a: "Yes — completely free with no sign-up, no account and no watermark on your invoice. Fill in the form, hit Print / Save as PDF, and you're done. There's nothing to install and nothing to pay. We monetize through ads, not your data.",
    },
    {
      q: "Where is my invoice data stored?",
      a: "Everything happens inside your own browser. Your business details, clients and line items are saved to your device's local storage so your next invoice is pre-filled — but nothing is ever uploaded to a server. Your client data stays private.",
    },
    {
      q: "How do I save my invoice as a PDF?",
      a: "Click Print / Save as PDF. Your browser's print dialog opens — choose 'Save as PDF' as the destination instead of a printer. You get a clean, professional PDF with no watermark you can email straight to your client.",
    },
    {
      q: "Does it remember my details for next time?",
      a: "Yes. Your 'From' business info, currency, billing model, tax country and notes are remembered, and your invoice number is automatically bumped by one each time you come back — so invoice INV-0007 becomes INV-0008 next month with no manual editing.",
    },
    {
      q: "What billing models does InvoicePad support?",
      a: "InvoicePad supports four billing models in 2026: Hourly (rate/hr + hours worked), Fixed Price (per line item — most common), Retainer (monthly scope + period), and Milestone (project phases with due dates). Switch anytime and the form adapts automatically.",
    },
    {
      q: "Can I handle tax for my country?",
      a: "Yes. Choose your tax country and the correct tax name and default rate are applied: US sales tax, UK VAT 20%, EU VAT (varies by country), Australia GST 10%, and Canada GST/HST by province. Add your tax ID (EIN, VAT number, ABN, BN) right on the invoice.",
    },
    {
      q: "What currencies can I invoice in?",
      a: "Invoice in USD, EUR, GBP, AUD or CAD — each formatted correctly with the right currency symbol and decimal separator using Intl.NumberFormat. The currency auto-switches when you pick your tax country.",
    },
    {
      q: "Who uses InvoicePad?",
      a: "Freelancers, solopreneurs, contractors and small business owners across 20+ professions — from graphic designers and web developers to photographers, consultants, writers, virtual assistants, tutors, cleaners and more. If you send invoices, InvoicePad works for you.",
    },
  ];

  const faqLd = {
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />

      <section className="bg-gradient-to-b from-indigo-50 to-slate-50">
        <div className="mx-auto max-w-5xl px-4 py-12 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
            2026 Free Invoice Generator for Freelancers
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Build a clean, professional invoice and save it as a PDF in under a minute. Free, no
            sign-up, no watermark — and your data never leaves your browser. Supports hourly, fixed,
            retainer and milestone billing with multi-country tax built in.
          </p>
          <div className="mt-4 flex flex-wrap justify-center gap-2 text-xs font-medium text-indigo-700">
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">100% free</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">No sign-up</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">No watermark</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Private — stays in your browser</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">4 billing models</span>
            <span className="rounded-full bg-white px-3 py-1 shadow-sm">Multi-country tax</span>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-8">
        <InvoiceTool />

        <section className="mt-10 rounded-2xl border border-indigo-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Templates getting impressions right now</h2>
          <p className="mt-2 text-sm text-slate-600">Search Console is already showing demand for estimate makers, web development invoices, writing invoices and handyman templates. These links concentrate crawl paths on the pages most likely to turn impressions into clicks.</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <Link href="/invoice-templates/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">All invoice templates</Link>
            <Link href="/seo-service-invoice-template/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">SEO service invoice template</Link>
            <Link href="/web-developer-invoice-template/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">Web developer invoice</Link>
            <Link href="/freelance-writer-invoice-template/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">Freelance writer invoice</Link>
            <Link href="/handyman-invoice-template/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">Handyman invoice</Link>
            <Link href="/receipt-maker/" className="rounded-xl border border-indigo-100 bg-indigo-50 px-4 py-3 text-sm font-semibold text-indigo-800 hover:bg-indigo-100">Receipt maker</Link>
          </div>
        </section>

        {/* 计费模型说明 */}
        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Billing models for every type of freelance work</h2>
          <p className="mt-1 text-sm text-slate-600">
            Different projects need different billing. Pick the model that matches how you actually work.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {BILLING_MODELS.map((bm) => (
              <div key={bm.type} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-800">{bm.label}</h3>
                <p className="mt-1 text-sm text-slate-600">{bm.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 多国税说明 */}
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Tax support for freelancers worldwide</h2>
          <p className="mt-1 text-sm text-slate-600">
            Select your country and InvoicePad automatically applies the right tax name and rate for your invoices.
          </p>
          <div className="mt-4 overflow-x-auto rounded-xl border border-slate-200 bg-white">
            <table className="w-full min-w-[600px] text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left text-xs uppercase text-slate-400">
                  <th className="p-3">Country</th>
                  <th className="p-3">Tax Type</th>
                  <th className="p-3">Default Rate</th>
                  <th className="p-3">Tax ID</th>
                  <th className="p-3">Currency</th>
                </tr>
              </thead>
              <tbody>
                {TAX_REGIMES.filter((t) => t.country !== "OTHER").map((t) => (
                  <tr key={t.country} className="border-b border-slate-100">
                    <td className="p-3 font-medium text-slate-800">{t.label}</td>
                    <td className="p-3 text-slate-600">{t.taxName}</td>
                    <td className="p-3 text-slate-600">{t.defaultRate}%</td>
                    <td className="p-3 text-slate-600">{t.idLabel}</td>
                    <td className="p-3 text-slate-600">{t.currency}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Invoice templates by profession</h2>
          <p className="mt-1 text-sm text-slate-600">
            Tailored guidance and ready line items for how your line of work bills clients.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {PROFESSIONS.map((p) => (
              <Link
                key={p.slug}
                href={`/invoice-template/${p.slug}`}
                className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-700"
              >
                <span className="mr-1">{p.emoji}</span>
                {p.name}
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-slate-900">How to invoice a client (the right way in 2026)</h2>
          <p className="mt-3 text-slate-600">
            A good invoice does one job: it gets you paid quickly and without back-and-forth. Whether
            you&apos;re a designer sending your first invoice or a developer chasing an overdue
            payment, every professional invoice needs the same handful of elements. Miss one and you
            give the client a reason to delay.
          </p>
          <p className="mt-3 text-slate-600">
            Start with a clear <strong>invoice number</strong> so both of you can reference it later.
            Add <strong>your details</strong> (name, business name, email, and tax ID if you have
            one) and <strong>the client&apos;s details</strong>. Pick the right <strong>billing
            model</strong> — hourly if you track time, fixed-price per deliverable if you work on
            project scope, retainer if you have recurring monthly work, or milestone-based for
            phased projects with progress payments. List each piece of work as its own{" "}
            <strong>line item</strong> with a description, quantity and rate — clients pay faster when
            they can see exactly what they&apos;re paying for. Show the <strong>subtotal, any tax or
            VAT, and a bold total</strong> so there&apos;s no ambiguity about the amount owed.
          </p>
          <p className="mt-3 text-slate-600">
            Finally, set a <strong>due date and payment terms</strong>. &quot;Net 14&quot; or
            &quot;Net 30&quot; tells the client exactly when to pay. Add your payment details (bank
            transfer, PayPal, Wise, Stripe link) in the notes, and a short thank-you. That&apos;s it
            — a one-page invoice that looks like it came from an established business, not an
            afterthought. The tool above builds all of this for you, then exports it to a clean PDF
            with no watermark.
          </p>

          <h3 className="mt-6 text-lg font-bold text-slate-900">Common freelance invoicing mistakes</h3>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-slate-600">
            <li>No due date — &quot;please pay soon&quot; gets paid last.</li>
            <li>Vague line items like &quot;design work — $2,000&quot; with no breakdown.</li>
            <li>Forgetting the invoice number, making follow-ups confusing.</li>
            <li>Leaving off payment instructions, so the client has to ask how to pay.</li>
            <li>Using a tool that slaps a watermark on the PDF and looks unprofessional.</li>
            <li>Not including your tax ID when required — delays payment in many countries.</li>
            <li>Using the wrong billing model — hourly for a fixed-scope project invites disputes.</li>
          </ul>

          <h3 className="mt-6 text-lg font-bold text-slate-900">Why 2026 freelancers need a real invoice generator</h3>
          <p className="mt-2 text-slate-600">
            Freelancing in 2026 means clients expect professional documentation. A clean invoice is
            not just a payment request — it&apos;s a signal that you run a real business. With more
            freelancers working across borders, multi-currency support, correct tax handling, and the
            right billing model are non-negotiable. InvoicePad gives you all of this without asking
            for your email or locking features behind a paywall. No account, no subscription, no
            limits — just open the page, fill it in, and send.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-indigo-200 bg-indigo-50 p-6">
          <h2 className="text-lg font-bold text-slate-900">Start invoicing in 30 seconds</h2>
          <p className="mt-1 text-sm text-slate-600">
            Fill in the form above, hit Print / Save as PDF, and email it to your client. Your data
            stays in your browser — nothing is ever uploaded. Use the template today, come back next
            month — your invoice number auto-bumps, your details are remembered, and the PDF is always
            watermark-free.
          </p>
        </section>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6">
          <h2 className="text-xl font-bold text-slate-900">Freelancer invoicing guides</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link className="text-indigo-700 underline" href="/blog/how-to-write-an-invoice-freelancer">How to write an invoice</Link>
            <Link className="text-indigo-700 underline" href="/blog/invoice-payment-terms-explained">Payment terms explained</Link>
            <Link className="text-indigo-700 underline" href="/blog/what-to-include-on-an-invoice">Invoice checklist</Link>
          </div>
        </section>

        <section className="mt-12">
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
      </div>
    </SiteShell>
  );
}
