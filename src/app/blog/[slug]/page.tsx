import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { posts } from "../posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `https://invoicepad.net/blog/${post.slug}/` },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://invoicepad.net/" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://invoicepad.net/blog/" },
      { "@type": "ListItem", position: 3, name: post.title, item: `https://invoicepad.net/blog/${post.slug}/` },
    ],
  };

  return (
    <article className="mx-auto max-w-2xl px-5 py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, breadcrumbLd]) }} />
      <Link prefetch={false} href="/blog/" className="text-sm text-indigo-600 hover:underline">← All articles</Link>
      <h1 className="mt-6 text-3xl font-bold leading-tight">{post.title}</h1>
      <p className="mt-3 text-sm text-zinc-400">{post.date} · {post.readingTime}</p>
      <div
        className="mt-8 max-w-none leading-7 text-zinc-700 [&_a]:text-indigo-600 [&_a]:hover:underline [&_h2]:mt-8 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-zinc-900 [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-zinc-900 [&_li]:mt-1 [&_ol]:mt-4 [&_ol]:list-decimal [&_ol]:pl-6 [&_p]:mt-4 [&_ul]:mt-4 [&_ul]:list-disc [&_ul]:pl-6"
        dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
      />
    </article>
  );
}
