'use client';

import { Quote } from '@/app/lib/api';
import Link from 'next/link';
import { Card, Typography, Space, Tag } from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';

interface QuoteCardProps {
  quote: Quote;
  variant?: 'default' | 'today' | 'history' | 'search';
  showLink?: boolean;
}

export default function QuoteCard({ quote, variant = 'default', showLink = true }: QuoteCardProps) {
  const formatDate = (dateString: string) => {
    // 使用固定格式，避免 SSR/CSR 时区差异导致水合不一致
    if (!dateString) return '';
    // 处理类似 "2026-01-30 05:43:42" 形式
    const parts = dateString.split(' ')[0]?.split('-') ?? [];
    if (parts.length === 3) {
      return `${parts[0]}年${parseInt(parts[1], 10)}月${parseInt(parts[2], 10)}日`;
    }
    return dateString;
  };

  const getCardStyle = () => {
    const base = {
      background: 'var(--card-bg)',
      border: `1px solid var(--border-color)`,
      color: 'var(--text-primary)',
    };

    if (variant === 'today') {
      return {
        ...base,
        background: 'linear-gradient(120deg, var(--card-highlight-start) 0%, var(--card-highlight-end) 100%)',
        border: `1px solid var(--card-highlight-border)`,
        boxShadow: '0 8px 28px rgba(0,0,0,0.12)',
      };
    }
    if (variant === 'search') {
      return {
        ...base,
        background: 'var(--search-highlight-bg)',
        border: `1px solid var(--search-highlight-border)`,
      };
    }
    return base;
  };

  const getSourceColor = (source: string) => {
    const colors: Record<string, string> = {
      '人民网': 'red',
      '央视网': 'blue',
      '人民日报': 'green',
    };
    return colors[source] || 'default';
  };

  return (
    <Card
      className="shadow-sm hover:shadow-md transition-shadow"
      style={{ marginBottom: 16, ...getCardStyle() }}
      styles={{ body: { padding: 18 } }}
    >
      <Typography.Paragraph style={{ fontSize: 18, lineHeight: 1.7, marginBottom: 12, color: 'var(--text-primary)' }}>
        {quote.content}
      </Typography.Paragraph>
      {quote.content_en && (
        <Typography.Paragraph style={{ fontSize: 14, lineHeight: 1.5, marginBottom: 8, color: 'var(--text-secondary)' }}>
          {quote.content_en}
        </Typography.Paragraph>
      )}

      <Space wrap size={[8, 12]} style={{ width: '100%', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
        <Space size={8} wrap>
          <Tag color={getSourceColor(quote.source)}>{quote.source}</Tag>
          {quote.author && <Typography.Text type="secondary" style={{ color: 'var(--text-secondary)' }}>作者：{quote.author}</Typography.Text>}
          {quote.category && <Typography.Text type="secondary" style={{ color: 'var(--text-secondary)' }}>分类：{quote.category}</Typography.Text>}
        </Space>
        <Typography.Text type="secondary" style={{ color: 'var(--text-secondary)' }}>{formatDate(quote.created_at)}</Typography.Text>
      </Space>

      {showLink && quote.original_url && (
        <div style={{ marginTop: 10 }}>
          <Link
            href={quote.original_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800"
          >
            <Space size={6}>
              <span>查看原文</span>
              <ArrowRightOutlined />
            </Space>
          </Link>
        </div>
      )}
    </Card>
  );
}
