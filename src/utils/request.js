import wx from 'wx'
import Fly from 'flyio'

const request = new Fly()

// 设置请求基地址
// request.config.baseURL = "http://127.0.0.1:8081/"

request.interceptors.request.use((request) => {
  return request
})

request.interceptors.response.use(
  (response, promise) => {
    // console.log('数据返回');
    wx.hideNavigationBarLoading()
    return promise.resolve(response.data)
  },
  (err, promise) => {
    wx.hideNavigationBarLoading()
    wx.showToast({
      title: err.message,
      icon: 'none'
    })
    return promise.resolve()
  }
)

export default request
