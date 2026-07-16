// 发票核心引擎 —— 纯计算，零依赖、零上传、零API成本
// 所有数据只在浏览器里，程序化SEO的心脏 = PROFESSIONS 数据矩阵

// ── 货币 ────────────────────────────────────────────────────
export type CurrencyCode = "USD" | "EUR" | "GBP" | "AUD" | "CAD";

export interface CurrencyInfo {
  code: CurrencyCode;
  symbol: string;
  label: string;
  locale: string;
}

export const CURRENCIES: CurrencyInfo[] = [
  { code: "USD", symbol: "$", label: "US Dollar", locale: "en-US" },
  { code: "EUR", symbol: "€", label: "Euro", locale: "de-DE" },
  { code: "GBP", symbol: "£", label: "British Pound", locale: "en-GB" },
  { code: "AUD", symbol: "A$", label: "Australian Dollar", locale: "en-AU" },
  { code: "CAD", symbol: "C$", label: "Canadian Dollar", locale: "en-CA" },
];

// ── 税务：多国税务场景 ──────────────────────────────────────
export type TaxCountry = "US" | "UK" | "EU" | "AU" | "CA" | "OTHER";

export interface TaxInfo {
  country: TaxCountry;
  label: string;
  /** 标准税率% */
  defaultRate: number;
  /** 税种叫法 */
  taxName: string;
  /** 税务登记号叫法 */
  idLabel: string;
  /** 税务登记号示例 */
  idExample: string;
  /** 提示 */
  note: string;
  /** 关联货币 */
  currency: CurrencyCode;
}

export const TAX_REGIMES: TaxInfo[] = [
  {
    country: "US",
    label: "United States",
    defaultRate: 0,
    taxName: "Sales Tax (varies by state)",
    idLabel: "EIN or SSN",
    idExample: "XX-XXXXXXX",
    note: "US freelancers: no federal sales tax. State sales tax varies (0%–10%). Provide W-9 form to US clients. Report 1099 income.",
    currency: "USD",
  },
  {
    country: "UK",
    label: "United Kingdom",
    defaultRate: 20,
    taxName: "VAT",
    idLabel: "VAT Registration Number",
    idExample: "GB 123 4567 89",
    note: "UK VAT is 20% standard. Register for VAT if turnover exceeds £90,000 (2026 threshold). VAT-registered freelancers must charge VAT and file quarterly returns via MTD.",
    currency: "GBP",
  },
  {
    country: "EU",
    label: "European Union",
    defaultRate: 21,
    taxName: "VAT (varies by country)",
    idLabel: "VAT ID",
    idExample: "DE123456789",
    note: "EU VAT rates: Germany 19%, France 20%, Netherlands 21%, Spain 21%, Italy 22%, Ireland 23%. Cross-border B2B: reverse-charge (0% VAT with client VAT ID). MOSS/OSS for digital services to consumers.",
    currency: "EUR",
  },
  {
    country: "AU",
    label: "Australia",
    defaultRate: 10,
    taxName: "GST",
    idLabel: "ABN",
    idExample: "12 345 678 901",
    note: "Australia GST is 10%. Register for GST if turnover exceeds A$75,000. Must have an ABN to invoice. GST-registered businesses include GST on invoices and claim input tax credits via BAS.",
    currency: "AUD",
  },
  {
    country: "CA",
    label: "Canada",
    defaultRate: 5,
    taxName: "GST / HST (varies by province)",
    idLabel: "BN (Business Number)",
    idExample: "123456789 RT 0001",
    note: "Canada: GST 5% federal. HST provinces: Ontario 13%, NB/NL/PEI/NS 15%. Provincial sales tax (PST) in BC, SK, MB, QC. Register for GST/HST if revenue exceeds C$30,000. File GST/HST returns.",
    currency: "CAD",
  },
  {
    country: "OTHER",
    label: "Other / No Tax",
    defaultRate: 0,
    taxName: "Tax",
    idLabel: "Tax ID (if applicable)",
    idExample: "",
    note: "Tax rules vary by country. Consult a local accountant for your jurisdiction's requirements.",
    currency: "USD",
  },
];

export const taxByCountry = (code: string) =>
  TAX_REGIMES.find((t) => t.country === code) ?? TAX_REGIMES[5];

