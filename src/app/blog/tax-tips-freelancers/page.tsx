import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { TAX_REGIMES } from "@/lib/invoice";

export const metadata: Metadata = {
  title: "2026 Tax Tips for Freelancers — US UK EU AU CA Invoice Tax Guide (2026)",
  description:
    "Complete 2026 tax guide for freelancers. Sales tax, VAT, GST and HST rules for US UK EU AU CA.",
  alternates: { canonical: "https://invoicepad.net/blog/tax-tips-freelancers" },
  openGraph: { title: "2026 Tax Tips for Freelancers — Multi-Country Invoice Tax Guide", url: "https://invoicepad.net/blog/tax-tips-freelancers", type: "article" },
};

export default function BlogTaxTipsFreelancers() {
  const faq = [
    {
      q: "Do freelancers need to charge sales tax?",
      a: "It depends on your country, your revenue, and your client's location. In the US, state sales tax applies in some states for certain services. In the UK and EU, VAT-registered freelancers must charge VAT. In Australia, GST-registered freelancers charge 10% GST. In Canada, GST/HST applies by province. Always check with a local accountant.",
    },
    {
      q: "When must a UK freelancer register for VAT?",
      a: "In 2026, you must register for VAT if your annual taxable turnover exceeds £90,000. You can also register voluntarily below the threshold, which may benefit you if you sell to VAT-registered businesses who can reclaim input VAT. Once registered, file quarterly returns through Making Tax Digital (MTD).",
    },
    {
      q: "What is the reverse charge for EU cross-border invoices?",
      a: "When you invoice a VAT-registered business in another EU country, you charge 0% VAT and the client accounts for VAT in their own country through the reverse charge mechanism. You must include the client's VAT ID on the invoice and state 'reverse charge' applies. This only applies to B2B, not to consumers.",
    },
    {
      q: "Do I need an ABN to invoice in Australia?",
      a: "Yes. Every Australian freelancer needs an ABN (Australian Business Number) to issue tax invoices. Without an ABN, your client may withhold 47% of the payment as tax. Registering for an ABN is free through the Australian Business Register. If GST-registered, include GST on invoices.",
    },
    {
      q: "How does Canadian GST/HST work for freelancers?",
      a: "Federal GST is 5%. HST combines federal and provincial tax: 13% in Ontario, 15% in Atlantic provinces. If your revenue exceeds C$30,000, you must register for GST/HST. BC, Saskatchewan, Manitoba and Quebec have separate provincial sales tax (PST). Show your Business Number on every invoice.",
    },
    {
      q: "How do I show tax correctly on my invoice?",
      a: "Show the tax name (VAT, GST, HST, Sales Tax), the tax rate percentage, the tax amount as a separate line, your tax registration number, and the total including tax. InvoicePad does this automatically — just pick your tax country from the dropdown and the right rate and format are applied.",
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
      <article className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <nav className="not-prose text-xs text-slate-400 mb-6">
          <Link href="/" className="hover:text-indigo-700">Home</Link>{" / "}
          <span className="text-slate-600">Blog</span>{" / "}
          <span className="text-slate-600">Tax Tips for Freelancers</span>
        </nav>

        <h1>2026 Tax Tips for Freelancers: A Multi-Country Invoice Tax Guide</h1>
        <p className="lead">
          Tax is the part of freelancing nobody enjoys, but getting it wrong can cost you money, clients,
          and sleep. This guide covers everything freelancers need to know about sales tax, VAT, GST and
          HST in five countries: United States, United Kingdom, European Union, Australia, and Canada.
          Plus practical tips on how to show tax correctly on every invoice you send.
        </p>

        <h2>Tax Rules by Country</h2>
        {TAX_REGIMES.filter((t) => t.country !== "OTHER").map((t) => (
          <div key={t.country} className="mt-4 not-prose rounded-xl border border-slate-200 bg-white p-5">
            <h3 className="text-lg font-bold text-slate-800">{t.label} — {t.currency}</h3>
            <div className="mt-2 grid gap-2 text-sm sm:grid-cols-2">
              <div><span className="font-semibold text-slate-600">Tax type:</span> {t.taxName}</div>
              <div><span className="font-semibold text-slate-600">Default rate:</span> {t.defaultRate}%</div>
              <div><span className="font-semibold text-slate-600">Tax ID:</span> {t.idLabel} ({t.idExample})</div>
            </div>
            <p className="mt-2 text-sm text-slate-600">{t.note}</p>
          </div>
        ))}

        <h2 className="mt-10">Invoice Tax Checklist for Freelancers</h2>
        <p>
          Every time you send an invoice, run through this checklist before hitting send:
        </p>
        <ol>
          <li><strong>Know your registration status:</strong> Are you required to register for VAT/GST/HST
          in your country? Check your local revenue threshold.</li>
          <li><strong>Show your tax ID:</strong> Your EIN, VAT number, ABN or BN must appear on the invoice
          if you are registered.</li>
          <li><strong>Show the tax breakdown:</strong> Subtotal, tax rate, tax amount, and total including
          tax — each as a separate line.</li>
          <li><strong>Cross-border check:</strong> Are you invoicing a client in another country? Different
          rules may apply — reverse charge in the EU, 0% for exports from AU, etc.</li>
          <li><strong>Currency match:</strong> Does the currency on the invoice match the tax jurisdiction?
          A UK client invoiced in USD still needs VAT in GBP-equivalent. Most freelancers invoice in their
          local currency for simplicity.</li>
          <li><strong>Keep records:</strong> Save a copy of every invoice as a PDF. Most tax authorities
          require you to keep records for 5-7 years.</li>
        </ol>

        <h2>Common Tax Mistakes Freelancers Make</h2>
        <ul>
          <li><strong>Not registering when required:</strong> Crossing the revenue threshold without
          registering for VAT/GST can result in backdated tax bills plus penalties.</li>
          <li><strong>Forgetting to charge tax on invoices:</strong> Once registered, every invoice must
          include tax. If you forget, you still owe the tax to the government — it comes out of your
          pocket.</li>
          <li><strong>Charging the wrong VAT rate:</strong> EU VAT rates vary from 19% to 23%. Charging
          the wrong rate means underpaying or overcharging.</li>
          <li><strong>Not collecting client VAT IDs:</strong> For EU cross-border B2B invoices, you must
          verify and record the client's VAT ID to apply the reverse charge.</li>
          <li><strong>Treating all income as non-taxable:</strong> Digital products and online services are
          increasingly taxable across borders. Check the rules for each client country.</li>
        </ul>

        <h2>How InvoicePad Handles Tax</h2>
        <p>
          InvoicePad makes tax simple. Pick your country from the dropdown in the invoice generator and
          the correct tax name (VAT, GST, HST, Sales Tax) and default rate are applied automatically. The
          tax amount appears as its own line on the invoice — subtotal, tax, total — and you can add your
          tax ID (EIN, VAT number, ABN, BN) right on the form. For multi-country freelancers, you can
          switch tax countries per invoice. Everything stays in your browser and nothing is uploaded.
        </p>
        <p>
          <strong>Disclaimer:</strong> This guide is for informational purposes only. Tax laws change
          frequently and vary by jurisdiction. Always consult a qualified accountant or tax professional
          for advice specific to your situation.
        </p>

        <h2>Frequently Asked Questions</h2>
        <div className="mt-4 space-y-4 not-prose">
          {faq.map((f) => (
            <div key={f.q} className="rounded-xl border border-slate-200 bg-white p-4">
              <h3 className="font-semibold text-slate-800">{f.q}</h3>
              <p className="mt-1 text-sm text-slate-600">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-indigo-200 bg-indigo-50 p-6 not-prose text-center">
          <h2 className="text-lg font-bold text-slate-900">Generate a tax-compliant invoice now</h2>
          <p className="mt-1 text-sm text-slate-600">Pick your country, set your rate, save as PDF — free, no sign-up.</p>
          <Link href="/" className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Open invoice generator →
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
