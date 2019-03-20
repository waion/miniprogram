/**
 * 用户相关服务
 */
import wx from 'wx';
import api from '@/utils/api';
import util from '@/utils/util';
/**
 * 调用微信登录
 */
function loginByWeixin () {
  let code = null;
  let data = {
    appId: api.AppId,
    secret: api.Secret,
    js_code: null,
    encryptedData: '',
    iv: ''
  }
  // eslint-disable-next-line no-undef
  return new Promise(function (resolve, reject) {
    // eslint-disable-next-line no-undef
    return util.login().then((res) => {
      code = res.code;
      return util.getUserInfo();
    }).then((userInfo) => {
      data.js_code = code;
      data.encryptedData = userInfo.encryptedData;
      data.iv = userInfo.iv;
      util.request(api.GeOpenIdAndUnionId, data, 'POST').then(res => {
        if (res.data.Success) {
          resolve(res.data);
        } else {
          reject(res);
        }
      }).catch((err) => {
        reject(err);
      });
    }).catch((err) => {
      reject(err);
    })
  });
}
/**
 * 判断用户是否登录
 */
function checkLogin () {
  return new Promise(function (resolve, reject) {
    if (wx.getStorageSync('userInfo') && wx.getStorageSync('token')) {
      util.checkSession().then(() => {
        resolve(true);
      }).catch(() => {
        reject(false);
      });
    } else {
      reject(false);
    }
  });
}

const user = {
  loginByWeixin,
  checkLogin
}

export default user
