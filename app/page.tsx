'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Layout, Typography, Space, Button, Tag, Row, Col, Alert, Skeleton, Tabs } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import QuoteCard from '@/app/components/QuoteCard';
import SearchBox from '@/app/components/SearchBox';
import { TodayQuote, QuotesListResponse, api } from '@/app/lib/api';
import ThemeSwitch from '@/app/components/ThemeSwitch';

const { Header, Content } = Layout;
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

export default function HomePage() {
  const [todayQuote, setTodayQuote] = useState<TodayQuote | null>(null);
  const [recentQuotes, setRecentQuotes] = useState<QuotesListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [categoryData, setCategoryData] = useState<Record<string, QuotesListResponse | null>>({});
  const [categoryLoading, setCategoryLoading] = useState(false);
  const categoryTabs = [
    { key: '思想类', label: '思想类' },
    { key: '生活类', label: '生活类' },
    { key: '经典文化', label: '经典文化' },
    { key: '海外主流', label: '海外主流' },
    { key: '语录精选', label: '语录精选' },
  ];
  const defaultCategory = '思想类';
  const [activeCategory, setActiveCategory] = useState(defaultCategory);
  const [error, setError] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    async function fetchTodayQuote() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/today`);
        if (!response.ok) throw new Error('获取今日金句失败');
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
        if (!response.ok) throw new Error('获取最近金句失败');
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

  useEffect(() => {
    // 预加载默认分类
    loadCategoryQuotes(defaultCategory);
  }, []);

  const handleSearch = async (query: string) => {
    router.push(`/search?q=${encodeURIComponent(query)}`);
  };

  const loadCategoryQuotes = async (category: string) => {
    if (categoryLoading) return;
    // 命中缓存
    if (categoryData[category]) {
      return;
    }
    setCategoryLoading(true);
    try {
      const data = await api.getQuotesByCategory(category, 1, 6);
      setCategoryData((prev) => ({ ...prev, [category]: data }));
    } catch (e) {
      console.error('Failed to fetch category quotes', e);
    } finally {
      setCategoryLoading(false);
    }
  };

  const renderEmpty = () => (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
        gap: 12,
        color: 'var(--text-secondary)',
      }}
    >
      <svg width="120" height="80" viewBox="0 0 200 140" aria-hidden="true">
        <g fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.45">
          <rect x="20" y="40" width="90" height="60" rx="8" />
          <rect x="90" y="20" width="90" height="60" rx="8" />
          <path d="M60 70h10M120 50h15" />
        </g>
        <circle cx="160" cy="95" r="6" fill="currentColor" opacity="0.6" />
      </svg>
      <Typography.Text type="secondary">暂无数据</Typography.Text>
    </div>
  );

  const navItems = [
    { label: '首页', href: '/' },
    { label: '历史', href: '/history' },
    { label: '搜索', href: '/search' },
    { label: '关于', href: '/about' },
  ];

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

  if (loading) {
    return (
      <Layout style={{ minHeight: '100vh', background: 'var(--background)' }}>
        <Content className="max-w-5xl mx-auto px-3 md:px-4 w-full">
          <div style={{ padding: '40px 0' }}>
            <Skeleton active title paragraph={{ rows: 3 }} />
          </div>
        </Content>
      </Layout>
    );
  }

  return (
    <Layout style={{ minHeight: '100vh', background: 'var(--background)' }}>
      <Header style={headerStyle}>
        <div className="max-w-5xl mx-auto px-4 flex items-center justify-center h-full w-full">
          <Space size="middle" wrap align="center">
            {navItems.map((item) => (
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
          <div className="mb-10">
            <SearchBox onSearch={handleSearch} placeholder="搜索励志金句..." />
          </div>

          <div className="mb-12">
            <Space align="center" size="middle" className="mb-4">
              <Typography.Title level={4} style={{ margin: 0 }}>
                今日金句
              </Typography.Title>
              {todayQuote?.is_today && <Tag color="green">今日更新</Tag>}
            </Space>

            {error ? (
              <Alert message={error} type="error" showIcon />
            ) : todayQuote ? (
              <QuoteCard quote={todayQuote} variant="today" />
            ) : (
              <Alert message="今日暂无金句" type="info" showIcon />
            )}
          </div>

          {recentQuotes && recentQuotes.quotes.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center justify-between mb-4">
                <Typography.Title level={4} style={{ margin: 0 }}>
                  最近金句
                </Typography.Title>
                <Link href="/history">
                  <Button type="link" icon={<ArrowRightOutlined />} iconPlacement="end">
                    查看更多
                  </Button>
                </Link>
              </div>
              <div className="masonry">
                {recentQuotes.quotes.map((quote) => (
                  <div key={quote.id} className="masonry-item">
                    <QuoteCard quote={quote} variant="history" />
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="mb-12">
            <div className="flex items-center justify-between mb-4">
              <Typography.Title level={4} style={{ margin: 0 }}>
                分类精选
              </Typography.Title>
            </div>
            <Tabs
              activeKey={activeCategory}
              onChange={(key) => {
                setActiveCategory(key);
                loadCategoryQuotes(key);
              }}
              items={categoryTabs.map((tab) => ({
                key: tab.key,
                label: tab.label,
                children: (
                  <div style={{ minHeight: 100 }}>
                    {categoryLoading && !categoryData[tab.key] ? (
                      <Skeleton active paragraph={{ rows: 3 }} />
                    ) : categoryData[tab.key] && categoryData[tab.key]!.quotes.length > 0 ? (
                      <div className="masonry">
                        {categoryData[tab.key]!.quotes.map((quote) => (
                          <div key={quote.id} className="masonry-item">
                            <QuoteCard quote={quote} variant="history" />
                          </div>
                        ))}
                      </div>
                    ) : (
                      renderEmpty()
                    )}
                  </div>
                ),
              }))}
            />
          </div>

          <div
            className="rounded-lg p-6 shadow-sm"
            style={{
              background: 'var(--card-bg)',
              border: `1px solid var(--border-color)`,
              color: 'var(--text-primary)',
            }}
          >
            <Typography.Title level={5} style={{ marginBottom: 16 }}>
              数据来源
            </Typography.Title>
            <Row gutter={[12, 12]}>
              {[
                { label: '人民网', color: 'red', desc: '观点、理论栏目' },
                { label: '央视网', color: 'blue', desc: '新闻评论、专题报道' },
                { label: '人民日报', color: 'green', desc: '评论版面' },
              ].map((item) => (
                <Col key={item.label} xs={24} sm={12} md={8}>
                  <div
                    className="rounded-md h-full"
                    style={{
                      padding: '10px 12px',
                      background: 'linear-gradient(135deg, var(--card-highlight-start), var(--card-highlight-end))',
                      border: `1px solid var(--card-highlight-border)`,
                    }}
                  >
                    <Space align="center" size={8}>
                      <Tag color={item.color}>{item.label}</Tag>
                      <Typography.Text style={{ color: 'var(--text-secondary)' }}>
                        {item.desc}
                      </Typography.Text>
                    </Space>
                  </div>
                </Col>
              ))}
            </Row>
            <Typography.Text type="secondary" style={{ marginTop: 16, display: 'block' }}>
              * 金句内容来自公开媒体，版权归原作者所有
            </Typography.Text>
          </div>
        </div>
      </Content>
    </Layout>
  );
}
