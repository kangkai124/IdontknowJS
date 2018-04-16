# eslint-config-airbnb 规则解读

## [jsx-a11y](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react-a11y.js)

#### jsx-a11y/no-static-element-interactions

没有语义化的 DOM 元素不允许绑定事件，需要添加 `role` 属性。

添加 `role` 属性可以使一个元素具有语义，确保你所要表达的意思能够通过被辅助设备识别。

一般的具有交互式语义的 `role` 属性值如下：

```js
// 'button' 'link' 'checkbox' 'menuitem' 'menuitemcheckbox' 'menuitemradio' 'option' 'radio' 'searchbox' 'switch' 'textbox'
```

```html
<div className="foo" onClick={() => {}} role="button" />
```



#### jsx-a11y/interactive-supports-focus

元素具有交互式 role 属性，并且绑定了事件必须是可以 focus 的。

为一个元素添加 `tabindex=-1` ，该元素可以 focus，但是不能通过 tab 选中。当 `tabindex=0` 时，可以被 tab 选中。

```html
<div className="foo" onClick={() => {}} role="button" tabIndex="0" />
```





## [react](https://github.com/airbnb/javascript/blob/master/packages/eslint-config-airbnb/rules/react.js)

#### react/no-unescaped-entities

防止文本中的一些字符在 jsx 解析时被意外的当做 DOM 节点解析，如 `>`,`{`,`'` 等。

建议的做法是把这些字符转成 HTML 字符实体，如下：

```js
// > 用 &gt; 代替
// " 用 &quot;, &ldquo; or &rdquo; 代替
// ' 用 &apos;, &lsquo; or &rsquo; 代替
// } 用 &#125; 代替
```

当然也可以在 eslint 配置中重写默认配置：

```js
"react/no-unescaped-entities": ["error", {"forbid": [">", "}"]}],
```

