'use client';

import { useState, useEffect } from 'react';
import QuoteCard from '@/app/components/QuoteCard';
import SearchBox from '@/app/components/SearchBox';
import { TodayQuote, QuotesListResponse } from '@/app/lib/api';
import Link from 'next/link';

export default function HomePage() {
  const [todayQuote, setTodayQuote] = useState<TodayQuote | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<QuotesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 获取今日金句
  useEffect(() => {
    async function fetchTodayQuote() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/today`);
        if (!response.ok) {
          throw new Error('获取今日金句失败');
        }
        const data = await response.json();
        setTodayQuote(data);
      } catch (err) {
        console.error('Failed to fetch today quote:', err);
        setError('获取今日金句失败，请稍后重试');
      }
    }

    async function fetchRecentQuotes() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history?limit=3`);
        if (!response.ok) {
          throw new Error('获取最近金句失败');
        }
        const data = await response.json();
        setRecentQuotes(data);
      } catch (err) {
        console.error('Failed to fetch recent quotes:', err);
      }
    }

    async function loadData() {
      setLoading(true);
      try {
        await Promise.all([fetchTodayQuote(), fetchRecentQuotes()]);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  // 处理搜索
  const handleSearch = async (query: string) => {
    // 跳转到搜索页面
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载今日金句...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                每日励志金句
              </h1>
              <p className="text-gray-600 mt-1">
                来自权威媒体的每日精神激励
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-blue-600 font-medium">
                首页
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                历史
              </Link>
              <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
                搜索
              </Link>
              <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
                关于
              </Link>
            </nav>
          </div>
          
          {/* 移动端导航 */}
          <div className="md:hidden mt-4 flex space-x-6">
            <Link href="/" className="text-blue-600 font-medium">
              首页
            </Link>
            <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
              历史
            </Link>
            <Link href="/search" className="text-gray-600 hover:text-blue-600 transition-colors">
              搜索
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">
              关于
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {/* 搜索框 */}
        <div className="mb-12">
          <SearchBox onSearch={handleSearch} placeholder="搜索励志金句..." />
        </div>

        {/* 今日金句 */}
        <section className="mb-12">
          <div className="flex items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">今日金句</h2>
            {todayQuote?.is_today && (
              <span className="ml-3 px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                今日更新
              </span>
            )}
          </div>
          
          {error ? (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
              <p className="text-red-800">{error}</p>
            </div>
          ) : todayQuote ? (
            <QuoteCard quote={todayQuote} variant="today" />
          ) : (
            <div className="bg-gray-100 rounded-lg p-8 text-center">
              <p className="text-gray-600">今日暂无金句</p>
            </div>
          )}
        </section>

        {/* 最近金句 */}
        {recentQuotes && recentQuotes.quotes.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">最近金句</h2>
              <Link
                href="/history"
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                查看更多
                <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentQuotes.quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} variant="history" />
              ))}
            </div>
          </section>
        )}

        {/* 数据来源说明 */}
        <section className="mt-16 bg-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">数据来源</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              <span>人民网 - 观点、理论栏目</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <span>央视网 - 新闻评论、专题报道</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <span>人民日报 - 评论版面</span>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            * 金句内容来自公开媒体，版权归原作者所有
          </p>
        </section>
      </main>

      {/* 页脚 */}
      <footer className="bg-white border-t border-gray-200 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-sm text-gray-600">
            <p>&copy; 2024 每日励志金句. 所有权利保留.</p>
            <p className="mt-1">
              数据每日自动更新 | 
              <Link href="/about" className="text-blue-600 hover:underline ml-1">
                了解更多
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}