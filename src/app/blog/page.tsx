import type { Metadata } from "next";
import Link from "next/link";
import { posts } from "./posts";

export const metadata: Metadata = {
  title: "Blog — Guides & Tutorials | InvoicePad",
  description: "Guides, tutorials and practical tips from InvoicePad.",
  alternates: { canonical: "https://invoicepad.net/blog/" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-16">
      <Link prefetch={false} href="/" className="text-sm text-indigo-600 hover:underline">← Back to InvoicePad</Link>
      <h1 className="mt-6 text-3xl font-bold">InvoicePad Blog</h1>
      <p className="mt-3 text-zinc-600">Guides, tutorials and practical tips.</p>
      <div className="mt-8 space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="border-b border-zinc-200 pb-6">
            <h2 className="text-xl font-semibold">
              <Link prefetch={false} href={`/blog/${p.slug}/`} className="text-zinc-900 hover:text-indigo-600">{p.title}</Link>
            </h2>
            <p className="mt-2 text-zinc-600">{p.description}</p>
            <p className="mt-2 text-sm text-zinc-400">{p.date} · {p.readingTime}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
