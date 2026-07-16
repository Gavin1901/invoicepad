import type { Metadata } from "next";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Terms of Use — InvoicePad (2026)",
  description: "Terms of use for InvoicePad updated 2026. A free invoice generator provided for general business use; your invoice data stays in your browser and is never",
  alternates: { canonical: "https://invoicepad.net/terms" },
};

export default function Terms() {
  return (
    <SiteShell>
      <div className="mx-auto max-w-3xl px-4 py-10 prose prose-slate">
        <h1>Terms of Use</h1>
        <p>Last updated: {new Date().getFullYear()}</p>
        <p>
          By using InvoicePad (invoicepad.net) you agree to these terms. The site is provided free of
          charge, &quot;as is,&quot; for general business and invoicing use.
        </p>
        <h2>Your data</h2>
        <p>
          Invoices, receipts and estimates you create are processed in your browser and saved only to
          your device&apos;s local storage. We do not store or have access to your invoice data, and we
          are not responsible for data lost if you clear your browser, switch devices or lose your
          device. Keep your own copies of any PDFs you generate.
        </p>
        <h2>Analytics and advertising</h2>
        <p>
          We use Google Analytics for anonymous traffic measurement and Google AdSense to display
          ads. These services may use cookies. See our Privacy Policy for details.
        </p>
        <h2>No professional advice</h2>
        <p>
          InvoicePad is a document tool, not accounting, tax or legal advice. Tax rates, payment terms
          and invoicing requirements vary by country and situation — verify your obligations with a
          qualified professional. We make no guarantee that documents created here meet the legal or
          tax requirements of your jurisdiction.
        </p>
        <h2>Acceptable use</h2>
        <p>
          You may use the tool for legitimate business invoicing. You may not use it for fraudulent
          documents, and you may not scrape, republish or resell the site&apos;s content in bulk.
        </p>
        <h2>Changes</h2>
        <p>We may update these terms at any time. Continued use means you accept the changes.</p>
      </div>
    </SiteShell>
  );
}
