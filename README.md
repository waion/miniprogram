# miniprogram

## 相关依赖

* [flyio](https://github.com/wendux/fly/blob/master/README-CH.md) - 同时支持浏览器、小程序、Node、Weex 及快应用的基于 Promise 的跨平台请求库
* [mpvue-entry](https://github.com/F-loat/mpvue-entry) - 集中式页面配置，不再需要重复编辑各页面的 main.js 文件
* [mpvue-router-patch](https://github.com/F-loat/mpvue-router-patch) - 在 mpvue 中使用 vue-router 兼容的路由写法
* [xmlstring2json](https://github.com/vilien/xmlstring2json) - xml字符串转换 json 格式，适用于微信小程序

## 项目模板

* [F-loat/mpvue-quickstart](https://github.com/F-loat/mpvue-quickstart) 使用 mpvue-entry 配置入口，支持新增页面热更新

``` bash
$ vue init F-loat/mpvue-quickstart my-project
```


## Tips

* flyio 使用方法

具体内容参见 [微信小程序中使用flyio](https://wendux.github.io/dist/#/doc/flyio/wx)，这里提示下小程序中需要引入的是 `flyio/dist/npm/wx.js` 这个文件，可以配置下 webpack 的 alias 方便调用

``` js
alias: {
  '@': resolve('src'),
  vue: 'mpvue',
  flyio: 'flyio/dist/npm/wx',
  wx: resolve('src/utils/wx')
}
```

* vuex 使用方法

建立 `src/store/index.js` 文件

``` js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  }
})

export default store
```

在 `src/main.js` 中引用

``` js
import Vue from 'vue'
import store from '@/store'
import App from '@/App'

const app = new Vue({
  store,
  ...App
}).$mount()
```

最后在需要使用 vuex 的页面相对应的 `main.js` 文件中像 `src/main.js` 一样引用即可


