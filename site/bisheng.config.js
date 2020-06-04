const path = require('path');
const fs = require('fs');
const replaceLib = require('@ant-design/tools/lib/replaceLib');
const getWebpackConfig = require('@ant-design/tools/lib/getWebpackConfig');
const EsbuildPlugin = require('esbuild-webpack-plugin').default;

const { version } = require('../package.json');
const themeConfig = require('./themeConfig');

const { webpack } = getWebpackConfig;

const isDev = process.env.NODE_ENV === 'development';

function alertBabelConfig(rules) {
  rules.forEach(rule => {
    if (rule.loader && rule.loader === 'babel-loader') {
      if (rule.options.plugins.indexOf(replaceLib) === -1) {
        rule.options.plugins.push(replaceLib);
      }
      rule.options.plugins = rule.options.plugins.filter(
        plugin => !plugin.indexOf || plugin.indexOf('babel-plugin-add-module-exports') === -1,
      );
      // Add babel-plugin-add-react-displayname
      rule.options.plugins.push(require.resolve('babel-plugin-add-react-displayname'));
      // Add babel-plugin-import
      rule.options.plugins.push([
        require.resolve('babel-plugin-import'),
        {
          libraryName: 'antd',
          style: true, // or 'css'
        },
      ]);
    } else if (rule.use) {
      alertBabelConfig(rule.use);
    }
  });
}

module.exports = {
  port: 8001,
  hash: true,
  source: {
    components: './components',
    docs: './docs',
    // changelog: ['CHANGELOG.zh-CN.md', 'CHANGELOG.en-US.md'],
    // 'components/form/v3': ['components/form/v3.zh-CN.md', 'components/form/v3.en-US.md'],
    'docs/resources': ['./docs/resources.zh-CN.md', './docs/resources.en-US.md'],
  },
  output: process.env.NODE_ENV === 'development' ? './_site' : './dist',
  theme: './site/theme',
  htmlTemplate: './site/theme/static/template.html',
  themeConfig,
  filePathMapper(filePath) {
    if (filePath === '/index.html') {
      return ['/index.html', '/index-cn.html'];
    }
    if (filePath.endsWith('/index.html')) {
      return [filePath, filePath.replace(/\/index\.html$/, '-cn/index.html')];
    }
    if (filePath !== '/404.html' && filePath !== '/index-cn.html') {
      return [filePath, filePath.replace(/\.html$/, '-cn.html')];
    }
    return filePath;
  },
  doraConfig: {
    verbose: true,
  },
  lessConfig: {
    javascriptEnabled: true,
  },
  webpackConfig(config) {
    config.resolve.alias = {
      // 'antd/lib': path.join(process.cwd(), 'components'),
      // 'antd/es': path.join(process.cwd(), 'components'),
      // antd: path.join(process.cwd(), 'index'),
      site: path.join(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter',
      'react-intl': 'react-intl/dist',
    };

    config.externals = {
      'react-router-dom': 'ReactRouterDOM',
    };

    if (isDev) {
      config.devtool = 'source-map';

      // Resolve use react hook fail when yarn link or npm link
      // https://github.com/webpack/webpack/issues/8607#issuecomment-453068938
      config.resolve.alias = { ...config.resolve.alias, react: require.resolve('react') };
    } else if (process.env.ESBUILD) {
      // use esbuild
      config.optimization.minimizer = [new EsbuildPlugin()];
    }

    alertBabelConfig(config.module.rules);

    config.module.rules.push({
      test: /\.mjs$/,
      include: /node_modules/,
      type: 'javascript/auto',
    });

    config.plugins.push(
      new webpack.DefinePlugin({
        antdReproduceVersion: JSON.stringify(version),
      }),
    );

    delete config.module.noParse;

    if (!isDev) {
      // dangerously inject `__webpack_public_path__` to bisheng entry
      const defaultBsEntry = require.resolve('bisheng/tmp/entry.index.js');
      if (fs.existsSync(defaultBsEntry)) {
        const defaultBsEntryContent = fs.readFileSync(defaultBsEntry, 'utf-8');
        const injectedEntryContent = `
  __webpack_public_path__ = window.publicPath || '/';
  ${defaultBsEntryContent.replace('"use strict";', '')}
        `.trim();
        fs.writeFileSync(defaultBsEntry, injectedEntryContent, 'utf-8');
        // eslint-disable-next-line no-console
        console.warn('Dangerously inject `__webpack_public_path__` to bisheng entry');
      } else {
        // eslint-disable-next-line no-console
        console.warn('Cannot found bisheng/tmp/entry.index.js');
      }
    }

    return config;
  },

  devServerConfig: {
    public: process.env.DEV_HOST || 'localhost',
    disableHostCheck: !!process.env.DEV_HOST,
  },

  htmlTemplateExtraData: {
    isDev,
  },
};
