'use client';

import { useState, useEffect } from 'react';
import QuoteCard from '@/app/components/QuoteCard';
import SearchBox from '@/app/components/SearchBox';
import Pagination from '@/app/components/Pagination';
import { QuotesListResponse } from '@/app/lib/api';
import Link from 'next/link';

export default function HistoryPage() {
  const [data, setData] = useState<QuotesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // 获取历史金句
  useEffect(() => {
    async function fetchHistory() {
      try {
        setLoading(true);
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/history?page=${currentPage}&limit=10`);
        
        if (!response.ok) {
          throw new Error('获取历史金句失败');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch history:', err);
        setError('获取历史金句失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    fetchHistory();
  }, [currentPage]);

  // 处理搜索
  const handleSearch = async (query: string) => {
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading && !data) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载历史金句...</p>
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
                历史金句
              </h1>
              <p className="text-gray-600 mt-1">
                浏览往期励志金句，回顾每日精神激励
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/history" className="text-blue-600 font-medium">
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
            <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
              首页
            </Link>
            <Link href="/history" className="text-blue-600 font-medium">
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
        <div className="mb-8">
          <SearchBox onSearch={handleSearch} placeholder="搜索历史金句..." />
        </div>

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* 加载状态 */}
        {loading && data && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">加载中...</p>
          </div>
        )}

        {/* 金句列表 */}
        {data && data.quotes.length > 0 && (
          <>
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                历史金句 
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (共 {data.pagination.total} 条)
                </span>
              </h2>
              <div className="text-sm text-gray-600">
                第 {data.pagination.page} 页，共 {data.pagination.total_pages} 页
              </div>
            </div>
            
            <div className="space-y-4">
              {data.quotes.map((quote) => (
                <QuoteCard key={quote.id} quote={quote} variant="history" />
              ))}
            </div>

            {/* 分页 */}
            <Pagination
              pagination={data.pagination}
              onPageChange={handlePageChange}
              showInfo={true}
            />
          </>
        )}

        {/* 空状态 */}
        {data && data.quotes.length === 0 && (
          <div className="text-center py-16">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">暂无历史金句</h3>
            <p className="text-gray-600 mb-4">
              系统还没有爬取到任何金句内容
            </p>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              返回首页
            </Link>
          </div>
        )}
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