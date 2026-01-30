import { Metadata } from 'next';

// 生成页面特定的metadata
export function generatePageMetadata(options: {
  title: string;
  description: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  noIndex?: boolean;
}): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    ogImage,
    noIndex = false
  } = options;

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const fullUrl = canonical ? `${baseUrl}${canonical}` : baseUrl;

  return {
    title: {
      default: title,
      template: "%s | 每日励志金句"
    },
    description,
    keywords: [
      '励志金句',
      '正能量',
      '人民网',
      '央视网',
      '人民日报',
      '每日金句',
      '励志名言',
      '精神激励',
      '金句',
      '语录',
      ...keywords
    ],
    authors: [{ name: "每日励志金句团队" }],
    creator: "每日励志金句",
    publisher: "每日励志金句",
    alternates: {
      canonical: fullUrl,
    },
    openGraph: {
      type: 'website',
      locale: 'zh_CN',
      url: fullUrl,
      title: title,
      description: description,
      siteName: '每日励志金句',
      images: ogImage ? [{
        url: ogImage,
        width: 1200,
        height: 630,
        alt: title,
      }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: title,
      description: description,
      images: ogImage ? [ogImage] : [],
    },
    robots: noIndex ? {
      index: false,
      follow: true,
    } : {
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
  };
}

// 生成今日金句页面的结构化数据
export function generateTodayQuoteStructuredData(quote?: {
  id: number;
  content: string;
  source: string;
  created_at: string;
  author?: string;
  original_url?: string;
}) {
  if (!quote) {
    return {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "每日励志金句",
      "description": "每日更新的励志金句聚合网站，来自权威媒体的正能量内容",
      "url": process.env.NEXT_PUBLIC_SITE_URL
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "今日励志金句",
    "description": quote.content.substring(0, 160) + "...",
    "datePublished": quote.created_at,
    "dateModified": quote.created_at,
    "author": {
      "@type": "Organization",
      "name": quote.source,
      "url": quote.original_url
    },
    "publisher": {
      "@type": "Organization",
      "name": "每日励志金句",
      "url": process.env.NEXT_PUBLIC_SITE_URL
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/?quote=${quote.id}`
    },
    "text": quote.content
  };
}

// 生成搜索结果页面的结构化数据
export function generateSearchStructuredData(query: string, results: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "SearchResultsPage",
    "name": `搜索结果：${query}`,
    "description": `包含关键词"${query}"的励志金句搜索结果`,
    "url": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q=${encodeURIComponent(query)}`,
    "mainEntity": {
      "@type": "ItemList",
      "numberOfItems": results.length,
      "itemListElement": results.map((quote, index) => ({
        "@type": "Article",
        "position": index + 1,
        "name": quote.content.substring(0, 100) + "...",
        "url": `${process.env.NEXT_PUBLIC_SITE_URL}/?quote=${quote.id}`,
        "datePublished": quote.created_at,
        "author": {
          "@type": "Organization",
          "name": quote.source
        }
      }))
    }
  };
}

// 生成网站全局结构化数据
export function generateWebsiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "每日励志金句",
    "description": "每日更新的励志金句聚合网站，从人民网、央视网、人民日报等权威媒体抓取励志句子，为用户提供每日精神激励。",
    "url": process.env.NEXT_PUBLIC_SITE_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_SITE_URL}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    },
    "publisher": {
      "@type": "Organization",
      "name": "每日励志金句",
      "url": process.env.NEXT_PUBLIC_SITE_URL,
      "sameAs": []
    }
  };
}