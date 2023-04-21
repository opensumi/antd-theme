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
import { openSumiAntdTheme } from '../../../lib';

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

  console.log(color, 'color');

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
        theme={{
          algorithm: getAlgorithm(color),
          ...openSumiAntdTheme,
        }}
      >
        <App>
          <style>{styleText}</style>
          <div style={{
            width: '100px',
            height: '100px',
            backgroundColor: 'var(--errorForeground)',
          }}></div>
          {outlet}
        </App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default GlobalLayout;
