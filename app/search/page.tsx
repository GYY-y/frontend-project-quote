'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Layout, Typography, Space, Alert, Skeleton, Row, Col, Tag, Pagination as AntPagination, Empty, Button } from 'antd';
import { QuotesListResponse } from '@/app/lib/api';
import QuoteCard from '@/app/components/QuoteCard';
import SearchBox from '@/app/components/SearchBox';
import ThemeSwitch from '@/app/components/ThemeSwitch';

const { Header, Content, Footer } = Layout;
const headerStyle = {
  background: 'var(--header-bg)',
  borderBottom: '1px solid var(--border-color)',
  paddingInline: 0,
  position: 'sticky',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  zIndex: 100,
  paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)',
  paddingBottom: 12,
  boxSizing: 'border-box',
  minHeight: '64px',
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
  boxShadow: '0 6px 16px rgba(0,0,0,0.06)',
};

function SearchPageContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const pathname = usePathname();
  const router = useRouter();

  const activeNavStyle: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 12,
    background: 'var(--nav-active-bg)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
    backdropFilter: 'blur(10px)',
    WebkitBackdropFilter: 'blur(10px)',
    border: '1px solid var(--nav-active-border)',
    color: '#1677ff',
    fontWeight: 600,
    transition: 'all 0.25s ease',
  };

  const normalNavStyle: React.CSSProperties = {
    padding: '8px 14px',
    borderRadius: 12,
    color: 'var(--text-secondary)',
    transition: 'all 0.2s ease',
  };
  
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
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    } else {
      setData(null);
      router.push('/search');
    }
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
    <Layout style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Header style={headerStyle}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center h-full w-full">
          <Space size="middle" wrap align="center">
            {[
              { label: '首页', href: '/' },
              { label: '历史', href: '/history' },
              { label: '搜索', href: '/search' },
              { label: '关于', href: '/about' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={
                  pathname === item.href || pathname.startsWith(`${item.href}/`)
                    ? activeNavStyle
                    : normalNavStyle
                }
                className="text-gray-700 hover:text-blue-600 transition-colors"
                className="transition-colors"
              >
                {item.label}
              </Link>
            ))}
            <ThemeSwitch />
          </Space>
        </div>
      </Header>

      <Content className="max-w-5xl mx-auto px-3 md:px-4 w-full" style={{ color: 'var(--text-primary)' }}>
        <div className="py-6 md:py-10">
          <div className="mb-8">
          <SearchBox
            onSearch={handleSearch}
            placeholder="搜索励志金句..."
            defaultValue={currentQuery}
            onValueChange={(val) => {
              setCurrentQuery(val);
              if (!val.trim()) {
                setData(null);
                setCurrentPage(1);
                router.push('/search');
              }
            }}
          />
        </div>

          {!currentQuery && (
          <div
            className="rounded-lg p-6 mb-8"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
            }}
          >
              <Typography.Title level={5} style={{ marginBottom: 12 }}>
                搜索提示
              </Typography.Title>
              <Space wrap size={[8, 8]}>
                {['奋斗', '坚持', '梦想', '成功', '希望'].map((keyword) => (
                  <Tag
                    key={keyword}
                    color="blue"
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleSearch(keyword)}
                  >
                    {keyword}
                  </Tag>
                ))}
              </Space>
              <Typography.Paragraph type="secondary" style={{ marginTop: 8, marginBottom: 0 }}>
                可以搜索金句内容、作者、分类，建议使用 2-10 个字符。
              </Typography.Paragraph>
            </div>
          )}

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

          {loading && (
            <div style={{ padding: '16px 0' }}>
              <Skeleton active />
            </div>
          )}

          {data && currentQuery && (
            <>
              <div className="mb-4">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  搜索结果
                  <Typography.Text type="secondary" style={{ marginLeft: 8, fontSize: 14 }}>
                    关键词: "{data.query}"，找到 {data.pagination.total} 条
                  </Typography.Text>
                </Typography.Title>
              </div>

              {data.quotes.length > 0 ? (
                <>
                  <div className="masonry">
                    {data.quotes.map((quote) => (
                      <div key={quote.id} className="masonry-item">
                        <QuoteCard quote={quote} variant="search" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 flex justify-center">
                    <AntPagination
                      current={data.pagination.page}
                      total={data.pagination.total}
                      pageSize={data.pagination.limit}
                      onChange={handlePageChange}
                      showSizeChanger={false}
                      showTotal={(total) => `共 ${total} 条`}
                    />
                  </div>
                </>
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={
                    <span>未找到包含 "{currentQuery}" 的金句</span>
                  }
                >
                  <Space orientation="vertical">
                    <Typography.Text type="secondary">尝试换个关键词，或使用同义词</Typography.Text>
                    <Link href="/">
                      <Button type="primary">返回首页</Button>
                    </Link>
                  </Space>
                </Empty>
              )}
            </>
          )}
        </div>
      </Content>

      <Footer style={{ background: 'var(--card-bg)', borderTop: `1px solid var(--border-color)` }}>
        <div className="max-w-5xl mx-auto px-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>© 2024 每日励志金句. 所有权利保留.</p>
          <p>
            数据每日自动更新 |
            <Link href="/about" className="text-blue-600 hover:underline ml-1">
              了解更多
            </Link>
          </p>
        </div>
      </Footer>
    </Layout>
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
