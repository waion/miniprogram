<template>
  <view class="list">
    <view class="top">
      <view class="search border1">
        <view class="search_w">
          <input
            @keyup.13="search()"
            type="text"
            v-model="searchContent"
            placeholder="请输入门店名称/联系电话查看"
          >
        </view>
        <img
          class="delete"
          src="/static/images/icon/ic_search_delete.png"
          @click="clearContent()"
          v-show="searchContent"
        >
      </view>
      <view class="tabs border1">
        <span
          class="left"
          @click="toggleTabs(0)"
        >
          <a :class="{active: nowIndex===0}">全部</a>
        </span>
        <span
          class="left"
          @click="toggleTabs(1)"
        >
          <a :class="{active: nowIndex===1}">我负责的({{num}})</a>
        </span>
      </view>
    </view>
    <view style="height:100px"></view>
      <view>
        <view class="stop_bg" v-show="nowIndex===0" v-for="(item,index) in providerList" :key="index">
          <view class="cardl border10" @click="toDetail(item.Id)">
            <view class="left">
              <view class="title">{{item.SPName == null ? '-':item.SPName}}</view>
              <view class="marb">
                <img class="iconI" src="/static/images/icon/phone.svg">
                <span class="name">{{item.ConnectName == null ? '-':item.ConnectName}}</span>
                <span class="number">{{item.ConnectMobile == null ? '-':item.ConnectMobile}}</span>
              </view>
              <view class="address">
                <img class="iconI" src="/static/images/icon/dizhi.svg">
                <span class="name">{{item.Address == null ? '-':item.Address}}</span>
              </view>
            </view>
            <view class="right">
              <view class="named">{{item.SellerName == null ? '-':item.SellerName}}</view>
              <view class="date">{{item.UpdatedAt}}</view>
            </view>
          </view>
        </view>
      </view>
    <view>
      <view v-show="nowIndex===1" v-for="(item,index) in providerListOwn" :key="index">
        <view class="cardl border10" @click="toDetail(item.Id)">
          <view class="left">
            <view class="title">{{item.SPName == null ? '-':item.SPName}}</view>
            <view class="marb">
              <img class="iconI" src="/static/images/icon/phone.svg">
              <span class="name">{{item.ConnectName == null ? '-':item.ConnectName}}</span>
              <span class="number">{{item.ConnectMobile == null ? '-':item.ConnectMobile}}</span>
            </view>
            <view class="address">
              <img class="iconI" src="/static/images/icon/dizhi.svg">
              <span class="name">{{item.Address == null ? '-':item.Address}}</span>
            </view>
          </view>
          <view class="right">
            <view class="named">{{item.SellerName == null ? '-':item.SellerName}}</view>
            <view class="date">{{item.UpdatedAt}}</view>
          </view>
        </view>
      </view>
    </view>

    <view class="add" @click="ysRouter" id="add">
      <img :src="changeImg===true?'/static/images/service/activeAdd.svg':'/static/images/service/addlist.svg'">
    </view>
    
    <van-dialog id="van-dialog" />
  </view>
</template>

