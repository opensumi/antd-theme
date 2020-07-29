# antd ide theme

## Usage

### css external

```js
import '@alipay/antd-kaitian-theme/lib/index.css';
```

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider prefixCls="ide">
    <App />
  </ConfigProvider>
);
```

### [Deprecated] less-loader

由于 antd 的设计体系和 kaitian 主题的设计体系存在一定差异，因此仅通过 less vars 无法覆盖到局部细节，如 `@text-color` 等，因此这种用法不可行

```js
{
  loader: 'less-loader',
  options: {
    javascriptEnabled: true,
    lessOptions: {
      modifyVars: require('@alipay/antd-kaitian-theme'),
    },
  }
}
```

## Developement

- 找到你要覆盖的 antd 组件
- 在 `src` 下新建一个 `${组件名}.less`
- 在 `src/index.less` import 这个文件
- npm run start 即可开始开发对应组件

### Tips

- `antd.less` 基本涵盖 antd 中所有的变量和值，可供快速参考查阅
- 更完整的 antd 的 less 变量请参见 antd repo 源码
- https://yuque.antfin-inc.com/ide-framework/ide-token
