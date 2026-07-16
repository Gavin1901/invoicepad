import Link from "next/link";
import { SITE } from "@/lib/invoice";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-full flex-col">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center gap-2 font-bold text-indigo-700">
            <span className="text-xl">🧾</span>
            <span>{SITE.name}</span>
          </Link>
          <nav className="flex gap-4 text-sm text-slate-600">
            <Link href="/invoice-templates" className="hover:text-indigo-700">Templates</Link>
            <Link href="/receipt-maker" className="hover:text-indigo-700">Receipt Maker</Link>
            <Link href="/estimate-generator" className="hover:text-indigo-700">Estimates</Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-5xl px-4 py-6 text-sm text-slate-500">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <Link href="/" className="hover:text-indigo-700">Invoice Generator</Link>
            <Link href="/invoice-templates" className="hover:text-indigo-700">Invoice Templates</Link>
            <Link href="/receipt-maker" className="hover:text-indigo-700">Receipt Maker</Link>
            <Link href="/estimate-generator" className="hover:text-indigo-700">Estimate Generator</Link>
            <Link href="/privacy-policy" className="hover:text-indigo-700">Privacy</Link>
            <Link href="/terms" className="hover:text-indigo-700">Terms</Link>
          </div>
          <div className="mt-4 pt-4 border-t border-stone-100">
            <p className="font-medium text-stone-700 mb-2">More Free Tools</p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
              <a href="https://plantingcalendar.net" className="hover:text-emerald-700" target="_blank" rel="noopener">Planting Calendar</a>
              <a href="https://freetdee.com" className="hover:text-emerald-700" target="_blank" rel="noopener">TDEE Calculator</a>
              <a href="https://babypercent.com" className="hover:text-emerald-700" target="_blank" rel="noopener">Baby Growth Tracker</a>
              <a href="https://zoneplan.net" className="hover:text-emerald-700" target="_blank" rel="noopener">Time Zone Planner</a>
              <a href="https://pupvax.com" className="hover:text-emerald-700" target="_blank" rel="noopener">Dog Vaccine Tracker</a>
              <a href="https://livephotokit.com" className="hover:text-emerald-700" target="_blank" rel="noopener">HEIC Converter</a>
              <a href="https://iworkviewer.com" className="hover:text-emerald-700" target="_blank" rel="noopener">iWork Viewer</a>
            </div>
          </div>
          <p className="mt-4">
            © {new Date().getFullYear()} {SITE.name}. Free invoice generator for freelancers — no sign-up,
            no watermark. Your invoice data stays in your browser and is never uploaded.
          </p>
        </div>
      </footer>
    </div>
  );
}
