'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import QuoteCard from '@/app/components/QuoteCard';
import SearchBox from '@/app/components/SearchBox';
import Pagination from '@/app/components/Pagination';
import { QuotesListResponse } from '@/app/lib/api';
import Link from 'next/link';

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [data, setData] = useState<QuotesListResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentQuery, setCurrentQuery] = useState(initialQuery);

  // 执行搜索
  useEffect(() => {
    if (!currentQuery.trim()) {
      setData(null);
      return;
    }

    async function performSearch() {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/search?q=${encodeURIComponent(currentQuery)}&page=${currentPage}&limit=10`
        );
        
        if (!response.ok) {
          throw new Error('搜索失败');
        }
        
        const result = await response.json();
        setData(result);
        setError(null);
      } catch (err) {
        console.error('Search failed:', err);
        setError('搜索失败，请稍后重试');
      } finally {
        setLoading(false);
      }
    }

    performSearch();
  }, [currentQuery, currentPage]);

  // 处理新搜索
  const handleSearch = async (query: string) => {
    setCurrentQuery(query);
    setCurrentPage(1);
    
    // 更新URL
    const newUrl = query ? `/search?q=${encodeURIComponent(query)}` : '/search';
    window.history.pushState({}, '', newUrl);
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 高亮关键词
  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark class="bg-yellow-200 px-0.5 rounded">$1</mark>');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部 */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                搜索金句
              </h1>
              <p className="text-gray-600 mt-1">
                在历史金句中寻找您需要的励志内容
              </p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-gray-600 hover:text-blue-600 transition-colors">
                首页
              </Link>
              <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
                历史
              </Link>
              <Link href="/search" className="text-blue-600 font-medium">
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
            <Link href="/history" className="text-gray-600 hover:text-blue-600 transition-colors">
              历史
            </Link>
            <Link href="/search" className="text-blue-600 font-medium">
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
          <SearchBox 
            onSearch={handleSearch} 
            placeholder="搜索励志金句..." 
            defaultValue={currentQuery}
          />
        </div>

        {/* 搜索提示 */}
        {!currentQuery && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">搜索提示</h3>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>• 可以搜索金句内容中的关键词</li>
              <li>• 支持搜索作者姓名</li>
              <li>• 可以搜索金句分类</li>
              <li>• 建议使用2-10个字符进行搜索</li>
            </ul>
            <div className="mt-4">
              <p className="text-sm font-medium text-blue-900 mb-2">热门搜索：</p>
              <div className="flex flex-wrap gap-2">
                {['奋斗', '坚持', '梦想', '成功', '希望'].map((keyword) => (
                  <button
                    key={keyword}
                    onClick={() => handleSearch(keyword)}
                    className="px-3 py-1 bg-white text-blue-600 border border-blue-300 rounded-full text-sm hover:bg-blue-100 transition-colors"
                  >
                    {keyword}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 错误提示 */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* 加载状态 */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-600">搜索中...</p>
          </div>
        )}

        {/* 搜索结果 */}
        {data && currentQuery && (
          <>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                搜索结果
                <span className="ml-2 text-sm font-normal text-gray-500">
                  (关键词: "{data.query}"，找到 {data.pagination.total} 条)
                </span>
              </h2>
            </div>
            
            {data.quotes.length > 0 ? (
              <>
                <div className="space-y-4">
                  {data.quotes.map((quote) => (
                    <QuoteCard 
                      key={quote.id} 
                      quote={quote} 
                      variant="search"
                    />
                  ))}
                </div>

                {/* 分页 */}
                <Pagination
                  pagination={data.pagination}
                  onPageChange={handlePageChange}
                  showInfo={true}
                />
              </>
            ) : (
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
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <h3 className="text-lg font-medium text-gray-900 mb-2">未找到相关金句</h3>
                <p className="text-gray-600 mb-4">
                  没有找到包含 "{currentQuery}" 的金句
                </p>
                <div className="space-y-2">
                  <p className="text-sm text-gray-500">建议：</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 检查关键词拼写</li>
                    <li>• 尝试使用更简单的关键词</li>
                    <li>• 使用同义词或相关词汇</li>
                  </ul>
                </div>
                <div className="mt-6">
                  <Link
                    href="/"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    返回首页
                  </Link>
                </div>
              </div>
            )}
          </>
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

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}