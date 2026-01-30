'use client';

import { Quote } from '@/app/lib/api';
import Link from 'next/link';

interface QuoteCardProps {
  quote: Quote;
  variant?: 'default' | 'today' | 'history' | 'search';
  showLink?: boolean;
}

export default function QuoteCard({ quote, variant = 'default', showLink = true }: QuoteCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getCardClassName = () => {
    const baseClasses = "quote-card bg-white rounded-lg shadow-md p-6 mb-4 transition-all duration-300";
    
    switch (variant) {
      case 'today':
        return `${baseClasses} bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 hover:shadow-lg`;
      case 'history':
        return `${baseClasses} hover:bg-gray-50 hover:shadow-lg cursor-pointer`;
      case 'search':
        return `${baseClasses} hover:bg-yellow-50 hover:shadow-lg cursor-pointer border-l-2 border-yellow-400`;
      default:
        return `${baseClasses} hover:shadow-lg`;
    }
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      '人民网': 'bg-red-100 text-red-800',
      '央视网': 'bg-blue-100 text-blue-800',
      '人民日报': 'bg-green-100 text-green-800',
    };
    return colors[source] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className={getCardClassName()}>
      {/* 金句内容 */}
      <blockquote className="text-lg md:text-xl text-gray-800 mb-4 leading-relaxed">
        "{quote.content}"
      </blockquote>
      
      {/* 元信息 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-600">
        <div className="flex items-center space-x-3 mb-2 sm:mb-0">
          {/* 来源标签 */}
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getSourceColor(quote.source)}`}>
            {quote.source}
          </span>
          
          {/* 作者 */}
          {quote.author && (
            <span className="text-gray-600">
              作者：{quote.author}
            </span>
          )}
          
          {/* 分类 */}
          {quote.category && (
            <span className="text-gray-500">
              分类：{quote.category}
            </span>
          )}
        </div>
        
        {/* 日期 */}
        <div className="text-gray-500">
          {formatDate(quote.created_at)}
        </div>
      </div>
      
      {/* 原文链接 */}
      {showLink && quote.original_url && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <Link
            href={quote.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            查看原文
            <svg
              className="ml-1 w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
          </Link>
        </div>
      )}
    </div>
  );
}