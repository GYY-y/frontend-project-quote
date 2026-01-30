'use client';

import { useState } from 'react';
import { Input, Button, Space } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

interface SearchBoxProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}

export default function SearchBox({ onSearch, onValueChange, placeholder = '搜索励志金句...', defaultValue = '' }: SearchBoxProps) {
  const [query, setQuery] = useState(defaultValue);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (value: string) => {
    setQuery(value);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const value = query.trim();
    if (!value) return;

    setIsLoading(true);
    try {
      await onSearch(value);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <Space.Compact style={{ width: '100%' }}>
        <Input
          size="large"
          allowClear
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          prefix={<SearchOutlined />}
          disabled={isLoading}
          onPressEnter={() => handleSubmit()}
        />
        <Button
          type="primary"
          size="large"
          onClick={() => handleSubmit()}
          disabled={isLoading || !query.trim()}
          icon={<SearchOutlined />}
        >
          搜索
        </Button>
      </Space.Compact>
    </form>
  );
}
