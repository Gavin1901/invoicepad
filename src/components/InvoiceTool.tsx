"use client";

import { useEffect, useMemo, useState } from "react";
import {
  CURRENCIES,
  TAX_REGIMES,
  BILLING_MODELS,
  type CurrencyCode,
  type TaxCountry,
  type BillingModelType,
  type LineItem,
  type Milestone,
  type Invoice,
  formatMoney,
  subtotal,
  taxAmount,
  grandTotal,
  lineTotal,
} from "@/lib/invoice";

const STORAGE_KEY = "invoicepad_draft_v2";

function track(event: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag;
  gtag?.("event", event, params);
}

// 今天 ISO 日期
function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

function plusDaysISO(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

// 把发票号里的数字 +1，保留前缀和位数
function bumpInvoiceNumber(num: string): string {
  const m = num.match(/^(.*?)(\d+)(\D*)$/);
  if (!m) return num ? `${num}-2` : "INV-0001";
  const [, prefix, digits, suffix] = m;
  const next = (parseInt(digits, 10) + 1).toString().padStart(digits.length, "0");
  return `${prefix}${next}${suffix}`;
}

function defaultInvoice(presetItems?: LineItem[]): Invoice {
  return {
    from: "",
    to: "",
    items: presetItems ?? [
      { description: "Design work", qty: 1, rate: 500 },
      { description: "Revisions", qty: 2, rate: 75 },
    ],
    taxRate: 0,
    notes: "Thank you for your business!",
    currency: "USD",
    invoiceNumber: "INV-0001",
    date: todayISO(),
    dueDate: plusDaysISO(14),
    billingModel: "fixed",
    taxCountry: "US",
    milestones: [],
    retainerPeriod: "",
    retainerScope: "",
  };
}

export default function InvoiceTool({ presetItems, presetFrom }: { presetItems?: LineItem[]; presetFrom?: string }) {
  const [inv, setInv] = useState<Invoice>(() => defaultInvoice(presetItems));
  const [loaded, setLoaded] = useState(false);

  // ── 复购钩子：开局带出上次草稿 ──────────────────────────────
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        track("invoice_draft_reused", { tool: "invoice_generator" });
        const saved = JSON.parse(raw) as Partial<Invoice>;
        setInv((prev) => ({
          ...prev,
          from: saved.from ?? prev.from,
          currency: (saved.currency as CurrencyCode) ?? prev.currency,
          notes: saved.notes ?? prev.notes,
          invoiceNumber: saved.invoiceNumber ? bumpInvoiceNumber(saved.invoiceNumber) : prev.invoiceNumber,
          taxRate: typeof saved.taxRate === "number" ? saved.taxRate : prev.taxRate,
          taxCountry: (saved.taxCountry as TaxCountry) ?? prev.taxCountry,
          billingModel: (saved.billingModel as BillingModelType) ?? prev.billingModel,
          retainerPeriod: saved.retainerPeriod ?? prev.retainerPeriod,
          retainerScope: saved.retainerScope ?? prev.retainerScope,
          date: todayISO(),
          dueDate: plusDaysISO(14),
        }));
      }
    } catch {}
    if (presetFrom) setInv((p) => (p.from ? p : { ...p, from: presetFrom }));
    setLoaded(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── 自动保存草稿到浏览器 ────────────────────────────────────
  useEffect(() => {
    if (!loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inv));
    } catch {}
  }, [inv, loaded]);

  // 把所有计费模型的输出统一成行项目用于计算
  const displayItems = useMemo((): LineItem[] => {
    if (inv.billingModel === "milestone") {
      return inv.milestones.map((ms) => ({
        description: ms.name,
        qty: 1,
        rate: ms.amount,
      }));
    }
    if (inv.billingModel === "retainer") {
      // retainer: 用第一条作为概括项
      if (inv.items.length > 0) return inv.items;
      return [{ description: inv.retainerScope || "Monthly retainer", qty: 1, rate: 0 }];
    }
    return inv.items;
  }, [inv.billingModel, inv.items, inv.milestones, inv.retainerScope]);

  const sub = useMemo(() => subtotal(displayItems), [displayItems]);
  const tax = useMemo(() => taxAmount(displayItems, inv.taxRate), [displayItems, inv.taxRate]);
  const total = useMemo(() => grandTotal(displayItems, inv.taxRate), [displayItems, inv.taxRate]);

  // 当前税务国别信息
  const taxInfo = useMemo(() => TAX_REGIMES.find((t) => t.country === inv.taxCountry) ?? TAX_REGIMES[5], [inv.taxCountry]);

  function set<K extends keyof Invoice>(key: K, value: Invoice[K]) {
    setInv((p) => ({ ...p, [key]: value }));
  }

  function setItem(i: number, patch: Partial<LineItem>) {
    setInv((p) => ({
      ...p,
      items: p.items.map((it, idx) => (idx === i ? { ...it, ...patch } : it)),
    }));
  }

  function addItem() {
    setInv((p) => ({ ...p, items: [...p.items, { description: "", qty: 1, rate: 0 }] }));
  }

  function removeItem(i: number) {
    setInv((p) => ({ ...p, items: p.items.filter((_, idx) => idx !== i) }));
  }

  // ── 里程碑操作 ──────────────────────────────────────────────
  function setMilestone(i: number, patch: Partial<Milestone>) {
    setInv((p) => ({
      ...p,
      milestones: p.milestones.map((ms, idx) => (idx === i ? { ...ms, ...patch } : ms)),
    }));
  }

  function addMilestone() {
    setInv((p) => ({
      ...p,
      milestones: [...p.milestones, { name: "", amount: 0, dueDate: plusDaysISO(30) }],
    }));
  }

  function removeMilestone(i: number) {
    setInv((p) => ({ ...p, milestones: p.milestones.filter((_, idx) => idx !== i) }));
  }

  function resetDraft() {
    track("invoice_draft_reset", { tool: "invoice_generator" });
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {}
    setInv(defaultInvoice(presetItems));
  }

  // 切换计费模型时给一些合理默认值
  function changeBillingModel(model: BillingModelType) {
    setInv((p) => {
      const next: Partial<Invoice> = { ...p, billingModel: model };
      if (model === "milestone" && p.milestones.length === 0) {
        next.milestones = [
          { name: "Project kickoff", amount: 1500, dueDate: plusDaysISO(14) },
          { name: "Mid-project review", amount: 2000, dueDate: plusDaysISO(45) },
          { name: "Final delivery", amount: 1500, dueDate: plusDaysISO(75) },
        ];
      }
      if (model === "hourly" && p.items.length === 0) {
        next.items = [{ description: "Work completed", qty: 20, rate: 75 }];
      }
      if (model === "retainer") {
        next.retainerPeriod = next.retainerPeriod || "June 2026";
        next.retainerScope = next.retainerScope || "Monthly advisory retainer";
        if (p.items.length === 0) {
          next.items = [{ description: "Monthly retainer", qty: 1, rate: 2000 }];
        }
      }
      return next as Invoice;
    });
  }

  // 切换税国时自动预设税率
  function changeTaxCountry(country: TaxCountry) {
    const ti = TAX_REGIMES.find((t) => t.country === country);
    setInv((p) => ({
      ...p,
      taxCountry: country,
      taxRate: ti ? ti.defaultRate : 0,
      currency: ti ? ti.currency : p.currency,
    }));
  }

  function fmtDate(iso: string): string {
    if (!iso) return "—";
    const d = new Date(iso + "T00:00:00");
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
  }

  const field =
    "rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-800 focus:border-indigo-500 focus:outline-none";

  const bl = inv.billingModel;

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* ── 左：表单 ───────────────────────────────────────── */}
      <div className="no-print rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Invoice details</h2>
          <button
            onClick={resetDraft}
            className="text-xs font-medium text-slate-400 hover:text-rose-600"
          >
            Clear / new
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-400">
          Auto-saved to this browser only. Nothing is uploaded.
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            From (your business)
            <textarea
              rows={3}
              value={inv.from}
              onChange={(e) => set("from", e.target.value)}
              placeholder={"Your Name\nyou@email.com\nCity, Country"}
              className={field}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Bill to (client)
            <textarea
              rows={3}
              value={inv.to}
              onChange={(e) => set("to", e.target.value)}
              placeholder={"Client Name\nclient@email.com\nCompany Ltd."}
              className={field}
            />
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Invoice #
            <input
              value={inv.invoiceNumber}
              onChange={(e) => set("invoiceNumber", e.target.value)}
              className={field}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Date
            <input
              type="date"
              value={inv.date}
              onChange={(e) => set("date", e.target.value)}
              className={field}
            />
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Due date
            <input
              type="date"
              value={inv.dueDate}
              onChange={(e) => set("dueDate", e.target.value)}
              className={field}
            />
          </label>
        </div>

        {/* 🟡 计费模型选择器 */}
        <div className="mt-4">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Billing model
            <select
              value={bl}
              onChange={(e) => changeBillingModel(e.target.value as BillingModelType)}
              className={field}
            >
              {BILLING_MODELS.map((bm) => (
                <option key={bm.type} value={bm.type}>
                  {bm.label} — {bm.desc}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* ── 按计费模型切换表单 ──────────────────────────── */}
        {bl === "hourly" && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Hours worked</h3>
              <button
                onClick={addItem}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                + Add entry
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {inv.items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <input
                    value={it.description}
                    onChange={(e) => setItem(i, { description: e.target.value })}
                    placeholder="Description"
                    className={`${field} col-span-5`}
                  />
                  <div className="col-span-2">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={it.qty}
                      onChange={(e) => setItem(i, { qty: parseFloat(e.target.value) || 0 })}
                      placeholder="Hours"
                      className={`${field} w-full`}
                    />
                    <span className="mt-0.5 block text-center text-[10px] text-slate-400">hours</span>
                  </div>
                  <div className="col-span-4">
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={it.rate}
                      onChange={(e) => setItem(i, { rate: parseFloat(e.target.value) || 0 })}
                      placeholder="Rate/hr"
                      className={`${field} w-full`}
                    />
                    <span className="mt-0.5 block text-center text-[10px] text-slate-400">rate / hr</span>
                  </div>
                  <button
                    onClick={() => removeItem(i)}
                    aria-label="Remove item"
                    className="col-span-1 rounded-lg border border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {bl === "fixed" && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Line items</h3>
              <button
                onClick={addItem}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                + Add item
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {inv.items.map((it, i) => (
                <div key={i} className="grid grid-cols-12 gap-2">
                  <input
                    value={it.description}
                    onChange={(e) => setItem(i, { description: e.target.value })}
                    placeholder="Description"
                    className={`${field} col-span-6`}
                  />
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={it.qty}
                    onChange={(e) => setItem(i, { qty: parseFloat(e.target.value) || 0 })}
                    placeholder="Qty"
                    className={`${field} col-span-2`}
                  />
                  <input
                    type="number"
                    min={0}
                    step="any"
                    value={it.rate}
                    onChange={(e) => setItem(i, { rate: parseFloat(e.target.value) || 0 })}
                    placeholder="Rate"
                    className={`${field} col-span-3`}
                  />
                  <button
                    onClick={() => removeItem(i)}
                    aria-label="Remove item"
                    className="col-span-1 rounded-lg border border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-600"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {bl === "retainer" && (
          <div className="mt-4 space-y-3">
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
              Retainer period
              <input
                value={inv.retainerPeriod}
                onChange={(e) => set("retainerPeriod", e.target.value)}
                placeholder="June 2026"
                className={field}
              />
            </label>
            <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
              Scope of work
              <textarea
                rows={2}
                value={inv.retainerScope}
                onChange={(e) => set("retainerScope", e.target.value)}
                placeholder="Monthly social media management — 3 platforms, 20 posts"
                className={field}
              />
            </label>
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Retainer fee</h3>
            </div>
            {inv.items.map((it, i) => (
              <div key={i} className="grid grid-cols-12 gap-2">
                <input
                  value={it.description}
                  onChange={(e) => setItem(i, { description: e.target.value })}
                  placeholder="Description"
                  className={`${field} col-span-7`}
                />
                <input
                  type="number"
                  min={0}
                  step="any"
                  value={it.rate}
                  onChange={(e) => setItem(i, { rate: parseFloat(e.target.value) || 0, qty: 1 })}
                  placeholder="Amount"
                  className={`${field} col-span-4`}
                />
                <button
                  onClick={() => removeItem(i)}
                  aria-label="Remove item"
                  className="col-span-1 rounded-lg border border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-600"
                >
                  ×
                </button>
              </div>
            ))}
            <button
              onClick={addItem}
              className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
            >
              + Add fee item
            </button>
          </div>
        )}

        {bl === "milestone" && (
          <div className="mt-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-700">Project milestones</h3>
              <button
                onClick={addMilestone}
                className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                + Add milestone
              </button>
            </div>
            <div className="mt-3 space-y-2">
              {inv.milestones.map((ms, i) => (
                <div key={i} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <div className="grid grid-cols-12 gap-2">
                    <input
                      value={ms.name}
                      onChange={(e) => setMilestone(i, { name: e.target.value })}
                      placeholder="Milestone name"
                      className={`${field} col-span-5`}
                    />
                    <input
                      type="number"
                      min={0}
                      step="any"
                      value={ms.amount}
                      onChange={(e) => setMilestone(i, { amount: parseFloat(e.target.value) || 0 })}
                      placeholder="Amount"
                      className={`${field} col-span-3`}
                    />
                    <input
                      type="date"
                      value={ms.dueDate}
                      onChange={(e) => setMilestone(i, { dueDate: e.target.value })}
                      className={`${field} col-span-3`}
                    />
                    <button
                      onClick={() => removeMilestone(i)}
                      aria-label="Remove milestone"
                      className="col-span-1 rounded-lg border border-slate-200 text-slate-400 hover:border-rose-300 hover:text-rose-600"
                    >
                      ×
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── 税国 + 税率 ───────────────────────────────────── */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Tax country
            <select
              value={inv.taxCountry}
              onChange={(e) => changeTaxCountry(e.target.value as TaxCountry)}
              className={field}
            >
              {TAX_REGIMES.map((t) => (
                <option key={t.country} value={t.country}>
                  {t.label} — {t.taxName}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            {taxInfo.taxName} (%)
            <input
              type="number"
              min={0}
              step="any"
              value={inv.taxRate}
              onChange={(e) => set("taxRate", parseFloat(e.target.value) || 0)}
              className={field}
            />
          </label>
        </div>

        <div className="mt-2 rounded-lg bg-blue-50 p-2 text-[10px] leading-relaxed text-blue-700">
          💡 {taxInfo.note}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            Currency
            <select
              value={inv.currency}
              onChange={(e) => set("currency", e.target.value as CurrencyCode)}
              className={field}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.code} ({c.symbol}) — {c.label}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1 text-xs font-medium text-slate-600">
            {taxInfo.idLabel}
            <input
              value={inv.notes.includes("Tax ID:") ? "" : ""}
              placeholder={taxInfo.idExample}
              className={field}
            />
          </label>
        </div>

        <label className="mt-4 flex flex-col gap-1 text-xs font-medium text-slate-600">
          Notes / payment terms
          <textarea
            rows={2}
            value={inv.notes}
            onChange={(e) => set("notes", e.target.value)}
            className={field}
          />
        </label>

        <button
          onClick={() => {
            track("invoice_pdf_started", {
              tool: "invoice_generator",
              billing_model: inv.billingModel,
              currency: inv.currency,
              line_item_count: displayItems.length,
            });
            window.print();
          }}
          className="mt-5 w-full rounded-xl bg-indigo-600 px-4 py-3 text-sm font-semibold text-white hover:bg-indigo-700"
        >
          🖨️ Print / Save as PDF
        </button>
        <p className="mt-2 text-center text-xs text-slate-400">
          Uses your browser&apos;s print dialog — choose &quot;Save as PDF&quot;. No watermark, ever.
        </p>
      </div>

      {/* ── 右：实时预览（打印目标） ───────────────────────── */}
      <div
        id="invoice-print"
        className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm"
      >
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">INVOICE</h2>
            <p className="mt-1 text-sm text-slate-500">#{inv.invoiceNumber || "—"}</p>
            {bl !== "fixed" && (
              <span className="mt-1 inline-block rounded-full bg-indigo-100 px-2 py-0.5 text-[10px] font-medium text-indigo-700">
                {BILLING_MODELS.find((b) => b.type === bl)?.label ?? bl}
              </span>
            )}
          </div>
          <div className="text-right text-xs text-slate-500">
            <p>
              <span className="font-semibold text-slate-700">Date:</span> {fmtDate(inv.date)}
            </p>
            <p>
              <span className="font-semibold text-slate-700">Due:</span> {fmtDate(inv.dueDate)}
            </p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-6 text-sm">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">From</p>
            <p className="mt-1 whitespace-pre-line text-slate-800">{inv.from || "Your business"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Bill to</p>
            <p className="mt-1 whitespace-pre-line text-slate-800">{inv.to || "Your client"}</p>
          </div>
        </div>

        {/* retainer: 显示scope */}
        {bl === "retainer" && inv.retainerScope && (
          <div className="mt-4 rounded-lg border border-slate-100 bg-slate-50 p-3 text-sm text-slate-600">
            <span className="font-semibold text-slate-700">Scope: </span>
            {inv.retainerScope}
            {inv.retainerPeriod && (
              <span className="ml-2 text-xs text-slate-400">({inv.retainerPeriod})</span>
            )}
          </div>
        )}

        {/* 行项目表 */}
        {bl !== "milestone" ? (
          <>
            <table className="mt-6 w-full text-sm">
              <thead>
                <tr className="border-b-2 border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                  <th className="py-2">Description</th>
                  <th className="py-2 text-right">{bl === "hourly" ? "Hours" : "Qty"}</th>
                  <th className="py-2 text-right">{bl === "hourly" ? "Rate/hr" : "Rate"}</th>
                  <th className="py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {displayItems.map((it, i) => (
                  <tr key={i} className="border-b border-slate-100">
                    <td className="py-2 text-slate-800">{it.description || "—"}</td>
                    <td className="py-2 text-right text-slate-600">{it.qty}</td>
                    <td className="py-2 text-right text-slate-600">{formatMoney(it.rate, inv.currency)}</td>
                    <td className="py-2 text-right font-medium text-slate-800">
                      {formatMoney(lineTotal(it), inv.currency)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          /* 里程碑表格 */
          <table className="mt-6 w-full text-sm">
            <thead>
              <tr className="border-b-2 border-slate-200 text-left text-xs uppercase tracking-wide text-slate-400">
                <th className="py-2">Milestone</th>
                <th className="py-2 text-right">Amount</th>
                <th className="py-2 text-right">Due</th>
              </tr>
            </thead>
            <tbody>
              {inv.milestones.map((ms, i) => (
                <tr key={i} className="border-b border-slate-100">
                  <td className="py-2 text-slate-800">{ms.name || "—"}</td>
                  <td className="py-2 text-right font-medium text-slate-800">
                    {formatMoney(ms.amount, inv.currency)}
                  </td>
                  <td className="py-2 text-right text-slate-600">{fmtDate(ms.dueDate)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* 总计 + tax行 */}
        <div className="mt-4 flex justify-end">
          <div className="w-full max-w-xs space-y-1 text-sm">
            <div className="flex justify-between text-slate-600">
              <span>Subtotal</span>
              <span>{formatMoney(sub, inv.currency)}</span>
            </div>
            <div className="flex justify-between text-slate-600">
              <span>
                {taxInfo.taxName} ({inv.taxRate}%)
              </span>
              <span>{formatMoney(tax, inv.currency)}</span>
            </div>
            {/* 🟡 税务登记号行 */}
            {taxInfo.country !== "OTHER" && taxInfo.country !== "US" && (
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>VAT/GST ID (if applicable)</span>
                <span className="italic">See above</span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-slate-200 pt-2 text-base font-bold text-slate-900">
              <span>Total</span>
              <span className="text-indigo-700">{formatMoney(total, inv.currency)}</span>
            </div>
          </div>
        </div>

        {inv.notes ? (
          <div className="mt-8 border-t border-slate-100 pt-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Notes</p>
            <p className="mt-1 whitespace-pre-line text-sm text-slate-600">{inv.notes}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
