# antd ide theme

## Usage

### less-loader

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

### css external

```js
import '@alipay/antd-kaitian-theme/lib/index.css';
```

## Developement

- 找到你要覆盖的 antd 组件
- 在 `src` 下新建一个 `${组件名}.less`
- 在 `src/index.less` import 这个文件
- npm run start 即可开始开发对应组件

### Tips

- `antd.less` 基本涵盖 antd 中所有的变量和值，可供快速参考查阅
- 更完整的 antd 的 less 变量请参见 antd repo 源码
