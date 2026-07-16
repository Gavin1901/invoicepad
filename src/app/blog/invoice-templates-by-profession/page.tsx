import type { Metadata } from "next";
import Link from "next/link";
import SiteShell from "@/components/SiteShell";
import { PROFESSIONS } from "@/lib/invoice";

export const metadata: Metadata = {
  title: "2026 Invoice Templates by Profession — 20+ Free Templates for Freelancers (2026)",
  description:
    "Free 2026 invoice templates for 20+ freelance professions. Tailored line items, billing models, payment terms and tax guidance for designers, developers,",
  alternates: { canonical: "https://invoicepad.net/blog/invoice-templates-by-profession" },
  openGraph: { title: "2026 Invoice Templates by Profession — 20+ Free Templates", url: "https://invoicepad.net/blog/invoice-templates-by-profession", type: "article" },
};

export default function BlogInvoiceTemplatesByProfession() {
  const faq = [
    {
      q: "Do different professions need different invoice templates?",
      a: "Yes. A graphic designer invoices differently from a contractor or a tutor. The line items, billing model and payment terms vary by profession. A designer bills per deliverable, a consultant bills hourly, a coach sells program packages. Using a template tailored to your profession makes your invoice look more professional and reduces client questions.",
    },
    {
      q: "Which professions use hourly billing?",
      a: "Web developers, consultants, virtual assistants, tutors, handymen and translators commonly bill hourly. They track time and multiply hours by an hourly rate. The invoice should show hours worked, rate per hour, and the total for each line.",
    },
    {
      q: "Which professions use retainer billing?",
      a: "Social media managers, SEO specialists and some consultants work on monthly retainers. The client pays a fixed monthly fee for a defined scope of work. Retainers give freelancers predictable income and clients consistent service.",
    },
    {
      q: "Which professions use milestone billing?",
      a: "Web developers, contractors, event planners, video editors and UI designers use milestone billing for large projects. The project is broken into phases with a payment at each milestone — deposit, midpoint, final delivery.",
    },
    {
      q: "Can I use InvoicePad for any profession?",
      a: "Yes. InvoicePad has tailored templates for 20+ professions with profession-specific line items, billing tips and payment terms. It also supports all four billing models — hourly, fixed, retainer and milestone — so any freelancer can use it.",
    },
    {
      q: "Do I need a separate template for estimates and invoices?",
      a: "No — the same template works for both. Build your estimate in InvoicePad, get it approved, then update the title to 'Invoice' and send the final version. The line items stay the same, saving you re-typing.",
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
          <span className="text-slate-600">Invoice Templates by Profession</span>
        </nav>

        <h1>2026 Invoice Templates by Profession: 20+ Free Templates for Freelancers</h1>
        <p className="lead">
          Every profession bills differently. A graphic designer charges per logo, a web developer charges
          per hour, a photographer charges a day rate, and a coach sells program packages. Using a generic
          invoice template makes you look like an amateur. Using one tailored to your profession signals
          you understand your craft — and your client&apos;s expectations.
        </p>

        <h2>Why Profession-Specific Templates Matter</h2>
        <p>
          Clients in different industries expect different things on an invoice. A corporate consulting
          client expects to see hours broken out by phase. A bride booking a makeup artist expects a
          deposit line and a balance-due-on-the-day note. A startup hiring a developer expects milestone
          billing with phased payments. A one-size-fits-all invoice either confuses the client or forces
          you to explain basic things that a tailored template handles automatically.
        </p>
        <p>
          InvoicePad has 20 profession-specific templates. Each includes: profession-typical line items,
          the most common billing model for that profession, suggested payment terms, and invoicing tips
          specific to that type of work.
        </p>

        <h2>Template Directory by Billing Model</h2>
        <h3>Hourly Billing Professions</h3>
        <div className="not-prose grid gap-2 sm:grid-cols-2">
          {PROFESSIONS.filter((p) => p.billing === "Hourly").map((p) => (
            <Link key={p.slug} href={`/invoice-template/${p.slug}`} className="rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-indigo-300">
              <span className="mr-1">{p.emoji}</span>
              <span className="font-medium text-slate-800">{p.name}</span>
              <span className="ml-2 text-xs text-slate-400">{p.billing}</span>
            </Link>
          ))}
        </div>

        <h3 className="mt-6">Fixed Price Professions</h3>
        <div className="not-prose grid gap-2 sm:grid-cols-2">
          {PROFESSIONS.filter((p) => p.billing === "Per project" || p.billing === "Per deliverable" || p.billing === "Day rate").map((p) => (
            <Link key={p.slug} href={`/invoice-template/${p.slug}`} className="rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-indigo-300">
              <span className="mr-1">{p.emoji}</span>
              <span className="font-medium text-slate-800">{p.name}</span>
              <span className="ml-2 text-xs text-slate-400">{p.billing}</span>
            </Link>
          ))}
        </div>

        <h3 className="mt-6">Retainer Professions</h3>
        <div className="not-prose grid gap-2 sm:grid-cols-2">
          {PROFESSIONS.filter((p) => p.billing === "Retainer").map((p) => (
            <Link key={p.slug} href={`/invoice-template/${p.slug}`} className="rounded-lg border border-slate-200 bg-white p-3 text-sm hover:border-indigo-300">
              <span className="mr-1">{p.emoji}</span>
              <span className="font-medium text-slate-800">{p.name}</span>
              <span className="ml-2 text-xs text-slate-400">{p.billing}</span>
            </Link>
          ))}
        </div>

        <h2 className="mt-8">How to Choose the Right Template</h2>
        <p>
          Pick the template that matches your primary way of working — not necessarily your job title. A
          freelance writer who also does consulting might use the consultant template for strategy
          engagements even though their main template is the writer one. The key is that the line items
          and billing model match what the client expects to see.
        </p>
        <p>
          Each template in InvoicePad is free, requires no sign-up, and produces a watermark-free PDF. The
          generator remembers your details, auto-increments your invoice number, and supports multi-country
          tax so your invoices are ready for clients anywhere.
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
          <h2 className="text-lg font-bold text-slate-900">Find your template</h2>
          <p className="mt-1 text-sm text-slate-600">Browse all 20+ profession templates and create your first invoice in minutes.</p>
          <Link href="/invoice-templates" className="mt-4 inline-block rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700">
            Browse all templates →
          </Link>
        </div>
      </article>
    </SiteShell>
  );
}
