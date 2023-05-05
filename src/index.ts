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
    Notification: {
      colorBgElevated: 'var(--notifications-background)',
      colorTextHeading: 'var(--notifications-foreground)',
      colorText: 'var(--notifications-foreground)',
    },
    Select: {
      colorBgContainer: 'var(--kt-select-background)',
      colorText: 'var(--kt-select-foreground)',
      colorBorder: 'var(--kt-select-border)',
      colorPrimaryBgHover: 'var(--kt-selectOption-activeBorder)',
      colorTextDisabled: 'var(--kt-select-disableForeground)',
      colorBgContainerDisabled: 'var(--kt-select-disableBackground)',

      // select-dropdown
      colorBgElevated: 'var(--kt-selectDropdown-background)',
      controlItemBgHover: 'var(--kt-selectDropdown-hoverBackground)',
      controlItemBgActive: 'var(--kt-selectDropdown-selectionBackground)',
      paddingXXS: 0,
    },
    Dropdown: {
      colorBgElevated: 'var(--kt-selectDropdown-background)',
      colorText: 'var(--kt-selectDropdown-foreground)',
      controlItemBgHover: 'var(--kt-selectDropdown-hoverBackground)',
      controlItemBgActive: 'var(--kt-selectDropdown-selectionBackground)',
      paddingXXS: 0,
    },
    Collapse: {
      colorFillAlter: 'transparent',
      boxShadow: 'none',
    },
    Message: {
      colorBgElevated: 'var(--notifications-background)',
    }
  },
};
