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

  console.log(color, antdTheme.darkAlgorithm, 'jj');

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
        }}
      >
        <App>{outlet}</App>
      </ConfigProvider>
    </StyleProvider>
  );
};

export default GlobalLayout;
