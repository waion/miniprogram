module.exports = [
  {
    path: 'pages/service/index',
    name: 'service',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '犀鸟车服'
    }
  },
  {
    path: 'pages/service/list',
    name: 'list',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '服务商列表'
    }
  },
  {
    path: 'pages/service/chart',
    name: 'chart',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '业绩榜'
    }
  },
  // 上面是tabBar
  {
    path: 'pages/service/addInfo',
    name: 'addInfo',
    config: {
      enablePullDownRefresh: true,
      navigationBarTitleText: '新增'
    }
  },
  {
    path: 'pages/ucenter/index',
    name: 'ucenter',
    config: {
      navigationBarTitleText: '授权登录'
    }
  },
  {
    path: 'pages/service/detail',
    name: 'detail',
    config: {
      navigationBarTitleText: '详情'
    }
  },
  {
    path: 'pages/service/orderDetail',
    name: 'orderDetail',
    config: {
      navigationBarTitleText: '订单记录详情'
    }
  },
  {
    path: 'pages/service/editInfo',
    name: 'edit',
    config: {
      navigationBarTitleText: '编辑'
    }
  }
]
