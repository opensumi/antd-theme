import {
  createCache,
  legacyNotSelectorLinter,
  logicalPropertiesLinter,
  parentSelectorLinter,
  StyleProvider,
} from '@ant-design/cssinjs';
import { App, ConfigProvider, theme as antdTheme } from 'antd';
import { useOutlet, usePrefersColor } from 'dumi';
import React from 'react';

import { dark } from './color-theme/dark';
import { light } from './color-theme/light';
// @ts-ignore
import { openSumiAntdTheme } from '../../../lib';

import './index.less';

const styleCache = createCache();
if (typeof global !== 'undefined') {
  (global as any).styleCache = styleCache;
}

const getAlgorithm = (color: string) => {
  if (color === 'dark') {
    return antdTheme.darkAlgorithm;
  }

  if (color === 'light') {
    return antdTheme.defaultAlgorithm;
  }
};

const GlobalLayout: React.FC = () => {
  const outlet = useOutlet();
  const [color] = usePrefersColor();

  const styleText = `:root { ${color === 'dark' ? dark : light} }`

  return (
    <StyleProvider
      cache={styleCache}
      linters={[
        logicalPropertiesLinter,
        legacyNotSelectorLinter,
        parentSelectorLinter,
      ]}
    >
      <ConfigProvider
        prefixCls="sumi"
        theme={{
          hashed: false,
          algorithm: getAlgorithm(color),
          ...openSumiAntdTheme,
        }}
      >
        <App>
          <style>{styleText}</style>
          {outlet}
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default GlobalLayout;
