'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Typography, Space, Alert, Skeleton, Pagination as AntPagination, Row, Col, Button } from 'antd';
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

export default function HistoryPage() {
  const [data, setData] = useState<QuotesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
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
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  // 处理页码变化
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
            <SearchBox onSearch={handleSearch} placeholder="搜索历史金句..." />
          </div>

          {error && <Alert message={error} type="error" showIcon style={{ marginBottom: 16 }} />}

          {loading && !data && (
            <div style={{ padding: '32px 0' }}>
              <Skeleton active title paragraph={{ rows: 3 }} />
            </div>
          )}

          {data && data.quotes.length > 0 && (
            <>
              <div className="flex items-center justify-between mb-4">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  历史金句
                  <Typography.Text type="secondary" style={{ marginLeft: 8, fontSize: 14 }}>
                    共 {data.pagination.total} 条
                  </Typography.Text>
                </Typography.Title>
                <Typography.Text type="secondary">
                  第 {data.pagination.page} 页 / 共 {data.pagination.total_pages} 页
                </Typography.Text>
              </div>

              {loading && (
                <div style={{ paddingBottom: 12 }}>
                  <Skeleton active />
                </div>
              )}

              <div className="masonry">
                {data.quotes.map((quote) => (
                  <div key={quote.id} className="masonry-item">
                    <QuoteCard quote={quote} variant="history" />
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
          )}

          {data && data.quotes.length === 0 && (
            <div
              className="text-center py-16 rounded-lg"
              style={{
                background: 'var(--card-bg)',
                border: `1px solid var(--border-color)`,
              }}
            >
              <Typography.Title level={5}>暂无历史金句</Typography.Title>
              <Typography.Text type="secondary">系统还没有爬取到任何金句内容</Typography.Text>
              <div className="mt-4">
                <Link href="/">
                  <Button type="primary">返回首页</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </Content>

      <Footer style={{ background: 'var(--card-bg)', borderTop: `1px solid var(--border-color)` }}>
        <div className="max-w-5xl mx-auto px-4 text-center text-sm" style={{ color: 'var(--text-secondary)' }}>
          <p>© 2026 每日励志金句. 所有权利保留.</p>
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
