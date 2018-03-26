## npm script 命令

*npm init -y* 或者 *npm init -f* 跳过参数问答，快速生成 package.json。

shell 命令修改默认配置：

```shell
npm config set init.author.email "kkstrive0124@gmail.com"
npm config set init.author.name "kangkai"
npm config set init.author.url "https://github.com/kangkai124"
npm config set init.license "MIT"
npm config set init.version "0.1.0"
```

*npm run* 是 npm 内置的核心功能之一， 当运行 *npm run xx* 时：

1. 从 package.json 文件中读取 scripts 对象里面的全部配置
2. 以 xx 为键，在 scripts 对象里获取对应的值做为接下来要执行的命令，没找到报错
3. 在 shell 中执行上述命令

执行 *npm run* 不带任何参数，列出可执行的所有命令。



## 运行多个 npm script 命令

安利常用的 4 种代码检查：

1. [eslint](https://link.juejin.im/?target=https%3A%2F%2Feslint.org)，可定制的 js 代码检查
2. [stylelint](https://link.juejin.im/?target=https%3A%2F%2Fstylelint.io)，可定制的样式文件检查，支持 css、less、scss
3. [jsonlint](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Fzaach%2Fjsonlint)，json 文件语法检查，踩过坑的同学会清楚，json 文件语法错误会知道导致各种失败
4. [markdownlint-cli](https://link.juejin.im/?target=https%3A%2F%2Fgithub.com%2Figorshubovych%2Fmarkdownlint-cli)，Markdown 文件最佳实践检查，个人偏好

单元测试：

1. [mocha](https://link.juejin.im/?target=https%3A%2F%2Fmochajs.org)，测试用例组织，测试用例运行和结果收集的框架；
2. [chai](https://link.juejin.im/?target=http%3A%2F%2Fchaijs.com)，测试断言库，必要的时候可以结合 [sinon](https://link.juejin.im/?target=http%3A%2F%2Fsinonjs.org) 使用；

####  多个 npm script 串行

```json
"test": "npm run lint:js && npm run lint:css && npm run lint:json && npm run lint:markdown && mocha tests/"
```

串行执行的时候，如果前面的命令失败，后续的都会终止。

#### 多个 npm script 并行

在严格串行的情况下，我们必须要确保代码中没有编码规范问题才能运行测试，在某些时候可能并不是我们想要的，因为我们真正需要的是，代码变更时同时给出测试结果和测试运行结果。这就需要把子命令的运行从串行改成并行，实现方式更简单，把连接多条命令的 **&&** 符号替换成 **&** 即可。

```json
"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/"
```

在命令的最后增加 **& wait** ，如果我们在任何子命令中启动了长时间运行的进程，比如启动了 mocha 的 **—watch** 配置，可以使用 **Ctrl + c** 结束进程。

```json
"test": "npm run lint:js & npm run lint:css & npm run lint:json & npm run lint:markdown & mocha tests/ & wait"
```

#### 更好的管理方式

[npm-run-all](https://github.com/mysticatea/npm-run-all)



## 给 npm script 传参

简单粗暴方法：

```json
"lint:js": "eslint *.js",
"lint:js:fix": "eslint *.js --fix",
```

当 *lint:js* 命令变长之后，可能会忘记修改 *lint:js:fix* ，所以更健壮的做法是，在运行 *npm script* 是给定额外的参数。

```json
"lint:js": "eslint *.js",
"lint:js:fix": "npm run lint:js -- --fix",
```

要格外注意 `--fix` 参数前面的 `--` 分隔符，意指要给 `npm run lint:js` 实际指向的命令传递额外的参数。

