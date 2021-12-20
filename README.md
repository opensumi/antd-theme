# OpenSumi Ant Design Theme

## Usage

### css external

```js
import '@opensumi/antd-theme/lib/index.css';
```

```jsx
import { ConfigProvider } from 'antd';

// ...

return (
  <ConfigProvider prefixCls="sumi_antd">
    <App />
  </ConfigProvider>
);
```

## Developement

- 找到你要覆盖的 antd 组件
- 在 `src` 下新建一个 `${组件名}.less`
- 在 `src/index.less` import 这个文件
- npm run start 即可开始开发对应组件

### Tips

- `antd.less` 基本涵盖 antd 中所有的变量和值，可供快速参考查阅
- 更完整的 antd 的 less 变量请参见 antd repo 源码
- https://github.com/opensumi/core/wiki/%E5%9F%BA%E7%A1%80%E9%A2%9C%E8%89%B2
