'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Layout, Typography, Space, Row, Col, Card, Tag, List } from 'antd';
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

export default function AboutPage() {
  const pathname = usePathname();
  const navItems = [
    { label: '首页', href: '/' },
    { label: '历史', href: '/history' },
    { label: '搜索', href: '/search' },
    { label: '关于', href: '/about', active: true },
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

  const features = [
    { title: '权威内容源', desc: '专注央视、人民网等官方媒体金句，确保内容的权威性和可靠性', color: 'blue' },
    { title: '每日更新', desc: '自动化抓取每日最新内容，确保用户每天都有新金句', color: 'green' },
    { title: 'SEO 优化', desc: 'Next.js SSR 提升搜索可见性，让更多人发现励志内容', color: 'purple' },
    { title: '轻量设计', desc: '无需注册登录，即开即用，专注简洁高效的阅读体验', color: 'orange' },
  ];

  const stacks = {
    frontend: ['Next.js 14 (React / SSR)', 'TypeScript', 'Tailwind CSS & Ant Design', '响应式设计'],
    backend: ['Python FastAPI', 'SQLite', 'BeautifulSoup4', 'APScheduler'],
  };

  const sources = [
    { name: '人民网', color: 'red', desc: '观点、理论等栏目励志内容', url: 'https://people.com.cn' },
    { name: '央视网', color: 'blue', desc: '新闻评论、专题报道的深度内容', url: 'https://cctv.com' },
    { name: '人民日报', color: 'green', desc: '评论版面的权威观点与分析', url: 'https://people.com.cn' },
  ];

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
          <Card bordered={false} style={{ marginBottom: 16 }}>
            <Typography.Title level={4}>项目介绍</Typography.Title>
            <Typography.Paragraph>
              <strong>每日励志金句</strong> 聚合权威媒体的励志内容，每日自动从人民网、央视网、人民日报等官方媒体抓取最新金句，为用户提供即时的精神激励。
            </Typography.Paragraph>
            <Typography.Paragraph>
              前端采用 Next.js（SSR）提升体验与 SEO，后端使用 FastAPI 提供高性能 API，配合轻量的 SQLite 存储，让系统易于部署和迭代。
            </Typography.Paragraph>
          </Card>

          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            {features.map((item) => (
              <Col key={item.title} xs={24} sm={12} md={12} lg={6}>
                <Card bordered hoverable>
                  <Tag color={item.color} style={{ marginBottom: 8 }}>{item.title}</Tag>
                  <Typography.Paragraph type="secondary" style={{ margin: 0 }}>
                    {item.desc}
                  </Typography.Paragraph>
                </Card>
              </Col>
            ))}
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
            <Col xs={24} md={12}>
              <Card bordered>
                <Typography.Title level={5}>前端技术</Typography.Title>
                <List
                  size="small"
                  dataSource={stacks.frontend}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card bordered>
                <Typography.Title level={5}>后端技术</Typography.Title>
                <List
                  size="small"
                  dataSource={stacks.backend}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Card>
            </Col>
          </Row>

          <Card bordered style={{ marginBottom: 16 }}>
            <Typography.Title level={5}>数据来源</Typography.Title>
            <Row gutter={[16, 16]}>
              {sources.map((src) => (
                <Col key={src.name} xs={24} md={8}>
                  <Card size="small" bordered>
                    <Space>
                      <Tag color={src.color}>{src.name}</Tag>
                      <Typography.Text type="secondary">{src.desc}</Typography.Text>
                    </Space>
                    <div className="mt-2">
                      <a href={src.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 text-sm">
                        访问官网 →
                      </a>
                    </div>
                  </Card>
                </Col>
              ))}
            </Row>
            <Typography.Text type="secondary" style={{ display: 'block', marginTop: 12 }}>
              声明：本站所有金句内容均来自公开媒体，版权归原作者所有。如涉及版权问题，请联系我们删除。
            </Typography.Text>
          </Card>

          <Card bordered>
            <Typography.Title level={5}>联系我们</Typography.Title>
            <Row gutter={[16, 16]}>
              <Col xs={24} md={12}>
                <List
                  size="small"
                  dataSource={[
                    '项目名称：每日励志金句',
                    '项目类型：开源项目',
                    '开发时间：2024年',
                    '技术栈：Next.js + Python FastAPI',
                  ]}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
              <Col xs={24} md={12}>
                <Space orientation="vertical" size={8}>
                  <Link href="/" className="text-blue-600 hover:text-blue-800">← 返回首页</Link>
                  <Link href="/history" className="text-blue-600 hover:text-blue-800">浏览历史金句</Link>
                  <Link href="/search" className="text-blue-600 hover:text-blue-800">搜索励志内容</Link>
                </Space>
              </Col>
            </Row>
          </Card>
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
