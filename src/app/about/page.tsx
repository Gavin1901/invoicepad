import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About InvoicePad (2026) — freelance invoice generator",
  description: "2026 free invoice generator for freelancers. Professional invoices, multiple billing models, no sign-up.",
  alternates: { canonical: "https://invoicepad.net/about/" },
};

export default function Page() {
  const websiteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "InvoicePad",
    url: "https://invoicepad.net",
    description: "2026 free invoice generator for freelancers. Professional invoices, multiple billing models, no sign-up.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://invoicepad.net/?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://invoicepad.net/" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://invoicepad.net/about/" },
    ],
  };

  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([websiteLd, breadcrumbLd]) }} />
      <Link prefetch={false} href="/" className="text-sm text-indigo-600 hover:underline">← Back to InvoicePad</Link>
      <h1 className="mt-6 text-3xl font-bold">About InvoicePad</h1>
      <div className="mt-6 space-y-4 leading-7 text-zinc-700">
        <p>InvoicePad is a free online tool — 2026 free invoice generator for freelancers. Professional invoices, multiple billing models, no sign-up.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-8">Who built this?</h2>
        <p>InvoicePad was built by an independent developer using AI-assisted coding tools. The entire site was built with Claude Code and Next.js, deployed on Cloudflare Pages. No venture funding, no big team. Just one person with AI as a force multiplier, shipping useful tools to the world.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-8">Why free?</h2>
        <p>InvoicePad is supported by advertising (Google AdSense). You get full access to all tools without paying anything, and we earn a small amount when ads are viewed. No paywalls, no premium tiers. If ads are annoying, use an ad blocker — the tools still work perfectly.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-8">Privacy comes first</h2>
        <p>Your files never leave your device. All processing happens locally in your browser. Read more on our <Link href="/privacy-policy/" className="text-indigo-600 hover:underline">Privacy Policy</Link> page.</p>
        <h2 className="text-xl font-semibold text-zinc-900 mt-8">Technology</h2>
        <p>Built with Next.js 16 (static export), deployed on Cloudflare Pages for global edge performance. Pure JavaScript and WebAssembly engines — zero server-side processing, zero uploads.</p>
      </div>
    </div>
  );
}
