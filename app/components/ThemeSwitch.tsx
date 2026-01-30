'use client';

import { Switch, Tooltip } from 'antd';
import { BulbOutlined, MoonOutlined } from '@ant-design/icons';
import { useThemeMode } from '@/app/providers';

export default function ThemeSwitch() {
  const { mode, toggle } = useThemeMode();

  return (
    <Tooltip title={mode === 'dark' ? '切换到亮色主题' : '切换到暗色主题'}>
      <Switch
        checked={mode === 'dark'}
        onChange={toggle}
        checkedChildren={<MoonOutlined />}
        unCheckedChildren={<BulbOutlined />}
      />
    </Tooltip>
  );
}