<style lang="less" scoped>
.list {
  background: #fff;
  width: 100%;
  height: 100%;
  position: relative;
}
.border1 {
  border-bottom: 1px solid #ebebeb;
}
.border10 {
  border-bottom: 9.9975px solid #f4f5f8;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.top {
  position: fixed;
  top: 0;
  z-index: 999;
  background: #fff;
}
.search {
  position: relative;
  height: 47px;
  width: 375px;
  display: flex;
  align-items: center;
  justify-content: center;

  .search_w {
    background-image: url("http://cws-wechat.lunz.cn/static/images/icon/ic_search.png");
    background-repeat: no-repeat;
    background-size: 11px 11px;
    background-position: 17px center;
    border-radius: 17px;
    background-color: #f4f5f8;
  }
  .delete {
    width: 15px;
    height: 15px;
    position: absolute;
    right: 20px;
    bottom: 15px;
  }

  input {
    width: 320px;
    height: 32px;
    border-radius: 18px;
    font-size: 12px;
    border: 0;
    background: #f4f5f8;
    margin-left: 37px;
    z-index: 100;
  }
}
.tabs {
  height: 52px;
  font-size: 14px;
  span {
    line-height: 50px;
    width: 187.5px;
    font-weight: 500;
    display: flex;
    justify-content: center;
  }
  a {
    display: inline-block;
  }
  .active {
    color: #4289ff;
    border-bottom: 3px solid #4289ff;
    font-weight: 800;
  }
}
.left {
  float: left;
}
.right {
  float: right;
}
.cardl {
  padding: 17px 16px;
  font-size: 12px;
  background: #fff;
  color: #484848;
  overflow: hidden;
  position: relative;
  .title {
    font-size: 17px;
    margin-bottom: 13.5px;
    width: 230px;
    height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .marb {
    margin-bottom: 10px;
    overflow: hidden;
  }
  .address {
    overflow: hidden;
  }

  .iconI {
    height: 12px;
    width: 12px;
    margin-right: 6px;
    float: left;
  }
  .name {
    color: #6e6e6e;
    max-width: 190px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
    float: left;
    margin-right: 5px;
  }
  .number {
    color: #999999;
  }
  .named {
    font-size: 14px;
    text-align: right;
    height: 14px;
  }
  .date {
    margin-top: 12px;
    color: #999999;
    text-align: right;
  }
}
.add {
  position: fixed;
  bottom: 91px;
  right: 29px;
  img {
    width: 66px;
    height: 66px;
  }
  .haveList {
    margin-top: 56px;
  }
  .weui-cell {
    padding: 10px 15px;
    position: relative;
    display: flex;
    align-items: center;
  }
}
</style>

<script>
import { setTimeout } from 'timers';
import wx from 'wx';
import api from '@/utils/api';
import util from '@/utils/util';
export default {
  data () {
    return {
      changeImg: '',
      Loop: null,
      isNoData: false,
      isNoData1: false,
      isloading: true, // 列表加载
      isloading1: true, // 列表加载
      nowIndex: 0,
      searchContent: '',
      providerList: [],
      providerListOwn: [],
      num: 0,
      params: {
        paging: {
          pageIndex: 1,
          pageSize: 20,
          filters: []
        },
        queryGroup: {
          op: 'or',
          groups: [],
          rules: []
        }
      }
    };
  },
  async mounted () {
    this.getProviderList();
    this.getProviderNum();
  },
  // 下拉刷新方法
  async onPullDownRefresh () {
    this.params.paging.pageIndex = 1;
    this.providerList = [];
    this.getProviderList();
    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  // 上拉加载，拉到底部触发
  onReachBottom () {
    this.params.paging.pageIndex++;
    this.getProviderList();
  },
  methods: {
    ysRouter () {
      this.changeImg = true;
      setTimeout(() => {
        this.changeImg = false;
        wx.navigateTo({
          url: 'addInfo'
        })
      }, 400);
    },
    toDetail (id) {
      wx.navigateTo({
        url: 'detail?id=' + id
      })
    },
    search () {
      this.toggleTabs(this.nowIndex);
    },
    clearContent () {
      this.searchContent = '';
      this.toggleTabs(this.nowIndex);
    },
    // 切换tabs
    async toggleTabs (i) {
      this.nowIndex = i;
      this.params.paging.pageIndex = 1;
      if (i === 0) {
        this.params.paging.Filters = [];
        this.providerList = [];
      } else {
        this.params.paging.Filters = [
          {
            field: 'SellerId',
            op: 'eq',
            term: wx.getStorageSync('mem_userId')
          }
        ];
        this.providerListOwn = [];
      }
      await this.getProviderList();
    },
    // 获取列表
    async getProviderList () {
      wx.showLoading({
        title: '加载中'
      });
      if (this.searchContent) {
        this.params.queryGroup.rules = [
          {
            field: 'SPName',
            op: 'cn',
            datas: [this.searchContent]
          },
          {
            field: 'ConnectMobile',
            op: 'cn',
            datas: [this.searchContent]
          }
        ];
      } else {
        this.params.queryGroup.rules = [];
      }
      if (this.nowIndex === 0) {
        api.postHandle('Provider/GetProviderListWX', this.params).then(res => {
          if (res.Success) {
            res.Data.forEach(x => {
              x.UpdatedAt = util.formatDate(x.UpdatedAt);
              this.providerList.push(x);
            })
            wx.hideLoading();
            if (this.providerList.length === 0) {
              this.isNoData = true;
            } else {
              this.isNoData = false;
            }
          } else {
            wx.showToast({
              image: '/static/images/icon/icon_error.png',
              title: '数据查询失败！',
              mask: true
            });
            wx.hideLoading();
          }
        });
      } else {
        const res = await api.postHandle('Provider/GetProviderListWX', this.params);
        if (res.Success) {
          res.Data.forEach(x => {
            x.UpdatedAt = util.formatDate(x.UpdatedAt);
            this.providerListOwn.push(x);
          });
          wx.hideLoading();
          if (this.providerList.length === 0) {
            this.isNoData1 = true;
          } else {
            this.isNoData1 = false;
          }
        } else {
          wx.hideLoading();
          this.isloading1 = false;
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '数据查询失败！',
            mask: true
          });
        }
      }
    },
    // 获取服务商数量
    async getProviderNum () {
      var params = {
        userId: wx.getStorageSync('mem_userId')
      };
      const res = await api.GetProviderNum(params);
      if (res.Success) {
        this.num = res.Data;
      } else {
        wx.showToast({
          image: '/static/images/icon/icon_error.png',
          title: '数据查询失败！',
          mask: true
        });
      }
    },
    // 格式化日期
    formatDate (date) {
      if (date && date !== null) {
        return date.split('T')[0];
      } else {
        return date;
      }
    }
  }
};
</script>
