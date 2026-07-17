import type { MetadataRoute } from "next";
import { PROFESSION_SLUGS } from "@/lib/invoice";

const BASE = "https://invoicepad.net";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const urls: MetadataRoute.Sitemap = [];

  // 静态 + 枢纽
  for (const p of ["", "/invoice-templates",
    "/seo-service-invoice-template",
    "/web-developer-invoice-template",
    "/freelance-writer-invoice-template",
    "/handyman-invoice-template", "/receipt-maker", "/estimate-generator", "/privacy-policy", "/terms",
    "/blog/how-to-write-an-invoice-freelancer", "/blog/what-to-include-on-an-invoice", "/blog/invoice-payment-terms-explained",
  ]) {
    urls.push({ url: `${BASE}${p}/`, lastModified: now, changeFrequency: "monthly", priority: p === "" ? 1 : 0.7 });
  }
  // 矩阵：职业模板页
  for (const slug of PROFESSION_SLUGS) {
    urls.push({ url: `${BASE}/invoice-template/${slug}/`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }
  return urls;
}
