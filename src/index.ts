import type { ThemeConfig } from 'antd';

export const openSumiAntdTheme: ThemeConfig = {
  token: {
    borderRadius: 2,
    boxShadow: 'none',
  },
  components: {
    Input: {
      colorBgContainer: 'var(--input-background)',
      colorText: 'var(--input-foreground)',
      colorBorder: 'var(--kt-input-border)',
      colorPrimaryHover: 'var(--focusBorder)',
      colorTextDisabled: 'var(--kt-input-disableForeground)',
      colorBgContainerDisabled: 'var(--kt-input-disableBackground)',
    },
  },
};
