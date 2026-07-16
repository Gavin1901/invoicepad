import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { competitors } from "../_data";

export function generateStaticParams() {
  return competitors.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const comp = competitors.find((c) => c.slug === slug);
  if (!comp) return {};
  return {
    title: comp.title,
    description: comp.description,
    alternates: { canonical: `https://__DOMAIN__/vs/${comp.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const comp = competitors.find((c) => c.slug === slug);
  if (!comp) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: comp.faq.map((f: { q: string; a: string }) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://__DOMAIN__/" },
      { "@type": "ListItem", position: 2, name: "Compare", item: "https://__DOMAIN__/vs/" },
      { "@type": "ListItem", position: 3, name: comp.title, item: `https://__DOMAIN__/vs/${comp.slug}/` },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, breadcrumbLd]) }} />
      <Link prefetch={false} href="/" className="text-sm text-indigo-600 hover:underline">← Back to tool</Link>
      <h1 className="mt-6 text-3xl font-bold leading-tight">{comp.title}</h1>
      <p className="mt-3 text-lg text-zinc-500">{comp.description}</p>

      {/* Comparison Table */}
      <div className="mt-8 overflow-x-auto rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-zinc-200">
              <th className="pb-3 font-semibold text-zinc-900">Feature</th>
              <th className="pb-3 font-semibold text-indigo-600">__SITENAME__ <span className="text-xs font-normal text-green-600">(Free)</span></th>
              <th className="pb-3 font-semibold text-zinc-500">{comp.name} <span className="text-xs font-normal text-red-500">(Paid)</span></th>
            </tr>
          </thead>
          <tbody>
            {comp.comparison.map((row: { feature: string; us: string; them: string }, i: number) => (
              <tr key={i} className="border-b border-zinc-100 last:border-0">
                <td className="py-3 pr-4 text-zinc-700">{row.feature}</td>
                <td className="py-3 pr-4 text-green-700">{row.us}</td>
                <td className="py-3 text-red-600">{row.them}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Blurb */}
      <div className="mt-8 max-w-none leading-7 text-zinc-700 [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:text-indigo-600 [&_a]:hover:underline"
        dangerouslySetInnerHTML={{ __html: comp.bodyHtml }}
      />

      {/* FAQ */}
      {comp.faq.length > 0 && (
        <section className="mt-12 rounded-xl border border-zinc-200 bg-zinc-50 p-6">
          <h2 className="text-xl font-semibold text-zinc-900">FAQ</h2>
          <dl className="mt-4 space-y-4">
            {comp.faq.map((f: { q: string; a: string }, i: number) => (
              <div key={i}>
                <dt className="font-medium text-zinc-800">{f.q}</dt>
                <dd className="mt-1 text-zinc-600">{f.a}</dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      {/* CTA */}
      <div className="mt-10 rounded-2xl bg-indigo-50 p-6 text-center">
        <p className="text-lg font-semibold text-indigo-900">Try __SITENAME__ free — no sign-up, no upload, no limits.</p>
        <Link prefetch={false} href="/" className="mt-3 inline-block rounded-lg bg-indigo-600 px-6 py-2.5 text-sm font-semibold text-white hover:bg-indigo-700 transition">Use __SITENAME__ Now</Link>
      </div>
    </article>
  );
}