import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Privacy Policy — InvoicePad (2026)",
  description: "How InvoicePad handles your data in 2026. Your invoice data is processed entirely in your browser and never uploaded to any server.",
  alternates: { canonical: "https://invoicepad.net/privacy-policy" },
};

export default function Privacy() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Privacy Policy</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>
          InvoicePad (invoicepad.net) is a free invoice generator for freelancers. We respect your
          privacy and collect as little data as possible.
        </p>
        <h2>Your invoice data</h2>
        <p>
          The invoices you create — your business details, your clients&apos; details and your line
          items — are processed entirely inside your own browser. To make your next invoice faster, a
          draft (including your &quot;From&quot; details, currency, notes and last invoice number) is
          saved in your browser&apos;s local storage. This data <strong>never leaves your device and is
          never uploaded to our servers</strong>. We cannot see your invoices or your clients. To
          erase the saved draft, click &quot;Clear / new&quot; in the tool or clear your browser
          storage.
        </p>
        <h2>Analytics</h2>
        <p>
          We use Google Analytics to understand aggregate, anonymous traffic patterns (such as which
          pages are popular). Google Analytics may set cookies. No personally identifying information
          is collected.
        </p>
        <h2>Advertising</h2>
        <p>
          We display ads through Google AdSense. Google and its partners may use cookies to serve ads
          based on your prior visits to this and other websites. You can opt out of personalized
          advertising by visiting Google&apos;s Ads Settings.
        </p>
        <h2>Contact</h2>
        <p>For privacy questions, contact us via the email listed in our domain registration.</p>
      </div>
    </SiteShell>
  );
}
