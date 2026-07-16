export interface Competitor {
  slug: string;
  name: string;
  title: string;
  description: string;
  comparison: { feature: string; us: string; them: string }[];
  faq: { q: string; a: string }[];
  bodyHtml: string;
}

export const competitors: Competitor[] = [
  {
    slug: 'freshbooks-invoice',
    name: 'FreshBooks',
    title: 'InvoicePad vs FreshBooks: Free Unlimited Invoices vs $23/Month for 5 Clients',
    description: 'FreshBooks charges $23/month for 5 billable clients. InvoicePad: unlimited free invoices, browser-based PDF generation, no account.',
    comparison: [
      { feature: 'Price', us: 'Free', them: '$23-43/month' },
      { feature: 'Client limit', us: 'No limit', them: '5 (Lite), 50 (Plus)' },
      { feature: 'Account required', us: 'No', them: 'Yes' },
      { feature: 'PDF generation', us: 'Instant, browser', them: 'Built-in' },
      { feature: 'Accounting features', us: 'No — invoices only', them: 'Full accounting suite' },
    ],
    faq: [
      { q: 'Is InvoicePad a full accounting tool?', a: 'No — InvoicePad generates professional PDF invoices. For full accounting (expense tracking, tax reports, bank reconciliation), FreshBooks is the right tool.' },
      { q: 'Can I save invoice templates?', a: 'InvoicePad generates invoices on the spot. For saved templates and recurring invoices, a paid tool like FreshBooks is more suitable.' },
    ],
    bodyHtml: '<h2>$23/month to send 5 invoices</h2><p>FreshBooks Lite costs $23/month and limits you to 5 billable clients. If you are a freelancer sending a handful of invoices per month, you are paying a premium for a full accounting suite you may not need.</p><p>InvoicePad generates professional PDF invoices for free. No client limit, no monthly fee, no account required. Fill in the fields, download the PDF, send it.</p><h2>When FreshBooks is worth it</h2><p>If you need expense tracking, time tracking, recurring invoices, payment processing, and tax-ready reports, FreshBooks is worth every dollar. For everyone who just needs to send an invoice — InvoicePad is fast, free, and simple.</p>',
  },
  {
    slug: 'invoice-simple',
    name: 'Invoice Simple',
    title: 'InvoicePad vs Invoice Simple: Unlimited Free vs $6.99/Month for 3 Invoices',
    description: 'Invoice Simple limits you to 3 invoices/month on the $6.99 plan. InvoicePad: unlimited invoices, free, no subscription.',
    comparison: [
      { feature: 'Price', us: 'Free', them: '$6.99-13.49/month' },
      { feature: 'Monthly invoice limit', us: 'No limit', them: '3 (Essentials), 10 (Plus)' },
      { feature: 'Mobile app', us: 'No — browser', them: 'Yes (iOS/Android)' },
      { feature: 'Account needed', us: 'No', them: 'Yes' },
    ],
    faq: [
      { q: 'Why does Invoice Simple cap invoices?', a: 'Invoice Simple includes features like payment collection and client management that justify the subscription — but the invoice cap makes it expensive for light use.' },
    ],
    bodyHtml: '<h2>Three invoices per month for $6.99</h2><p>Invoice Simple Essentials costs $6.99/month and caps you at 3 invoices. Upgrade to Plus ($13.49/month) for 10 invoices. For freelancers who invoice occasionally, this is a steep price per invoice.</p><p>InvoicePad has no caps. Generate as many invoices as you need, for free.</p><h2>When Invoice Simple makes sense</h2><p>If you need a mobile app with payment collection, estimates, and client management, Invoice Simple\'s subscription is worth it. For quick, no-account PDF invoices — InvoicePad is the free alternative.</p>',
  },
  {
    slug: 'invoicera-invoice',
    name: 'Invoicera',
    title: 'InvoicePad vs Invoicera: Zero Account vs $15/Month + Per-Invoice Fees',
    description: 'Invoicera starts at $15/month with potential per-invoice charges. InvoicePad: free, no account, no per-invoice fees.',
    comparison: [
      { feature: 'Price', us: 'Free', them: '$15/month + extra fees' },
      { feature: 'Account', us: 'None', them: 'Required' },
      { feature: 'Per-invoice costs', us: 'Zero', them: 'Possible on low-tier plans' },
      { feature: 'Enterprise features', us: 'No', them: 'Yes (workflow, approvals)' },
    ],
    faq: [
      { q: 'Is Invoicera better for teams?', a: 'Yes — Invoicera has team workflow, approval chains, and multi-currency billing. InvoicePad is designed for solo users who need simple PDF invoices.' },
    ],
    bodyHtml: '<h2>$15/month before extra charges</h2><p>Invoicera starts at $15/month but some plans add per-invoice fees on top of the base subscription. For solo freelancers, this pricing model is hard to justify.</p><p>InvoicePad: zero dollars, zero per-invoice fees, zero account setup. Open the page, fill the form, download the PDF.</p><h2>When Invoicera is the right tool</h2><p>Invoicera is built for businesses with approval workflows, multi-currency billing, and team collaboration. For individual freelancers sending straightforward invoices, InvoicePad is simpler and free.</p>',
  },
];