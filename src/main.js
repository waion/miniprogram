import Vue from 'vue'
import store from '@/store'
import App from '@/App'
import MpvueRouterPatch from 'mpvue-router-patch'

Vue.config.productionTip = false
Vue.prototype.$store = store
Vue.use(MpvueRouterPatch)

const app = new Vue(App)
app.$mount()
export default {
  // 这个字段走 app.json
  config: {
    'pages': [
      'pages/service/detail'
    ],
    window: {
      backgroundTextStyle: 'dark',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '犀鸟车服',
      navigationBarTextStyle: 'black',
      'enablePullDownRefresh': true
    },
    'usingComponents': {
      'van-search': '/static/vant/search/index',
      'van-row': '/static/vant/row/index',
      'van-col': '/static/vant/col/index',
      'van-tab': '/static/vant/tab/index',
      'van-tabs': '/static/vant/tabs/index',
      'van-cell': '/static/vant/cell/index',
      'van-cell-group': '/static/vant/cell-group/index',
      'van-radio': '/static/vant/radio/index',
      'van-radio-group': '/static/vant/radio-group/index',
      'van-field': '/static/vant/field/index',
      'van-button': '/static/vant/button/index',
      'van-card': '/static/vant/card/index',
      'van-popup': '/static/vant/popup/index',
      'van-icon': '/static/vant/icon/index',
      'van-panel': '/static/vant/panel/index',
      'van-action-sheet': '/static/vant/cell-group/index',
      'van-switch-cell': '/static/vant/switch-cell/index',
      'van-area': '/static/vant/area/index',
      'van-dialog': '/static/vant/dialog/index',
      'van-checkbox': '/static/vant/checkbox/index',
      'van-datetime-picker': '/static/vant/datetime-picker/index'
    },
    tabBar: {
      'backgroundColor': '#fafafa',
      'borderStyle': 'white',
      'selectedColor': '#4289FF',
      'color': '#7D7D81',
      'list': [{
        'pagePath': 'pages/service/index',
        'iconPath': 'static/images/service/home.png',
        'selectedIconPath': 'static/images/service/home-select.png',
        'text': '首页'
      }, {
        'pagePath': 'pages/service/list',
        'iconPath': 'static/images/service/shangdian.png',
        'selectedIconPath': 'static/images/service/shangdian-select.png',
        'text': '服务商'
      }, {
        'pagePath': 'pages/service/chart',
        'iconPath': 'static/images/service/chart.png',
        'selectedIconPath': 'static/images/service/chart-select.png',
        'text': '业绩表'
      }
      ]
    }
  },
  'networkTimeout': {
    'request': 10000,
    'downloadFile': 10000
  },
  'debug': true
}