export const currencyByCode = (code: string) =>
  CURRENCIES.find((c) => c.code === code) ?? CURRENCIES[0];

/** 货币格式化，纯 Intl，无依赖 */
export function formatMoney(amount: number, code: CurrencyCode = "USD"): string {
  const c = currencyByCode(code);
  try {
    return new Intl.NumberFormat(c.locale, {
      style: "currency",
      currency: c.code,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(isFinite(amount) ? amount : 0);
  } catch {
    return `${c.symbol}${(isFinite(amount) ? amount : 0).toFixed(2)}`;
  }
}

// ── 发票数据模型 ────────────────────────────────────────────
export interface LineItem {
  description: string;
  qty: number;
  rate: number;
}

// ── 里程碑项（Milestone billing用） ────────────────────────
export interface Milestone {
  name: string;
  amount: number;
  dueDate: string; // ISO yyyy-mm-dd
}

// ── 计费模型 ────────────────────────────────────────────────
export type BillingModelType = "hourly" | "fixed" | "retainer" | "milestone";

export interface BillingModelInfo {
  type: BillingModelType;
  label: string;
  desc: string;
}

export const BILLING_MODELS: BillingModelInfo[] = [
  { type: "hourly", label: "Hourly", desc: "Charge by the hour — add rate/hr and hours" },
  { type: "fixed", label: "Fixed Price", desc: "One price per line item — simple and clear" },
  { type: "retainer", label: "Retainer", desc: "Monthly or periodic retainer — add period and scope" },
  { type: "milestone", label: "Milestone", desc: "Project milestones — name, amount, due date each" },
];

export interface Invoice {
  from: string;
  to: string;
  items: LineItem[];
  taxRate: number; // 百分比，如 8.5 表示 8.5%
  notes: string;
  currency: CurrencyCode;
  invoiceNumber: string;
  date: string; // ISO yyyy-mm-dd
  dueDate: string; // ISO yyyy-mm-dd
  // 🟡 2026新增：计费模型 + 税务国别 + 里程碑
  billingModel: BillingModelType;
  taxCountry: TaxCountry;
  milestones: Milestone[];
  retainerPeriod: string; // 如 "June 2026"
  retainerScope: string;  // 如 "Monthly social media management — 3 platforms"
}

// ── 计算函数 ────────────────────────────────────────────────
export function lineTotal(item: LineItem): number {
  const q = Number(item.qty) || 0;
  const r = Number(item.rate) || 0;
  return q * r;
}

export function subtotal(items: LineItem[]): number {
  return items.reduce((sum, it) => sum + lineTotal(it), 0);
}

export function taxAmount(items: LineItem[], taxRate: number): number {
  const rate = Number(taxRate) || 0;
  return subtotal(items) * (rate / 100);
}

export function grandTotal(items: LineItem[], taxRate: number): number {
  return subtotal(items) + taxAmount(items, taxRate);
}

// ── 程序化SEO矩阵：职业 ──────────────────────────────────────
export type BillingModel = "Hourly" | "Per project" | "Per deliverable" | "Retainer" | "Day rate";

export interface Profession {
  slug: string;
  name: string; // 单数名词，如 "Graphic Designer"
  plural: string; // "graphic designers"
  emoji: string;
  /** 一句话定位 */
  blurb: string;
  /** 最常见的计费方式 */
  billing: BillingModel;
  /** 典型费率说明 */
  rateNote: string;
  /** 该职业发票上常见的行项目示例 */
  sampleItems: { description: string; qty: number; rate: number }[];
  /** 该职业开票时容易漏掉/踩坑的点 */
  tips: string[];
  /** 常见付款条款 */
  terms: string;
}

export const PROFESSIONS: Profession[] = [
  {
    slug: "graphic-designer",
    name: "Graphic Designer",
    plural: "graphic designers",
    emoji: "🎨",
    blurb: "Logos, brand identity, print and digital design work.",
    billing: "Per project",
    rateNote: "Most graphic designers bill per project or per deliverable, with hourly rates ($45–$120/hr) reserved for revisions and small fixes.",
    sampleItems: [
      { description: "Logo design — 3 concepts + revisions", qty: 1, rate: 850 },
      { description: "Brand style guide (PDF)", qty: 1, rate: 400 },
      { description: "Social media template pack", qty: 1, rate: 250 },
    ],
    tips: [
      "List each deliverable as its own line so clients see exactly what they paid for.",
      "Charge separately for extra revision rounds beyond your agreed limit.",
      "Note that final source files are released on full payment.",
    ],
    terms: "50% deposit upfront, balance due on delivery of final files. Net 14.",
  },
  {
    slug: "web-developer",
    name: "Web Developer",
    plural: "web developers",
    emoji: "💻",
    blurb: "Websites, web apps, integrations and ongoing maintenance.",
    billing: "Hourly",
    rateNote: "Web developers commonly bill hourly ($50–$150/hr) for builds and on retainer for maintenance.",
    sampleItems: [
      { description: "Front-end development — 24 hrs @ $95", qty: 24, rate: 95 },
      { description: "API integration", qty: 1, rate: 600 },
      { description: "Monthly maintenance retainer", qty: 1, rate: 350 },
    ],
    tips: [
      "Break hours out by phase (design, build, QA) so clients understand the work.",
      "Itemize third-party costs like hosting or licenses as pass-through line items.",
      "Put hosting and maintenance on a recurring retainer invoice for steady income.",
    ],
    terms: "Net 15. Late payments accrue 1.5% monthly interest.",
  },
  {
    slug: "freelance-writer",
    name: "Freelance Writer",
    plural: "freelance writers",
    emoji: "✍️",
    blurb: "Articles, blog posts, copywriting and content packages.",
    billing: "Per deliverable",
    rateNote: "Writers bill per word, per article or per project — typically $0.10–$1.00/word or $150–$800 per article.",
    sampleItems: [
      { description: "Blog post — 1,500 words", qty: 1, rate: 350 },
      { description: "Website copy — 4 pages", qty: 4, rate: 200 },
      { description: "Email newsletter", qty: 1, rate: 150 },
    ],
    tips: [
      "Spell out the word count and revision rounds on each line item.",
      "Bill a kill fee if a client cancels a commissioned piece.",
      "Use per-deliverable pricing rather than hourly — clients prefer fixed costs.",
    ],
    terms: "Net 30. 50% deposit for projects over $1,000.",
  },
  {
    slug: "photographer",
    name: "Photographer",
    plural: "photographers",
    emoji: "📷",
    blurb: "Portraits, events, product, real estate and commercial shoots.",
    billing: "Day rate",
    rateNote: "Photographers bill a session or day rate ($200–$2,500) plus add-ons for editing, prints and licensing.",
    sampleItems: [
      { description: "Half-day session (4 hrs)", qty: 1, rate: 650 },
      { description: "Photo editing & retouching — 30 images", qty: 30, rate: 12 },
      { description: "Commercial usage license (1 year)", qty: 1, rate: 400 },
    ],
    tips: [
      "Separate the shoot fee from editing and licensing so each is clearly priced.",
      "Charge a non-refundable booking deposit to hold the date.",
      "Spell out usage rights — commercial licensing is billable, not free.",
    ],
    terms: "Non-refundable 30% booking deposit, balance due before gallery delivery.",
  },
  {
    slug: "consultant",
    name: "Consultant",
    plural: "consultants",
    emoji: "📊",
    blurb: "Strategy, advisory and professional consulting engagements.",
    billing: "Hourly",
    rateNote: "Consultants bill hourly ($100–$400/hr), by day, or on a fixed-scope retainer.",
    sampleItems: [
      { description: "Strategy consulting — 10 hrs @ $200", qty: 10, rate: 200 },
      { description: "Written recommendations report", qty: 1, rate: 750 },
      { description: "Monthly advisory retainer", qty: 1, rate: 2000 },
    ],
    tips: [
      "Show your hourly rate and hours so high fees are transparent.",
      "Bundle recurring advisory into a monthly retainer for predictable cash flow.",
      "Reference the engagement or SOW number for the client's records.",
    ],
    terms: "Net 15. Retainers billed on the 1st of each month.",
  },
  {
    slug: "virtual-assistant",
    name: "Virtual Assistant",
    plural: "virtual assistants",
    emoji: "🗂️",
    blurb: "Admin, inbox, scheduling and back-office support.",
    billing: "Hourly",
    rateNote: "VAs bill hourly ($25–$75/hr) or sell monthly hour packages.",
    sampleItems: [
      { description: "Admin support — 20 hrs @ $35", qty: 20, rate: 35 },
      { description: "Inbox & calendar management (monthly)", qty: 1, rate: 500 },
      { description: "Travel booking & coordination", qty: 1, rate: 120 },
    ],
    tips: [
      "Track hours with a simple log and reference it on the invoice.",
      "Sell prepaid hour packages so clients commit and you get paid upfront.",
      "List recurring monthly tasks as a single retainer line.",
    ],
    terms: "Prepaid monthly, or Net 7 for hourly work.",
  },
  {
    slug: "translator",
    name: "Translator",
    plural: "translators",
    emoji: "🌐",
    blurb: "Document, website and certified translation services.",
    billing: "Per deliverable",
    rateNote: "Translators bill per word ($0.08–$0.25/word) or per page, with rush surcharges.",
    sampleItems: [
      { description: "Document translation — 4,200 words @ $0.12", qty: 4200, rate: 0.12 },
      { description: "Certified translation stamp", qty: 1, rate: 45 },
      { description: "Rush surcharge (24-hour turnaround)", qty: 1, rate: 120 },
    ],
    tips: [
      "State the source and target language plus the word count on each line.",
      "Add a clear rush surcharge line for tight deadlines.",
      "Bill proofreading and certification as separate items.",
    ],
    terms: "Net 14. Rush jobs payable on delivery.",
  },
  {
    slug: "tutor",
    name: "Tutor",
    plural: "tutors",
    emoji: "📚",
    blurb: "Academic tutoring, test prep and lessons.",
    billing: "Hourly",
    rateNote: "Tutors bill per hour or per session ($30–$120/hr), often in prepaid lesson packs.",
    sampleItems: [
      { description: "Math tutoring — 8 sessions @ $55", qty: 8, rate: 55 },
      { description: "Test prep materials", qty: 1, rate: 40 },
      { description: "Progress assessment", qty: 1, rate: 30 },
    ],
    tips: [
      "Sell sessions in prepaid packs of 5 or 10 to lock in commitment.",
      "Note your cancellation policy on the invoice.",
      "List the dates of sessions delivered for parents' records.",
    ],
    terms: "Packs prepaid; single sessions Net 7.",
  },
  {
    slug: "coach",
    name: "Coach",
    plural: "coaches",
    emoji: "🎯",
    blurb: "Life, business, career and performance coaching.",
    billing: "Per project",
    rateNote: "Coaches sell packages or monthly programs ($200–$2,000/month) rather than single sessions.",
    sampleItems: [
      { description: "12-week coaching program", qty: 1, rate: 1800 },
      { description: "Single 60-min session", qty: 2, rate: 150 },
      { description: "Workbook & resources", qty: 1, rate: 60 },
    ],
    tips: [
      "Sell programs, not one-off calls — it raises lifetime value.",
      "Offer a payment plan line if you split program fees monthly.",
      "Keep refund and rescheduling terms visible.",
    ],
    terms: "Program fee due upfront, or 3 monthly installments.",
  },
  {
    slug: "social-media-manager",
    name: "Social Media Manager",
    plural: "social media managers",
    emoji: "📱",
    blurb: "Content, scheduling, community and paid social.",
    billing: "Retainer",
    rateNote: "Social media managers work on monthly retainers ($500–$5,000/month) by platform and post volume.",
    sampleItems: [
      { description: "Monthly management retainer — 3 platforms", qty: 1, rate: 1500 },
      { description: "Content creation — 20 posts", qty: 20, rate: 35 },
      { description: "Ad campaign management (10% of spend)", qty: 1, rate: 300 },
    ],
    tips: [
      "Bill management and content creation as separate lines.",
      "Pass ad spend through clearly — it is not part of your fee.",
      "Invoice retainers at the start of the month, not the end.",
    ],
    terms: "Retainer due on the 1st, Net 7.",
  },
  {
    slug: "video-editor",
    name: "Video Editor",
    plural: "video editors",
    emoji: "🎬",
    blurb: "Editing, color, motion graphics and post-production.",
    billing: "Per project",
    rateNote: "Video editors bill per finished minute, per project, or hourly ($40–$150/hr).",
    sampleItems: [
      { description: "YouTube video edit — 12 min finished", qty: 1, rate: 450 },
      { description: "Motion graphics intro", qty: 1, rate: 200 },
      { description: "Additional revision round", qty: 1, rate: 120 },
    ],
    tips: [
      "Define how many revision rounds are included, then bill extras.",
      "Charge separately for motion graphics and color grading.",
      "Deliver finals on payment; release project files only if contracted.",
    ],
    terms: "50% deposit, balance on final export. Net 14.",
  },
  {
    slug: "ui-designer",
    name: "UI Designer",
    plural: "UI designers",
    emoji: "🖌️",
    blurb: "App and product interface, UX and design systems.",
    billing: "Per project",
    rateNote: "UI/UX designers bill per project or hourly ($60–$180/hr), sometimes on a sprint basis.",
    sampleItems: [
      { description: "Mobile app UI — 8 screens", qty: 8, rate: 350 },
      { description: "Design system & components", qty: 1, rate: 1200 },
      { description: "Prototype & handoff", qty: 1, rate: 500 },
    ],
    tips: [
      "Price by screens or flows so scope is explicit.",
      "Charge for design-system work separately — it has lasting value.",
      "Bill developer handoff and prototyping as their own lines.",
    ],
    terms: "40% deposit, milestone billing per sprint. Net 15.",
  },
  {
    slug: "seo-specialist",
    name: "SEO Specialist",
    plural: "SEO specialists",
    emoji: "🔍",
    blurb: "Audits, on-page, technical SEO and link building.",
    billing: "Retainer",
    rateNote: "SEO specialists work on monthly retainers ($750–$5,000/month) plus one-off audits.",
    sampleItems: [
      { description: "Technical SEO audit", qty: 1, rate: 900 },
      { description: "Monthly SEO retainer", qty: 1, rate: 1500 },
      { description: "Content optimization — 10 pages", qty: 10, rate: 75 },
    ],
    tips: [
      "Separate one-time audits from ongoing retainer work.",
      "Tie deliverables to the month so clients see continuous value.",
      "Pass through any paid tools or link costs transparently.",
    ],
    terms: "Retainer billed monthly in advance, Net 10.",
  },
  {
    slug: "accountant",
    name: "Accountant",
    plural: "accountants",
    emoji: "🧮",
    blurb: "Bookkeeping, tax prep and financial advisory.",
    billing: "Per deliverable",
    rateNote: "Accountants bill per return, monthly for bookkeeping, or hourly ($75–$300/hr).",
    sampleItems: [
      { description: "Monthly bookkeeping", qty: 1, rate: 400 },
      { description: "Annual tax return preparation", qty: 1, rate: 650 },
      { description: "Advisory call — 2 hrs @ $150", qty: 2, rate: 150 },
    ],
    tips: [
      "Reference the period or tax year on each line.",
      "Bill recurring bookkeeping monthly for steady revenue.",
      "Keep advisory hours separate from compliance work.",
    ],
    terms: "Net 15. Tax prep due on filing.",
  },
  {
    slug: "contractor",
    name: "Contractor",
    plural: "contractors",
    emoji: "🔨",
    blurb: "General contracting, remodels and trade work.",
    billing: "Per project",
    rateNote: "Contractors bill per project with progress draws, plus labor and materials breakdowns.",
    sampleItems: [
      { description: "Labor — 32 hrs @ $65", qty: 32, rate: 65 },
      { description: "Materials (lumber, fixtures)", qty: 1, rate: 1850 },
      { description: "Permit & disposal fees", qty: 1, rate: 320 },
    ],
    tips: [
      "Split labor, materials and fees into separate lines.",
      "Use progress draws (deposit / midpoint / final) for big jobs.",
      "Attach or reference the signed estimate.",
    ],
    terms: "Deposit on signing, draws per milestone, final on completion.",
  },
  {
    slug: "event-planner",
    name: "Event Planner",
    plural: "event planners",
    emoji: "🎉",
    blurb: "Weddings, corporate and private event planning.",
    billing: "Per project",
    rateNote: "Event planners charge a flat planning fee or a percentage of the event budget (10–20%).",
    sampleItems: [
      { description: "Full-service event planning fee", qty: 1, rate: 3500 },
      { description: "Vendor coordination", qty: 1, rate: 800 },
      { description: "Day-of management (10 hrs)", qty: 1, rate: 1200 },
    ],
    tips: [
      "Keep your planning fee separate from pass-through vendor costs.",
      "Bill in stages tied to the event timeline.",
      "Spell out what is and isn't included to avoid scope creep.",
    ],
    terms: "Deposit to book, balance due 14 days before the event.",
  },
  {
    slug: "makeup-artist",
    name: "Makeup Artist",
    plural: "makeup artists",
    emoji: "💄",
    blurb: "Bridal, editorial and event makeup services.",
    billing: "Per deliverable",
    rateNote: "Makeup artists bill per face or per service, plus travel and trial fees.",
    sampleItems: [
      { description: "Bridal makeup", qty: 1, rate: 250 },
      { description: "Bridal party — 4 faces @ $90", qty: 4, rate: 90 },
      { description: "Travel fee", qty: 1, rate: 60 },
    ],
    tips: [
      "Bill per face for parties so the total is transparent.",
      "Add travel and early-call surcharges as separate lines.",
      "Take a deposit to hold the booking date.",
    ],
    terms: "Non-refundable deposit to book, balance due on the day.",
  },
  {
    slug: "personal-trainer",
    name: "Personal Trainer",
    plural: "personal trainers",
    emoji: "🏋️",
    blurb: "1-on-1 training, programs and online coaching.",
    billing: "Per project",
    rateNote: "Trainers sell session packs or monthly programs ($150–$1,200/month).",
    sampleItems: [
      { description: "10-session training pack", qty: 1, rate: 700 },
      { description: "Custom program design", qty: 1, rate: 150 },
      { description: "Nutrition plan", qty: 1, rate: 90 },
    ],
    tips: [
      "Sell packs and monthly memberships, not single sessions.",
      "List your cancellation policy on the invoice.",
      "Bill program design and nutrition separately from sessions.",
    ],
    terms: "Packs prepaid; memberships billed monthly.",
  },
  {
    slug: "cleaner",
    name: "Cleaner",
    plural: "cleaners",
    emoji: "🧹",
    blurb: "Residential and commercial cleaning services.",
    billing: "Per project",
    rateNote: "Cleaners bill per visit, per square foot, or hourly ($25–$60/hr).",
    sampleItems: [
      { description: "Standard home clean — 3 hrs @ $40", qty: 3, rate: 40 },
      { description: "Deep clean add-on", qty: 1, rate: 120 },
      { description: "Inside oven & fridge", qty: 1, rate: 50 },
    ],
    tips: [
      "List the property and date of service for recurring clients.",
      "Bill recurring cleans on a simple weekly or monthly cycle.",
      "Charge deep-clean and add-on tasks as separate lines.",
    ],
    terms: "Due on day of service, or Net 7 for contracts.",
  },
  {
    slug: "handyman",
    name: "Handyman",
    plural: "handymen",
    emoji: "🛠️",
    blurb: "Repairs, installs and small home improvement jobs.",
    billing: "Hourly",
    rateNote: "Handymen bill hourly ($50–$110/hr) plus materials, often with a minimum call-out fee.",
    sampleItems: [
      { description: "Labor — 4 hrs @ $70", qty: 4, rate: 70 },
      { description: "Materials & hardware", qty: 1, rate: 145 },
      { description: "Call-out / minimum fee", qty: 1, rate: 60 },
    ],
    tips: [
      "Separate labor, materials and any call-out fee.",
      "Note the job address and date for the customer's records.",
      "Keep a clear hourly minimum so small jobs are still worth it.",
    ],
    terms: "Due on completion, Net 7 for repeat customers.",
  },
];

export const PROFESSION_SLUGS = PROFESSIONS.map((p) => p.slug);
export const professionBySlug = (slug: string) =>
  PROFESSIONS.find((p) => p.slug === slug);

// ── 站点常量 ────────────────────────────────────────────────
export const SITE = {
  name: "InvoicePad",
  domain: "invoicepad.net",
  url: "https://invoicepad.net",
  tagline: "2026 Free Invoice Generator for Freelancers — No Sign-Up",
};
