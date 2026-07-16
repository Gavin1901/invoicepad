import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import InvoiceTool from "@/components/InvoiceTool";
import { PROFESSIONS } from "@/lib/invoice";

export const metadata: Metadata = {
  title: "2026 Free Receipt Maker — Create & Download a Receipt PDF (No Sign-Up) (2026)",
  description: "Free 2026 online receipt maker for freelancers and small businesses. Make clean professional receipts and save as PDF — no sign-up, no watermark.",
  alternates: { canonical: "https://invoicepad.net/receipt-maker" },
};

export default function ReceiptMaker() {
  const faq = [
    {
      q: "What is the difference between an invoice and a receipt?",
      a: "An invoice is a request for payment — you send it before the client pays. A receipt is proof that payment has been received — you send it after. Both list the same items and totals; a receipt simply confirms the money has changed hands. Use the generator below and mark it 'Paid' in the notes to produce a receipt.",
    },
    {
      q: "Is this receipt maker free in 2026?",
      a: "Yes — completely free with no sign-up, no account and no watermark on your receipt. Fill in the details, hit Print / Save as PDF, and you get a clean, professional receipt. We monetize through ads, not your data.",
    },
    {
      q: "Is my data private?",
      a: "Yes. Everything stays in your own browser. Nothing is uploaded to any server. Your client data, your business details — it all lives in your browser's local storage and never leaves your device.",
    },
    {
      q: "What information goes on a receipt?",
      a: "A proper receipt needs: your business name and contact, the client's name, a receipt number (can reuse your invoice number), the date payment was received, an itemized list of what was paid for, the amount paid, and the payment method. Mark it 'PAID' prominently so there's no confusion.",
    },
    {
      q: "Can I include tax on the receipt?",
      a: "Yes. Add the tax rate in the generator and it appears on your receipt automatically. If you charged VAT, GST or sales tax on the original invoice, the receipt should show the same breakdown including the tax amount. InvoicePad supports US, UK, EU, AU and CA tax.",
    },
    {
      q: "Do I always need to send a receipt?",
      a: "In many countries, yes — it is a legal requirement once payment is received. Even where it's optional, sending a receipt is a professional touch that builds client trust and creates a paper trail for your records. It also signals the transaction is complete.",
    },
    {
      q: "How do I make a receipt from an invoice I already sent?",
      a: "Open the InvoicePad generator, fill in the same items and details from your original invoice, change the title in notes to 'Receipt — Paid in Full', add the payment date, and save a new PDF. Or better — use the auto-saved draft from when you created the invoice and just update the notes.",
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
          <span className="text-slate-600">Receipt Maker</span>
        </nav>
        <h1 className="mt-3 text-2xl font-extrabold text-slate-900 sm:text-3xl">2026 Free Receipt Maker</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Create a clean, professional receipt and save it as a PDF. Free, no sign-up, no watermark —
          and your data never leaves your browser. To turn this into a paid receipt, just write
          &quot;Paid in full&quot; and the payment date in the notes.
        </p>

        <div className="mt-6">
          <InvoiceTool
            presetItems={[
              { description: "Service rendered", qty: 1, rate: 250 },
            ]}
          />
        </div>

        <section className="mt-12 prose prose-slate max-w-none">
          <h2 className="text-xl font-bold text-slate-900">How to make a receipt in 2026</h2>
          <p className="mt-3 text-slate-600">
            A receipt is your client&apos;s proof of payment and your record of income. It should show
            who paid, what they paid for, the amount, the date payment was received and a receipt or
            reference number. The fastest way to make one is to take the same details you&apos;d put on
            an invoice, add the payment date, and mark it as paid. The tool above does exactly that —
            fill it in, note &quot;Paid&quot; in the notes, and save a tidy PDF receipt to email back.
          </p>
          <h3 className="mt-6 text-lg font-bold text-slate-900">Receipt requirements by country</h3>
          <p className="mt-2 text-slate-600">
            Receipt requirements vary. In the US, no federal receipt law exists but most states require
            receipts for sales tax purposes. In the UK, VAT-registered businesses must issue a VAT
            receipt showing the VAT number, rate and amount. In Australia, GST-registered businesses
            must provide a tax invoice (which doubles as a receipt when marked paid) with ABN and GST
            amount. In Canada, receipts must show GST/HST registration number and the tax breakdown by
            type. The InvoicePad generator lets you add your tax ID and the correct tax rate for any
            of these jurisdictions.
          </p>
          <h3 className="mt-6 text-lg font-bold text-slate-900">When to send a receipt vs when to send an invoice</h3>
          <p className="mt-2 text-slate-600">
            Send an invoice at the start: to request payment for work agreed or completed. Send a
            receipt at the end: to confirm payment was received. For deposit payments, send a receipt
            for the deposit immediately so the client has proof. For milestone-based projects, send a
            receipt after each milestone payment clears. For recurring retainer work, you may only
            need one receipt per month covering all payments. The tool above handles all of these
            scenarios — just adjust the items and notes accordingly.
          </p>
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
