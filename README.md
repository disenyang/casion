<p align="center">
  <img src="http://u.xiaowanwu.cn/toolkit.svg">
</p>

> 一站式开发平台，包括组件管理、模版管理、h5 vue（angular）代码一键生成、ios oc代码生成、android代码生成、java代码生成。大大提高了开发效率并制定了相应的技术规范。

## 浏览器支持
Modern browsers and Internet Explorer 10+.

## 链接
- 首页和文档
  - [官方说明]()

## 安装
```shell
npm install fe-set -S
```

## 快速开始
``` javascript
import Vue from 'vue'
import FeSet from 'fe-set'

Vue.use(FeSet)

// or（部分加载）
import {
  Select,
  Button
  // ...
} from 'fe-set'

Vue.component(Select.name, Select)
Vue.component(Button.name, Button)
```
更多介绍请参考 [Quick Start]()