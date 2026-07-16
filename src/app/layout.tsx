import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

// 鈹€鈹€鈹€ 鍩嬬偣閰嶇疆锛堝～涓婂€煎嵆鑷姩鐢熸晥锛岀暀绌哄垯涓嶆覆鏌擄級鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€
// GA4锛欸oogle Analytics 鍚庡彴鎷?"G-XXXXXXXXXX"锛堟柊绔欏緟寤哄悗濉級
const GA_ID = "G-MKEZSNVQ3G";
// GSC锛歋earch Console 鍔犺祫婧愨啋"HTML 鏍囪"楠岃瘉锛堟柊绔欏緟寤哄悗濉級
const GSC_TOKEN = "";
// AdSense锛氫笌鐜版湁绔欏叡鐢ㄥ悓涓€鍙戝竷鍟嗗彿锛堣处鍙风骇锛屼笉鑳借法鍙凤級
const ADS_CLIENT = "ca-pub-3256422033020643";
// 鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€鈹€

export const metadata: Metadata = {
  metadataBase: new URL("https://invoicepad.net"),
  ...(GSC_TOKEN ? { verification: { google: GSC_TOKEN } } : {}),
  title: {
    template: "%s | 2026 Free Invoice Generator",
    default: "InvoicePad - Free Invoice Generator for Freelancers",
  },
  description:
    "Free 2026 invoice generator for freelancers. Create professional PDF invoices in seconds with no sign-up, no watermark, and browser-only privacy.",
  keywords: [
    "free invoice generator 2026",
    "invoice maker",
    "invoice template",
    "freelance invoice",
    "create invoice pdf",
    "no sign up invoice",
    "online invoice generator",
  ],
  openGraph: {
    title: "InvoicePad - Free Invoice Generator for Freelancers",
    description:
      "Make a professional invoice and save it as PDF. Free, no sign-up, no watermark, private. Built for 2026 freelancers.",
    url: "https://invoicepad.net",
    siteName: "InvoicePad",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: { card: "summary_large_image", images: ["/og.png"] },
  alternates: { canonical: "https://invoicepad.net" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <head>
        {ADS_CLIENT ? <meta name="google-adsense-account" content={ADS_CLIENT} /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "InvoicePad",
              url: "https://invoicepad.net"
            }),
          }}
        />
      </head>
      <body className="min-h-full bg-slate-50 font-sans text-slate-900">
        {children}
        <Footer siteName="InvoicePad" domain="invoicepad.net" />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_ID}');`}
            </Script>
          </>
        ) : null}
        {ADS_CLIENT ? (
          <Script
            id="adsbygoogle"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADS_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        ) : null}
      </body>
    </html>
  );
}


