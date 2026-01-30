'use client';

import React, { useEffect, useMemo, useState, createContext, useContext } from 'react';
import { App as AntdApp, ConfigProvider, theme as antdTheme } from 'antd';
import "antd/dist/reset.css";

type ThemeMode = 'light' | 'dark';

interface ThemeContextValue {
  mode: ThemeMode;
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  mode: 'light',
  toggle: () => {},
});

export const useThemeMode = () => useContext(ThemeContext);

export default function Providers({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>('light');

  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme-mode') : null;
    if (saved === 'light' || saved === 'dark') {
      setMode(saved);
    } else if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setMode('dark');
    }
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    localStorage.setItem('theme-mode', mode);
    document.documentElement.setAttribute('data-theme', mode);
  }, [mode]);

  const toggle = () => setMode((prev) => (prev === 'dark' ? 'light' : 'dark'));

  const themeConfig = useMemo(
    () => ({
      algorithm: mode === 'dark' ? [antdTheme.darkAlgorithm] : [antdTheme.defaultAlgorithm],
      token: {
        colorPrimary: '#1677ff',
        colorBgLayout: mode === 'dark' ? '#0b1220' : '#f7f9fb',
        borderRadius: 8,
        fontFamily: 'Inter, "Helvetica Neue", Arial, sans-serif',
      },
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <ConfigProvider theme={themeConfig}>
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ThemeContext.Provider>
  );
}
