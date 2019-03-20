<template>
  <view class="index">
    <view class="banner">
      <view class="username">
        <img src="/static/images/service/people.svg" @click="exitLogin()">
        <p>{{mem_username}}</p>
      </view>
      <view class="data">
        <view>
          <p>-</p>
          <span>
            <img src="/static/images/service/icon-ability.svg">
            能力值
          </span>
        </view>
        <view>
          <p>-
            <!-- <i class="total">/50</i> -->
          </p>
          <span>
            <img src="../../../static/images/service/icon-ranking.svg">
            排名
          </span>
        </view>
        <view>
          <p>-</p>
          <span>
            <img src="/static/images/service/icon-add.svg">
            新增服务商
          </span>
        </view>
      </view>
    </view>
    <view class="center">
      <view class="box1" @click="addService()">
        <view class="fl_l">
          <img src="/static/images/service/service-add.svg">
        </view>
        <view class="text">
          <p>新增服务商</p>
          <img class="addimg" src="/static/images/service/ADD.svg">
        </view>
        <view class="fl_r">
          <img src="/static/images/service/icon-right.svg">
        </view>
      </view>
      <view class="box1">
        <view class="fl_l">
          <img src="../../../static/images/service/input-ach1.svg">
        </view>
        <view class="text">
          <p class="text-gray">录入业绩</p>
          <img src="/static/images/service/INPUT.svg">
        </view>
        <view class="fl_r">
          <img src="/static/images/service/icon-qian.svg">
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.banner {
  color: #fff;
  height: 185px;
  background: url(http://cws-wechat.lunz.cn/static/images/service/banner.svg)
    no-repeat;
  background-size: 100% auto;
  .username {
    img {
      width: 51.68px;
      height: 51.68px;
      display: block;
      margin: 0 auto;
      padding-top: 21px;
    }
    p {
      font-size: 14px;
      text-align: center;
      margin-top: 2.5346px;
    }
  }
  .data {
    margin-top: 20px;
    display: flex;
    justify-content: space-around;
    p {
      font-size: 26.8546px;
      text-align: center;
    }
    .total {
      font-size: 13.1746px;
      font-style: normal;
    }
    span {
      font-size: 12.16px;
      text-align: center;
      display: flex;
      justify-content: center;
      margin-top: 8.1054px;
      img {
        width: 9.12px;
        height: 10.1346px;
        margin-right: 6.08px;
      }
    }
  }
}
.center {
  .box1 {
    width: 347.5746px;
    height: 58.2654px;
    background: #fff;
    border-radius: 4.0546px;
    box-shadow: 0px 3px 16px 5px rgba(0, 41, 110, 0.05);
    margin: 20px auto 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .fl_l {
    height: 30.4px;
    img {
      width: 30.4px;
      height: 30.4px;
      margin-left: 21.28px;
    }
    .addimg {
      width: 13.68px;
      height: 5.0654px;
    }
  }
  .text {
    width: 141.8654px;
    margin-left: -106.4px;
    p {
      font-size: 15.2px;
      color: #292930;
    }
    .text-gray {
      color: #a9a9ac;
    }
    img {
      width: 19.2546px;
      height: 5.5746px;
      display: block;
      margin-top: 7.0946px;
      margin-left: 0;
    }
  }
  .fl_r {
    img {
      display: block;
      width: 7.0946px;
      height: 11.1454px;
      margin-right: 15.2px;
    }
  }
}
</style>

<script>
import getCurrentPages from 'wxFunction';
import wx from 'wx';
export default {
  data () {
    return {
      mem_username: ''
    };
  },
  created () {
    this.mem_username = wx.getStorageSync('mem_username');
  },
  methods: {
    addService () {
      wx.navigateTo({
        url: '/pages/service/addInfo'
      })
    },
    developing () {

    },
    // 退出登陆
    exitLogin () {
      wx.showModal({
        title: '',
        confirmColor: '#b4282d',
        content: '退出登录？',
        success: function (res) {
          if (res.confirm) {
            wx.removeStorageSync('mem_username');
            wx.removeStorageSync('uc_roleid');
            wx.removeStorageSync('mem_userId');
            wx.removeStorageSync('openId');
            wx.redirectTo({
              url: '/pages/ucenter/index',
              success: function (e) {
                var page = getCurrentPages().pop();
                if (page === undefined || page === null) return;
                page.onShow();
              }
            });
          }
        }
      });
    }
  }
};
</script>
