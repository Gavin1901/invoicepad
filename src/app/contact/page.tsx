import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact InvoicePad (2026) — Get in Touch",
  description: "Contact InvoicePad with questions, feedback, bug reports, or collaboration inquiries.",
  alternates: { canonical: "https://invoicepad.net/contact/" },
};

export default function Page() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://invoicepad.net/" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://invoicepad.net/contact/" },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([breadcrumbLd]) }} />
      <Link prefetch={false} href="/" className="text-sm text-indigo-600 hover:underline">← Back to InvoicePad</Link>
      <h1 className="mt-6 text-3xl font-bold">Contact Us</h1>
      <div className="mt-6 space-y-4 leading-7 text-zinc-700">
        <p>Have a question, suggestion, or bug report? Want to collaborate? We would love to hear from you.</p>
        <div className="mt-6 rounded-xl border border-zinc-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-zinc-900">Email</h2>
          <p className="mt-2"><a href="mailto:lg695101011@gmail.com" className="text-indigo-600 hover:underline text-lg">lg695101011@gmail.com</a></p>
          <p className="mt-1 text-sm text-zinc-500">We read every message and respond within 24-48 hours.</p>
        </div>
        <h2 className="text-xl font-semibold text-zinc-900 mt-8">What to reach out about</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li><strong>Bug reports</strong> — If a tool is not working, tell us your browser and what you were doing.</li>
          <li><strong>Feature requests</strong> — Ideas for new tools or improvements.</li>
          <li><strong>Business inquiries</strong> — Advertising, partnerships, or custom tool development.</li>
          <li><strong>Just saying hi</strong> — We are a small independent project. Every kind message makes our day.</li>
        </ul>
      </div>
    </div>
  );
}
