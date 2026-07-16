import Link from "next/link";

interface FooterProps {
  siteName: string;
  domain: string;
}

export default function Footer({ siteName, domain }: FooterProps) {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white px-5 py-10">
      <div className="mx-auto max-w-4xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="text-sm text-zinc-500">
            &copy; 2026 {siteName}. All rights reserved.
          </div>
          <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
            <Link prefetch={false} href="/blog/" className="text-zinc-600 hover:text-indigo-600 transition-colors">
              Blog
            </Link>
            <Link prefetch={false} href="/about/" className="text-zinc-600 hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link prefetch={false} href="/contact/" className="text-zinc-600 hover:text-indigo-600 transition-colors">
              Contact
            </Link>
            <Link prefetch={false} href="/privacy-policy/" className="text-zinc-600 hover:text-indigo-600 transition-colors">
              Privacy Policy
            </Link>
            <Link prefetch={false} href="/terms/" className="text-zinc-600 hover:text-indigo-600 transition-colors">
              Terms
            </Link>
          </nav>
        </div>
        <p className="mt-4 text-xs text-zinc-400">
          {domain} is a free online tool. All processing happens in your browser — your files are never uploaded.
        </p>
      </div>
    </footer>
  );
}
