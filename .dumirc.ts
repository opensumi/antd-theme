import { defineConfig } from 'dumi';

export default defineConfig({
  // disable mfsu for HMR
  mfsu: false,
  outputPath: 'docs-dist',
  favicons: [
    'https://opensumi.com/favicon-32x32.png?v=844070368776e5e9503bdeccf498ee66',
  ],
  themeConfig: {
    // name: 'antd-theme',
    logo: '/logo.svg',
    footer: false,
  },
  locales: [
    { id: 'zh-CN', name: '中文' },
    { id: 'en-US', name: 'English' },
  ],
  resolve: {
    atomDirs: [{ type: 'component', dir: 'components' }]
  }
});
