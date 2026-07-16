export type FAQ = { q: string; a: string };
export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  date: string;
  readingTime: string;
  bodyHtml: string;
  faq: FAQ[];
};

export const posts: BlogPost[] = [
  {
    slug: "how-to-write-an-invoice-freelancer",
    title: "How to Write an Invoice as a Freelancer (2026)",
    description:
      "A step-by-step 2026 guide for freelancers on how to write a clear, professional invoice that gets you paid faster, with no sign-up required.",
    date: "2026-06-27",
    readingTime: "7 min read",
    bodyHtml: `<p>Writing an invoice is one of those tasks that feels intimidating the first time and trivial the hundredth time. As a freelancer, your invoice is the document that actually turns finished work into money in your bank account, so it pays to get it right. This guide walks you through exactly how to write an invoice from scratch in 2026, what to put on it, and a few habits that quietly improve how fast you get paid.</p>

<h2>Why your invoice matters more than you think</h2>
<p>A sloppy invoice creates friction. If a client cannot tell who sent it, what it covers, how much is owed, or how to pay, they will set it aside and your payment slips down their priority list. A clean, unambiguous invoice removes every excuse for delay. It also signals that you run a real business, which makes clients treat you more seriously. You do not need expensive software to look professional. A free <a href="/">invoice generator</a> that lets you fill in the fields and download a PDF is more than enough.</p>

<h2>Step 1: Add your business details and a clear header</h2>
<p>Start with the word <strong>Invoice</strong> at the top so there is zero confusion about what the document is. Underneath, include your name or business name, your address, your email, and your phone number if you use one. If you have a logo, add it, but plain text is perfectly fine. The goal is for the client to instantly know who is asking to be paid.</p>

<h2>Step 2: Add the client's details</h2>
<p>List the client's company name, the name of the specific person who approves payment, and their billing address or email. Invoices sent to a generic inbox get lost. Whenever possible, address it to the individual who signs off on spending.</p>

<h2>Step 3: Assign a unique invoice number</h2>
<p>Every invoice needs a unique <strong>invoice number</strong>. This is not bureaucracy for its own sake. It lets you and your client reference a specific bill in emails, it keeps your records clean at tax time, and it prevents two invoices from being confused. A simple sequential system works well: start at INV-001 and count up. Some freelancers prefix the year, like 2026-014. Pick a format and never reuse a number.</p>

<h2>Step 4: Add issue date and due date</h2>
<p>The issue date is the day you send the invoice. The due date tells the client exactly when payment is expected. Do not write something vague like "due soon." Write a real date. If you use payment terms such as <strong>Net 15</strong> or <strong>Net 30</strong>, calculate the actual due date and print it. A client who sees "Due: 27 July 2026" has no room to misremember.</p>

<h2>Step 5: List your line items</h2>
<p>This is the heart of the invoice. Each <strong>line item</strong> should describe the work, the quantity or hours, the rate, and the line total. Be specific. Compare these two descriptions:</p>
<ul>
<li>Bad: "Design work"</li>
<li>Good: "Homepage redesign, 12 hours at 60 per hour"</li>
</ul>
<p>The detailed version answers questions before they are asked and protects you if the client queries the bill later. You can list time-based work, fixed-price deliverables, or both. Add a subtotal beneath the line items.</p>

<h2>Step 6: Handle tax correctly</h2>
<p>Whether you charge tax depends on where you live and where your client is. Some freelancers add sales tax or VAT as a separate line below the subtotal; others are below the threshold where registration is required. Show any tax clearly as its own line with the rate, then a final total. This is general information, not tax advice, so confirm your obligations with a qualified accountant for your country and situation.</p>

<h2>Step 7: State payment terms and methods</h2>
<p>Tell the client how to pay you. Include your bank transfer details, a payment link, or whatever method you accept. State your terms plainly, for example "Payment due within 14 days of the invoice date." If you charge a late fee, mention it here, such as "A late fee of 2 percent per month applies to overdue balances." Clear terms set expectations and give you leverage if payment drags.</p>

<h2>Step 8: Add a short, friendly note</h2>
<p>A single line like "Thank you for your business, it was a pleasure working with you" costs nothing and keeps the relationship warm. You can also remind the client of the due date here.</p>

<h2>Step 9: Review, export, and send</h2>
<p>Before you send, check the math, the client name, the invoice number, and the due date. One wrong digit can delay payment by a week. Export the invoice as a <strong>PDF</strong> so it looks identical on every device and cannot be accidentally edited. Attach it to a short, polite email with the invoice number in the subject line.</p>

<h2>A simple workflow that gets you paid faster</h2>
<p>Send invoices promptly. The longer you wait after finishing work, the longer the payment clock starts. Send a friendly reminder a few days before the due date, and another the day it passes if you hear nothing. Keep a copy of every invoice you issue. With a free <a href="/">invoice generator</a> you can build, download, and send a polished invoice in a couple of minutes without creating an account.</p>

<p><strong>Note:</strong> This article is general information for freelancers and is not legal or tax advice. Rules vary by country and situation, so consult a qualified professional for guidance specific to you.</p>

<h2>Frequently Asked Questions</h2>`,
    faq: [
      {
        q: "Do I need accounting software to write an invoice?",
        a: "No. You can write a fully professional invoice with a free online invoice generator that lets you fill in the fields and download a PDF, with no sign-up needed.",
      },
      {
        q: "What invoice number should I start with?",
        a: "Any unique sequence works. Many freelancers start at INV-001 and count up, or use a year prefix like 2026-001. The only rule is to never reuse a number.",
      },
      {
        q: "How detailed should my line items be?",
        a: "Detailed enough that the client understands exactly what they are paying for. Include a description, the quantity or hours, the rate, and the line total.",
      },
      {
        q: "Should I include tax on my invoice?",
        a: "It depends on where you and your client are based and whether you are registered for sales tax or VAT. Show any tax as a separate line, and confirm your obligations with an accountant.",
      },
      {
        q: "When should I send the invoice?",
        a: "Send it as soon as the work is complete or at the agreed milestone. The sooner you invoice, the sooner the payment clock starts.",
      },
      {
        q: "What format should I send the invoice in?",
        a: "Send a PDF. It looks the same on every device, cannot be accidentally edited, and reads as professional.",
      },
      {
        q: "What if a client does not pay on time?",
        a: "Send a polite reminder near the due date and again after it passes. Clear payment terms and a stated late fee give you leverage to follow up firmly.",
      },
    ],
  },
  {
    slug: "what-to-include-on-an-invoice",
    title: "What to Include on a Professional Invoice (2026)",
    description:
      "The complete 2026 checklist of what to include on a professional invoice, from invoice numbers to tax lines, so freelancers get paid without delays.",
    date: "2026-06-27",
    readingTime: "6 min read",
    bodyHtml: `<p>A professional invoice is more than a request for money. It is a record, a contract reference, and often the last impression a client has of a project. Leave out a key detail and you create confusion, delays, and back-and-forth emails. This 2026 checklist covers exactly what to include on an invoice so it is complete, clear, and ready to be paid the moment it lands.</p>

<h2>The essential elements every invoice needs</h2>
<p>Before worrying about polish, make sure the core building blocks are present. These are the elements a client, a bookkeeper, or a tax authority expects to see.</p>

<h3>1. The word "Invoice"</h3>
<p>Label the document clearly. This separates it from a quote, an estimate, or a receipt. A client should never have to guess what they are looking at.</p>

<h3>2. Your business identity</h3>
<p>Include your name or trading name, address, email, and phone number. If you have a registered business number or tax ID, add it. This tells the client who is owed money and where to reach you with questions.</p>

<h3>3. The client's details</h3>
<p>Add the client's company name, the contact person responsible for payment, and their billing address or email. Sending an invoice to the right person is half the battle in getting paid on time.</p>

<h3>4. A unique invoice number</h3>
<p>Every invoice needs its own <strong>invoice number</strong>. It is how you and the client reference the bill, how you keep your books in order, and how you avoid duplicates. A simple running sequence like INV-001, INV-002 works perfectly, or use a dated format like 2026-031.</p>

<h3>5. Issue date and due date</h3>
<p>The issue date anchors your records and your payment terms. The due date removes ambiguity. Always print an actual calendar date for the due date rather than a vague phrase. If you offer <strong>Net 30</strong> terms, calculate and show the resulting date.</p>

<h2>The financial details</h2>

<h3>6. Itemized line items</h3>
<p>List each piece of work as a separate <strong>line item</strong> with a description, quantity or hours, unit rate, and line total. Specificity protects you. "Copywriting, 8 hours at 55 per hour" is far harder to dispute than "writing services." Group related work logically so the invoice reads top to bottom without effort.</p>

<h3>7. Subtotal</h3>
<p>Add up all line items into a clear subtotal before tax or discounts. This gives the client an anchor figure and makes the rest of the math easy to follow.</p>

<h3>8. Discounts, if any</h3>
<p>If you agreed a discount, show it as its own line so the client sees both the full value of your work and the reduced amount. This keeps the perceived value of your services high.</p>

<h3>9. Tax</h3>
<p>If you charge sales tax or VAT, list it as a separate line with the rate clearly stated, then show the grand total including tax. If you are not registered to charge tax, you can simply omit this line. Tax rules differ by country and by your registration status, so treat this as general information and confirm the specifics with an accountant.</p>

<h3>10. The total amount due</h3>
<p>Make the final total the most visible number on the page. Bold it, put it in a slightly larger size, or box it. The client should be able to glance at the invoice and instantly see what they owe.</p>

<h2>The details that get you paid faster</h2>

<h3>11. Payment terms</h3>
<p>State your terms in plain language, such as "Payment due within 15 days." Spell out accepted methods, whether that is bank transfer, a payment link, or another option. Include the account details or link directly on the invoice so there is no extra step.</p>

<h3>12. Late payment policy</h3>
<p>If you charge for overdue payments, say so, for example "A late fee of 1.5 percent per month applies after the due date." Even when you rarely enforce it, stating the policy encourages clients to pay on time.</p>

<h3>13. Notes or thank-you line</h3>
<p>A short note adds a human touch and can carry useful reminders, such as a project reference or the due date repeated one more time.</p>

<h2>Presentation matters too</h2>
<p>Beyond the content, how the invoice looks affects how quickly it is acted on. Keep the layout clean, use consistent fonts, and align numbers so they are easy to scan. Export the finished document as a <strong>PDF</strong> so it displays identically everywhere and cannot be altered in transit. You do not need a designer for this. A free <a href="/">invoice generator</a> handles the layout for you, fills in every element on this checklist, and lets you download a tidy PDF without creating an account.</p>

<h2>Quick checklist recap</h2>
<ol>
<li>Labeled clearly as an invoice</li>
<li>Your business details</li>
<li>Client details</li>
<li>Unique invoice number</li>
<li>Issue date and due date</li>
<li>Itemized line items</li>
<li>Subtotal, discounts, and tax</li>
<li>A prominent total due</li>
<li>Payment terms and methods</li>
<li>Late payment policy and a closing note</li>
</ol>

<p><strong>Note:</strong> This article is general information for freelancers and is not legal or tax advice. Requirements vary by location, so consult a qualified professional for your specific circumstances.</p>

<h2>Frequently Asked Questions</h2>`,
    faq: [
      {
        q: "What are the absolute must-have elements on an invoice?",
        a: "The word invoice, your details, the client's details, a unique invoice number, the issue and due dates, itemized line items, the total amount due, and payment instructions.",
      },
      {
        q: "Do I need a tax ID or business number on my invoice?",
        a: "If you have a registered business number or tax ID, including it adds credibility and may be required in some countries. Check your local rules with an accountant.",
      },
      {
        q: "Should the total be the biggest thing on the page?",
        a: "It should be the most visible. Make the total amount due bold or boxed so the client can see what they owe at a glance.",
      },
      {
        q: "How do I show a discount on an invoice?",
        a: "List it as its own line beneath the subtotal so the client sees both the full value of your work and the reduced amount they are paying.",
      },
      {
        q: "Where do I put my payment details?",
        a: "Directly on the invoice. Include your bank transfer details or a payment link plus your terms so the client can pay without any extra steps.",
      },
      {
        q: "Is a thank-you note necessary?",
        a: "It is optional but worthwhile. A short note keeps the relationship warm and is a good place to repeat the due date or a project reference.",
      },
      {
        q: "Why export as a PDF?",
        a: "A PDF looks identical on every device, reads as professional, and cannot be accidentally edited, which protects both you and the client.",
      },
    ],
  },
  {
    slug: "invoice-payment-terms-explained",
    title: "Invoice Payment Terms Explained for Freelancers (2026)",
    description:
      "Net 15, Net 30, deposits, late fees and more: a plain-English 2026 guide to invoice payment terms that help freelancers get paid on time.",
    date: "2026-06-27",
    readingTime: "7 min read",
    bodyHtml: `<p>Payment terms are the rules that decide when and how you get paid. For freelancers, they are one of the most underused tools for improving cash flow. Set them well and clients pay predictably. Leave them vague and you spend your evenings chasing money. This 2026 guide explains the common invoice payment terms in plain English, when to use each one, and how to enforce them without damaging client relationships.</p>

<h2>What "payment terms" actually means</h2>
<p>Payment terms are the conditions under which you expect to be paid. They cover the deadline, the accepted methods, any upfront deposit, and what happens if payment is late. They belong on every invoice and, ideally, in the contract or agreement you sign before starting work. The invoice simply restates what was already agreed.</p>

<h2>The most common payment terms</h2>

<h3>Net 15, Net 30, and Net 60</h3>
<p>The word <strong>Net</strong> followed by a number means payment is due that many days after the invoice date. <strong>Net 15</strong> means due in 15 days, <strong>Net 30</strong> means due in 30 days, and so on. Net 30 is the most common term in business, but it ties up your cash for a month. As a freelancer you are usually better served by shorter terms like Net 7 or Net 14, because you do not have the cash reserves of a large company. Always calculate the actual due date from the term and print it on the invoice so the client cannot misremember.</p>

<h3>Due on receipt</h3>
<p>This means payment is expected immediately when the invoice arrives. It is the fastest term and works well for small jobs, new clients, or one-off projects. Some clients with rigid accounts payable cycles will quietly treat "due on receipt" as Net 15 or Net 30 anyway, so know your client before relying on it.</p>

<h3>Deposits and upfront payment</h3>
<p>For larger projects, asking for a deposit before you start is one of the smartest protections you have. A common structure is 50 percent upfront and 50 percent on completion. The deposit confirms the client is serious, funds your work in progress, and limits how much you can lose if a project falls apart. For ongoing work, some freelancers bill 100 percent upfront for each milestone.</p>

<h3>Milestone or staged payments</h3>
<p>On long projects, split the total into stages tied to deliverables. For example, one third at kickoff, one third at the draft, and one third at delivery. This keeps cash flowing throughout the project rather than forcing you to wait until the very end, and it reduces your exposure if the client disappears.</p>

<h3>Recurring or retainer terms</h3>
<p>If you work with a client every month, a retainer with fixed monthly billing simplifies everything. You agree a sum and a billing date, send the same invoice each cycle, and both sides know exactly what to expect.</p>

<h2>Late fees and how to use them</h2>
<p>A <strong>late fee</strong> is a penalty applied when a client pays after the due date. A typical structure is a percentage of the overdue balance per month, such as 1.5 to 2 percent, or a flat fee. To be enforceable in practice, the late fee should be agreed in your contract and restated on the invoice, for example "A late fee of 2 percent per month applies to balances unpaid after the due date."</p>
<p>The point of a late fee is rarely the extra money. It is to make paying you on time the path of least resistance. Many freelancers waive the fee for good clients who slip once, but having it on paper gives you a firm, professional basis to follow up. Whether late fees are legally enforceable depends on your jurisdiction, so treat this as general information and confirm with a professional.</p>

<h2>Discounts for early payment</h2>
<p>The opposite of a late fee is an early payment discount. A term written as "2/10 Net 30" means the client can take a 2 percent discount if they pay within 10 days, otherwise the full amount is due in 30. This can speed up cash flow, but only offer it if the faster payment is worth more to you than the discount you give up.</p>

<h2>How to choose the right terms</h2>
<p>Match your terms to the risk. New client or large project? Ask for a deposit and use short net terms. Long-standing client who always pays? You can be more relaxed. The size of the job, your cash position, and your relationship with the client all factor in. The golden rule is to agree terms in writing before you start, never after the work is done.</p>

<h2>Making terms work on the invoice</h2>
<p>Even the best terms fail if the client cannot find them. State them clearly on the invoice, show the calculated due date, list the accepted payment methods, and include any late fee policy. A free <a href="/">invoice generator</a> lets you add all of this and download a clean PDF in minutes, with no sign-up. Send the invoice promptly, send a reminder a few days before the due date, and follow up the moment a payment becomes overdue.</p>

<h2>A simple payment terms playbook</h2>
<ul>
<li>Agree terms in the contract before work begins</li>
<li>Ask new clients and large projects for a deposit</li>
<li>Use short net terms like Net 7 or Net 14 to protect cash flow</li>
<li>Always print the actual due date, not just the term</li>
<li>State your late fee policy clearly and consistently</li>
<li>Send invoices and reminders on time, every time</li>
</ul>

<p><strong>Note:</strong> This article is general information for freelancers and is not legal or tax advice. The enforceability of terms and late fees varies by location, so consult a qualified professional for advice specific to you.</p>

<h2>Frequently Asked Questions</h2>`,
    faq: [
      {
        q: "What does Net 30 mean on an invoice?",
        a: "Net 30 means payment is due 30 days after the invoice date. Net 15 means 15 days, and so on. Always calculate and print the actual due date.",
      },
      {
        q: "What payment terms are best for freelancers?",
        a: "Shorter terms like Net 7 or Net 14, plus a deposit for larger projects. Freelancers lack the cash reserves to comfortably wait 30 or 60 days.",
      },
      {
        q: "Should I ask for a deposit upfront?",
        a: "For larger projects, yes. A common structure is 50 percent upfront and 50 percent on completion. It confirms commitment and limits your risk.",
      },
      {
        q: "How much should a late fee be?",
        a: "A typical late fee is 1.5 to 2 percent of the overdue balance per month, or a flat fee. Agree it in the contract and restate it on the invoice.",
      },
      {
        q: "Are late fees legally enforceable?",
        a: "It depends on your jurisdiction and whether the fee was agreed in writing beforehand. This is general information, so confirm enforceability with a professional.",
      },
      {
        q: "What does due on receipt mean?",
        a: "It means payment is expected immediately when the invoice is received. It is the fastest term and suits small jobs or new clients.",
      },
      {
        q: "What is an early payment discount?",
        a: "It is an incentive to pay sooner. A term like 2/10 Net 30 lets the client take 2 percent off if they pay within 10 days, otherwise the full amount is due in 30.",
      },
      {
        q: "Where should payment terms be stated?",
        a: "Agree them in your contract before work starts, then restate them clearly on every invoice along with the calculated due date and accepted payment methods.",
      },
    ],
  },
];
