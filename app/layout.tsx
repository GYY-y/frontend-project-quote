import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "每日励志金句 - 权威媒体金句聚合网站",
    template: "%s | 每日励志金句"
  },
  description: "每日更新的励志金句聚合网站，从人民网、央视网、人民日报等权威媒体抓取励志句子，为用户提供每日精神激励。无需登录，即开即用。",
  keywords: [
    "励志金句",
    "正能量",
    "人民网",
    "央视网", 
    "人民日报",
    "每日金句",
    "励志名言",
    "精神激励",
    "金句",
    "语录"
  ],
  authors: [{ name: "每日励志金句团队" }],
  creator: "每日励志金句",
  publisher: "每日励志金句",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: '/',
    title: '每日励志金句 - 权威媒体金句聚合网站',
    description: '每日更新的励志金句聚合网站，从人民网、央视网、人民日报等权威媒体抓取励志句子，为用户提供每日精神激励。',
    siteName: '每日励志金句',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: '每日励志金句 - 权威媒体金句聚合网站',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: '每日励志金句 - 权威媒体金句聚合网站',
    description: '每日更新的励志金句聚合网站，从人民网、央视网、人民日报等权威媒体抓取励志句子，为用户提供每日精神激励。',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
    yandex: 'your-yandex-verification-code',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "每日励志金句",
              "description": "每日更新的励志金句聚合网站，从人民网、央视网、人民日报等权威媒体抓取励志句子，为用户提供每日精神激励。",
              "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
              "potentialAction": {
                "@type": "SearchAction",
                "target": {
                  "@type": "EntryPoint",
                  "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/search?q={search_term_string}`
                },
                "query-input": "required name=search_term_string"
              },
              "publisher": {
                "@type": "Organization",
                "name": "每日励志金句",
                "url": process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
              }
            })
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
