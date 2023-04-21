import type { ThemeConfig } from 'antd';

export const openSumiAntdTheme: ThemeConfig = {
  token: {
    colorText: 'var(--vscode-foreground)',
    colorBgContainer: 'var(--vscode-input-background)',
    colorBorder: 'var(--vscode-input-border, transparent)',
    borderRadius: 2,
    colorPrimaryHover: 'var(--vscode-focusBorder)',
    colorBgElevated: 'var(--vscode-dropdown-background)',
    controlItemBgActive: 'var(--vscode-list-activeSelectionBackground)',
  },
  components: {
    Collapse: {
      padding: 0,
      colorFillAlter: 'transparent',
    },
    Button: {
      controlTmpOutline: 'none',
      colorPrimary: 'var(--vscode-button-background)',
      colorPrimaryHover: 'var(--vscode-button-hoverBackground)',
      colorPrimaryActive: 'var(--vscode-button-hoverBackground)',
    },
    Input: {
      controlOutline: 'none',
    },
    Select: {
      controlOutline: 'none',
    },
    Checkbox: {
      // 选中时候的背景色
      colorPrimary: 'var(--vscode-focusBorder)',
      // colorBorder: 'var(--vscode-focusBorder)',
      // colorBorder: 'none',
      colorBorder: 'var(--vscode-input-border, transparent)',
      // 非选中状态
      colorBgContainer: 'var(--vscode-input-background)',
    },
    Steps: {
      // 执行成功后的两个节点中间横线的颜色
      // colorPrimary: 'var(--vscode-focusBorder)',
      colorBorderSecondary: 'var(--vscode-checkbox-border)',
    }
  },
};
