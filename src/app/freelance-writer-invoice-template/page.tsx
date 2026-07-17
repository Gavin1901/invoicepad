import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Freelance Writer Invoice Template - Free PDF Generator",
  description: "Create a freelance writing invoice for blog posts, website copy, newsletters, editing, and content packages. Free, no sign-up, no watermark.",
  alternates: { canonical: "https://invoicepad.net/freelance-writer-invoice-template" },
};

export default function Page() {
  const lineItems = ['Blog post writing', 'Website copy', 'Newsletter writing', 'Editing and proofreading', 'Content strategy'];
  const faq = [
    { q: "Is this freelance writer invoice template free?", a: "Yes. InvoicePad lets you create a professional PDF invoice for free with no sign-up and no watermark." },
    { q: "What should I include?", a: "Include your business details, client details, invoice number, date, due date, line items, subtotal, tax if needed, total, and payment instructions." },
    { q: "Can I save it as PDF?", a: "Yes. Use the generator and choose Print or Save as PDF in your browser." },
    { q: "Is my invoice data uploaded?", a: "No. InvoicePad runs in your browser. Your invoice data stays on your own device." },
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
      <main className="mx-auto max-w-3xl px-4 py-10">
        <nav className="text-sm text-slate-500">
          <Link href="/" className="hover:text-indigo-700">Invoice generator</Link> / <Link href="/invoice-templates/" className="hover:text-indigo-700">Templates</Link>
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900">Freelance Writer Invoice Template</h1>
        <p className="mt-3 text-lg leading-8 text-slate-600">Create a freelance writing invoice for blog posts, website copy, newsletters, editing, and content packages. Free, no sign-up, no watermark.</p>
        <div className="mt-6 rounded-2xl border border-indigo-200 bg-indigo-50 p-5">
          <p className="text-sm font-semibold text-indigo-900">Fast path</p>
          <p className="mt-1 text-sm text-indigo-800">Open the free InvoicePad generator, fill your line items, then save a clean PDF invoice with no watermark.</p>
          <Link href="/" className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-bold text-white hover:bg-indigo-700">Create invoice now</Link>
        </div>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">Common line items</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {lineItems.map((item) => (
              <div key={item} className="rounded-xl border border-slate-200 bg-white p-4 text-sm font-medium text-slate-700">{item}</div>
            ))}
          </div>
        </section>
        <section className="mt-10 prose prose-slate max-w-none">
          <h2>How to use this freelance writer invoice template</h2>
          <p>Start with a clear invoice number, issue date, and due date. Add your client details and break every service into its own line item. This makes the invoice easier to approve and reduces back-and-forth before payment.</p>
          <p>For service work, avoid vague descriptions. Instead of writing one generic line like work completed, write the actual deliverable, quantity, rate, and amount. If you charge a retainer, milestone, or fixed project fee, make that billing model clear on the invoice.</p>
          <p>Finish with payment instructions and short notes. Include your preferred payment method, tax ID if required, and late payment terms if you use them. A professional invoice helps clients pay faster because they know exactly what they are paying for and how to pay.</p>
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
          <div className="mt-4 space-y-3">
            {faq.map((f) => (
              <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
                <h3 className="font-semibold text-slate-900">{f.q}</h3>
                <p className="mt-1 text-sm leading-6 text-slate-600">{f.a}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="mt-10 border-t border-slate-200 pt-6">
          <h2 className="text-sm font-semibold text-slate-500">Related invoice tools</h2>
          <div className="mt-3 flex flex-wrap gap-3 text-sm">
            <Link href="/invoice-templates/" className="text-indigo-700 hover:underline">All invoice templates</Link>
            <Link href="/estimate-generator/" className="text-indigo-700 hover:underline">Estimate generator</Link>
            <Link href="/receipt-maker/" className="text-indigo-700 hover:underline">Receipt maker</Link>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
