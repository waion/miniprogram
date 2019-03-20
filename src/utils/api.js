import request from './request'

const ApiRootUrl = 'http://cws-api.kuduhz.lunztech.cn/api/';
// const ApiRootUrl = 'http://localhost:49283//api/';
const appkey = '13095435-444a-11e8-b235-7cd30abc9af2';
const appId = 'wxc0132e803000ab86'; // 小程序appid
const secret = '8f88d9fa38fed146f7d6f0d9027d1391'; // 小程序秘钥

const ucUrl = 'http://usercenter2015.lunztech.cn/api/';
// const ucUrl = 'http://usercenter2015.lunz.cn/api/';
const ucKey = '4f500000-4c4f-0200-ad4a-08d6381961ef'
// const ucKey = '8e240000-3e12-0016-6ff5-08d655d1335c'
const dcUrl = 'http://datacenter.lunz.cn/api/';
const dcKey = '536BABCC-DD54-42FB-B43E-31C80B7AFA74';

// eslint-disable-next-line no-unused-vars
const postFunc = function (action, paramObj) {
  return request.post(action, paramObj, {
    baseURL: ApiRootUrl,
    timeout: 0,
    parseJson: true,
    withCredentials: false,
    headers: {
      'AppKey': appkey
    }
  });
};
const getFunc = function (action, paramObj) {
  return request.get(action, paramObj, {
    baseURL: ApiRootUrl,
    timeout: 0,
    withCredentials: false,
    headers: {
      'AppKey': appkey,
      'content-type': 'application/json'
    }
  });
};
const api = {
  // 使用util的request方法，字符串变量即可
  AppId: appId,
  Secret: secret,
  AppKey: appkey,
  // 微信登录1
  AuthLoginByWeixin: ApiRootUrl + 'Membership/BindOpenId',
  // 获取OpenId和Unionid
  GeOpenIdAndUnionId: ApiRootUrl + 'Membership/JsCode2Json',
  // 绑定用户
  BindOpenIdUrl: ApiRootUrl + 'Membership/BindOpenId',
  // 获取列表
  GetProviderList: ApiRootUrl + 'Provider/GetProviderListWX',
  // 上传图片
  AddFileAliyun: ApiRootUrl + 'ResourceItem/AddFileAliyunFromMiniWechat',
  // 用户中心机构
  departId: '4F500000-4C4F-0200-193A-08D314CF4E29', // '8E240000-3E12-0016-2A5E-08D6170DA9D3',
  // 绑定用户
  BindOpenId: (paramObj) => postFunc('Membership/BindOpenId', paramObj),
  // 获取服务商列表
  GetProviderListFunc: (paramObj) => postFunc('Provider/GetProviderListWX', paramObj),
  // 获取个人加装数
  GetProviderNum: (paramObj) => getFunc('Provider/GetProviderNum', paramObj),

  postHandle: (action, params) => request.post(action, params, {
    baseURL: ApiRootUrl,
    headers: {
      'AppKey': appkey,
      'X-Tag': 'flyio',
      'content-type': 'application/json'
    }
  }),
  getHandle: (action, params) => request.get(action, params, {
    baseURL: ApiRootUrl,
    headers: {
      'AppKey': appkey
    }
  }),
  getUCHandle: (action, params) => request.get(action, params, {
    baseURL: ucUrl,
    headers: {
      'AppKey': ucKey,
      'X-Tag': 'flyio',
      'content-type': 'application/json'
    }
  }),
  getDCHandle: (action, params) => request.get(action + '?appKey=' + escape(dcKey), params, {
    baseURL: dcUrl,
    headers: {
      'X-Tag': 'flyio',
      'content-type': 'application/json'
    }
  })
}
export default api
