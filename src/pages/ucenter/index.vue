<template >
  <view class="login">
    <view class="welcome">
      <img src="/static/images/service/smile.svg">
      <span>欢迎来到犀鸟车服</span>
    </view>
    <view class="form">
      <view class="inputbox">
        <input type="text" placeholder="输入用户名" v-model="username">
        <img
          class="delete"
          src="/static/images/icon/ic_search_delete.png"
          @click="clearName()"
          v-show="username"
        >
      </view>
      <view class="inputbox">
        <input type="password" placeholder="输入密码" v-if="showPassword" v-model="password">
        <input type="text" placeholder="输入密码" v-else v-model="password">
        <img
          class="delete"
          src="/static/images/icon/ic_search_delete.png"
          @click="clearPsw()"
          v-show="password"
        >
        <img
          class="see"
          src="/static/images/service/invisible.svg"
          @click="showPsw()"
          v-if="showPassword"
        >
        <img class="see" src="/static/images/service/visible.svg" @click="showPsw()" v-else>
      </view>
      <button open-type="getUserInfo" @getuserinfo="goLogin">登录</button>
    </view>
  </view>
</template>

<style lang='less' scoped>
.login {
  background: #fff;
  width: 100%;
  height: 100%;
}
.welcome {
  padding-top: 56.7454px;
  img {
    width: 20.2654px;
    height: 18.24px;
    margin-left: 25.3346px;
  }
  span {
    color: #181e31;
    height: 8.1px;
    font-size: 21.28px;
    margin-left: 10.1346px;
    font-family: PingFangSC-Regular;
  }
}
.form {
  padding: 0 25.3346px;
  font-size: 16.2146px;
  margin-top: 23.8146px;
}
.inputbox {
  border-bottom: 1px solid #e2e2e2;
  height: 50.6654px;
  line-height: 50.6654px;
  margin-top: 15.2px;
  position: relative;
  input {
    border: 0;
    width: 100%;
    padding-top: 17px;
    padding-left: 2.5346px;
  }
  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #aeafba;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #aeafba;
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #aeafba;
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #aeafba;
  }
  .see {
    width: 19px;
    height: 13px;
    position: absolute;
    right: 9.6254px;
    bottom: 19.2546px;
    z-index: 99;
    padding: 5px 10px 0;
  }
  .delete {
    width: 15.2px;
    height: 15.2px;
    position: absolute;
    right: 9.6254px;
    bottom: 15.2px;
    z-index: 99;
    padding: 5px 10px 0;
  }
  &:last-of-type {
    .delete {
      width: 15.2px;
      height: 15.2px;
      position: absolute;
      right: 50.6654px;
      bottom: 17.7346px;
      z-index: 99;
    }
  }
}
button {
  width: 100%;
  height: 41.5454px;
  line-height: 41.5454px;
  font-size: 16.2146px;
  margin-top: 40.5346px;
  background: #4289ff;
  border: 0;
  border-radius: 3.04px;
  color: #fff;
}
</style>

<script>
import wx from 'wx';
import api from '@/utils/api';
import util from '@/utils/util';
import user from '@/services/user';
var app = getApp();
export default {
  data () {
    return {
      userInfo: {},
      canIUse: wx.canIUse('button.open-type.getUserInfo'),
      username: '',
      password: '',
      empty: false,
      openId: '',
      appId: '',
      showPassword: true
    };
  },
  mounted () {
    let userInfo = wx.getStorageSync('userInfo');
    let token = wx.getStorageSync('token');
    if (userInfo && token) {
      app.globalData.userInfo = userInfo;
      app.globalData.token = token;
    } else {
      app.globalData.userInfo = null;
      app.globalData.token = null;
    }
    if (app.globalData.userInfo) {
      this.userInfo = app.globalData.userInfo;
    } else {
      this.userInfo = {};
    }
  },
  methods: {
    // 清除用户名
    clearName () {
      this.username = '';
    },
    // 清除密码
    clearPsw () {
      this.password = '';
    },
    // 查看密码及眼睛变化
    showPsw () {
      this.showPassword = !this.showPassword;
    },
    // 点击登陆
    goLogin () {
      var that = this;
      if (that.username === '' || that.username === null) {
        wx.showToast({
          image: '/static/images/icon/icon_error.png',
          title: '请输入用户名',
          mask: true
        });
        return false;
      }
      if (that.password === '' || that.password === null) {
        wx.showToast({
          image: '/static/images/icon/icon_error.png',
          title: '请输入密码',
          mask: true
        });
        return false;
      }
      wx.showLoading({
        title: '请稍候……'
      });
      // eslint-disable-next-line no-undef
      user.loginByWeixin().then(result => {
        // 存储用户信息.
        that.openId = result.Data.openid;
        app.globalData.openid = result.Data.openid;
        var data = {
          Username: that.username,
          Password: that.password,
          OpenId: that.openId
        };
        util.request(api.BindOpenIdUrl, data, 'POST').then(res => {
          // console.log(res);
          if (res.data.Success && res.data.Data) {
            wx.setStorageSync('mem_username', res.data.Data.mem_username);
            wx.setStorageSync('uc_roleid', res.data.Data.uc_roleid);
            wx.setStorageSync('mem_userId', res.data.Data.mem_userId);
            wx.setStorageSync('openId', that.openId);
            wx.switchTab({
              url: '/pages/service/index'
            })
          } else {
            wx.hideLoading();
            wx.showToast({
              image: '/static/images/icon/icon_error.png',
              title: res.data.AllMessages,
              mask: true
            });
          }
        }).catch((err) => {
          // eslint-disable-next-line no-undef
          alert('1');
          console.log(err);
        });
        // const result = await api.BindOpenId(data);
        // console.log('请求结果', result);
        // if (result.errno === 0) {

        // }
      })
        .catch(err => {
          console.log('登陆失败', err);
        });
    }
  },
  // 原生的分享功能
  onShareAppMessage: function () {
    return {
      title: '犀鸟车服',
      desc: '犀鸟车服',
      path: '/pages/ucenter/index'
    };
  }
};
</script>

