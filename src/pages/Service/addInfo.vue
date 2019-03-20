<template>
  <view class="info">
    <view class="tabs border1">
      <span>
        <a :class="{active: nowIndex==0}">基本信息</a>
      </span>
      <span>
        <a :class="{active: nowIndex==1}">门店信息</a>
      </span>
      <span>
        <a :class="{active: nowIndex==2}">经营范围</a>
      </span>
      <span>
        <a :class="{active: nowIndex==3}">详细信息</a>
      </span>
    </view>
    <view v-show="nowIndex==0">
      <view class="form-group border1">
        <label class="form-name">店铺性质</label>
        <radio-group class="radio_box" @change="radioChange">
          <radio value="true"/>有效
          <radio color="#EA5A49" value="false"/>无效
        </radio-group>
      </view>

      <view class="form-group border1">
        <label class="form-name">门店名称</label>
        <input type="text" v-model="params.spinfo.sPName" placeholder="必填">
      </view>
      <view class="form-group border1">
        <label class="form-name">商户类型</label>
        <picker mode="selector" @change="bindPickerChange" @cancel="bindPickerCancel" :value="index" :range="merchantType" range-key="name" class="type">
          <view class="picker">{{merchantType[index].name}}</view>
        </picker>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1">
        <label class="form-name">店长姓名</label>
        <input type="text" v-model="params.secondary.connectName" placeholder="必填">
      </view>
      <view class="form-group">
        <label class="form-name">联系电话</label>
        <input type="text" v-model="params.secondary.connectMobile">
      </view>
      <view class="border16"></view>
      <view class="form-group border1" @click="showMap()">
        <label class="form-name add-name">详细地址</label>
        <span class="address" id="address">{{params.secondary.address}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1" @click="choiceType">
        <label class="form-name">商圈类别</label>
        <span id="sqlb">{{sqlb}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="border16"></view>
      <view class="form-group border1">
        <label class="form-name">门店连锁数量</label>
        <input type="number" oninput="this.value = this.value.replace(/[^0-9]/g, '')" v-model="params.secondary.storeNumber">
      </view>
      <view class="form-group border1">
        <label class="form-name">品牌</label>
        <input type="text" v-model="params.secondary.brandName">
      </view>
      <view class="form-group border1">
        <label class="form-name">纳税人类别</label>
        <picker mode="selector" @change="bindTaxType" @cancel="bindTaxCancel" :value="taxIndex" :range="taxType" class="type">
          <view class="picker">{{taxType[taxIndex]}}</view>
        </picker>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="form-group">
        <label class="form-name">开业年份</label>
        <picker mode="selector" @change="bindYearChange" @cancel="bindTaxCancel" :value="yearIndex" :range="yearList" class="type">
            <view class="picker">
              {{yearList[yearIndex]}}
            </view>
        </picker>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="border16"></view>
      <view class="pic-group border1">
        <label class="pic-name">店面近景图片</label>
        <view class="imageUp" @click="chooseImage(0)">
          <img class="upload_in" :src="closeImg" alt>
        </view>
      </view>
      <view class="pic-group">
        <label class="pic-name">店面远景图片</label>
        <view class="imageUp" @click="chooseImage(1)">
          <img class="upload_in" :src="longImg" alt>
        </view>
      </view>
    </view>
    <view v-show="nowIndex==1">
      <view class="form-group border1" @click="startTime()">
        <label class="form-name">开业时间</label>
        <span v-if="params.secondary.businessBeginTime==''">请选择</span>
        <span v-if="params.secondary.businessBeginTime!=''">{{params.secondary.businessBeginTime}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1" @click="endTime()">
        <label class="form-name">歇业时间</label>
        <span v-if="params.secondary.businessEndTime==''">请选择</span>
        <span v-if="params.secondary.businessEndTime!=''">{{params.secondary.businessEndTime}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1">
        <label class="form-name">工位数</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.secondary.maxStation"
          placeholder="必填"
        >
        <i>个</i>
      </view>
      <view class="form-group border1">
        <label class="form-name">员工数量</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.status.employNumber"
        >
        <i>个</i>
      </view>
      <view class="form-group">
        <label class="form-name">门店面积</label>
        <input
          class="smInput"
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="params.secondary.area"
        >
        <i>平方米</i>
      </view>
      <view class="border16"></view>
      <view class="form-group border1">
        <label class="form-name">标准洗车价</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="smallCar"
        >
        <i>元</i>
      </view>
      <view class="form-group border1">
        <label class="form-name">大车加价</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="bigCar"
        >
        <i>元</i>
      </view>
      <view class="form-group border1">
        <label class="form-name">精洗零售价</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="washGood"
        >
        <i>元</i>
      </view>
      <view class="form-group border1">
        <label class="form-name">会员普洗均价</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="washCard"
        >
        <i>元</i>
      </view>
      <view class="form-group">
        <label class="form-name">日均进店车次</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.status.carperDay"
        >
        <i>次</i>
      </view>
      <view class="border16"></view>
      <view class="form-group" @click="payWay()">
        <label class="form-name">支付方式</label>
        <span id="payway">{{payway}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
      <view class="border16"></view>
      <view class="form-group border1">
        <label class="form-name">支持快洗</label>
        <radio-group class="radio_box" @change="serviceKX">
          <radio value="true"/>是
          <radio color="#EA5A49" value="false"/>否
        </radio-group>
      </view>
      <view class="form-group border1">
        <label class="form-name">有电路施工能力</label>
        <radio-group class="radio_box" @change="serviceDL">
          <radio value="true"/>是
          <radio color="#EA5A49" value="false"/>否
        </radio-group>
      </view>
      <view class="form-group border1">
        <label class="form-name">支持预约</label>
        <radio-group class="radio_box" @change="serviceYY">
          <radio value="true"/>是
          <radio color="#EA5A49" value="false"/>否
        </radio-group>
      </view>
      <view class="form-group border1">
        <label class="form-name">有LED屏</label>
        <radio-group class="radio_box" @change="serviceLED">
          <radio value="true"/>是
          <radio color="#EA5A49" value="false"/>否
        </radio-group>
      </view>
    </view>
    <view v-show="nowIndex==2">
      <view class="explain">请分别选择各项的经营范围</view>
      <view class="form-group border1 border0" v-for="(item,index) in res" :key="index" @click="choiceProject(index)">
        <label class="jy-name">{{item.Name}}</label>
        <span class="jyfw">{{item.content}}</span>
        <img src="/static/images/service/icon-right.svg">
      </view>
    </view>
    <view v-show="nowIndex==3">
      <view class="form-group">
        <label class="form-name">责任销售</label>
        <span class="selling">{{params.spinfo.sellerName}}</span>
      </view>
      <view class="cooTitle">合作产品</view>
      <view class="cooProduct border1" v-for="(item, index) in productList" :key="index">
        <input type="checkbox" :id="item.Id" :checked="item.checked" @click="changeProduct(item)">
        <label :for="item.Id" @click="changeProduct(item)">{{item.Name}}</label>
        <span v-if="item.checked==true" @click="proStartTime(index)"  >
          <img src="/static/images/service/icon-rili.svg" >
          <span>{{item.beginTime==null?'合作时间':item.beginTime}}</span>
        </span>
      </view>
      <view class="cooProduct">
        <input type="checkbox" name="none" id="none" v-model="nothing" @click="changeNothing()">
        <label for="none">暂无</label>
      </view>
      <view class="border16"></view>
      <view class="form-group" id="remarks">
        <label class="form-name">备注</label>
        <textarea v-model="params.spinfo.remark" @change="slip()"></textarea>
      </view>
    </view>
    <view class="botbackground"></view>
    <view class="infoComplate">
      <button @click="backTabs()" class="backbtn" v-if="nowIndex==0">返回</button>
      <button @click="backTabs()" class="backbtn" v-else>上一步</button>
      <button @click="changeTabs()" class="btn" v-if="nowIndex!=3">下一步</button>
      <button @click="changeTabs()" class="btn" v-else>保存</button>
    </view>

    <!-- 选择支付方式弹窗 -->
    <van-dialog use-slot async-close title="选择支付方式（可多选）" :show="show1" show-cancel-button @close="payClose" closeOnClickOverlay>
      <view class="checkbox_box" v-for="(item,index) in payWayArr" :key="index" @click="changePayWay(item)">
        <label :for="item.id" class="check_title">{{item.name}}</label>
        <input type="checkbox" class="check_box" :id="item.id" :checked="item.checked">
      </view>
    </van-dialog>
    <!-- 营业时间弹窗 -->
    <van-popup :show="show4" position="bottom" :overlay="false">
      <van-datetime-picker
        :value="currentDate"
        type="time"
        min-hour="0"
        max-hour="23"
        @confirm="choseT"
        @cancel="cancelchooseT"
      />
    </van-popup>
    <!-- 歇业时间弹窗 -->
    <van-popup :show="show5" position="bottom" :overlay="false">
      <van-datetime-picker
        :value="currentDate2"
        type="time"
        :min-hour="0"
        :max-hour="23"
        @confirm="endT"
        @cancel="cancelendT"
      />
    </van-popup>
    <!-- 快富通开始时间弹窗 -->
    <van-popup :show="show6" position="bottom" :overlay="false">
      <van-datetime-picker
        :value="currentDate1"
        type="date"
        @confirm="confirmkftTime"
        @cancel="cancelkftTime"
      />
    </van-popup>
    <!-- 经营范围弹窗 -->
    <van-dialog :show="show" show-cancel-button use-slot async-close @close="beforeClose" closeOnClickOverlay :title="title" class="cusDialog">
      <view class="bussiness">
        <view class="bussiness-group border1" @click="checkedAll">
          <input type="checkbox" :id="100" :checked="checked">
          <label :for="100">全选</label>
        </view>
        <view class="bussiness-group border1" v-for="(option, index) in checkArr" :key="index" @click="changeSelect(option)">
          <input type="checkbox" :id="option.Id" :value="option.Id" :checked="option.checked">
          <label :for="option.Id">{{option.Name}}</label>
        </view>
      </view>
    </van-dialog>
    <!-- 商圈类别弹窗 -->
    <van-dialog use-slot async-close title="选择商圈类别" :show="show2" show-cancel-button closeOnClickOverlay @close="sqClose">
      <view class="checkbox_box" v-for="(item,index) in checkboxArr" :key="index" @click="changeType(item)">
        <label :for="item.id" class="check_title">{{item.name}}</label>
        <input type="checkbox" class="check_box" :id="item.id" :checked="item.checked">
      </view>
    </van-dialog>
    <!-- 返回警告弹窗 -->
    <van-dialog id="van-dialog" />
  </view>
</template>

<style lang="less" scoped>
.cusDialog {
  overflow: initial !important;
}
select {
  border: none;
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
}
select::-ms-expand {
  display: none;
}
.info {
  width: 100%;
  background: #fff;
  font-size: 15px;
  color: #484848;
}
.border1 {
  border-bottom: 1px solid #ebebeb;
}
.border16 {
  width: 100%;
  height: 8px;
  background: #f4f5f8;
}
.tabs {
  height: 55px;
  font-size: 14px;
  font-weight: 800;
  span {
    line-height: 55px;
    display: inline-block;
    width: 25%;
    text-align: center;
  }
  a {
    height: 52.5px;
    color: #aaaaaa;
    display: inline-block;
  }
  .active {
    color: #4289ff;
    border-bottom: 4px solid #4289ff;
  }
}
.form-group {
  height: 55px;
  width: 343px;
  padding: 0 16px;
  line-height: 55px;
  overflow: hidden;
  .form-name {
    display: block;
    width: 110px;
    font-weight: 600;
    float: left;
  }
  input {
    border: 0;
    color: #666666;
    display: block;
    height: 55px;
    line-height: 55px;
    float: left;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #c3c3c3;
    // color: #666666;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: #c3c3c3;
    // color: #666666;
    opacity: 1;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #c3c3c3;
    // color: #666666;
    opacity: 1;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #c3c3c3;
    // color: #666666;
  }
  .picker {
    width: 175px;
    float: left;
  }
  img {
    width: 6px;
    height: 10px;
    float: right;
    margin: 20px 4px 0 0;
  }
  span {
    // color: #c3c3c3;
    color: #666666;
  }
  .smInput {
    width: 150px;
  }
  i {
    color: #c3c3c3;
    font-style: normal;
    float: right;
    text-align: right;
    margin-right: 4px;
  }
  .radio_box {
    float: right;
    input[type="radio"] + label::before {
      content: "\a0"; /*不换行空格*/
      display: inline-block;
      vertical-align: middle;
      // font-size: 26.0025px;
      width: 15px;
      height: 15px;
      margin-right: 9.5px;
      border-radius: 50%;
      border: 15px solid #dfdfdf;
      text-indent: 0.15em;
      line-height: 1;
    }
    input[type="radio"]:checked + label::before {
      background-image: url("/static/images/service/danxuan.svg");
      background-size: 15px 15px;
      border: 1px solid #fff;
    }
    input[type="radio"] {
      position: absolute;
      clip: rect(0, 0, 0, 0);
    }
    label:first-of-type {
      margin-right: 34px;
    }
  }
  .selling {
    color: #666666;
    float: right;
    margin-right: 4px;
  }
  select {
    background: #fff;
    // color: #c3c3c3;
    color: #666666;
    border: 0;
    font-size: 15px;
    width: 136px;
  }
  .selectbt {
    color: #c3c3c3;
  }
  .jy-name {
    display: block;
    width: 75px;
    float: left;
    font-weight: 600;
  }
  .jyfw {
    max-width: 240px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
    float: left;
  }
  .add-name {
    display: block;
    width: 100px;
    float: left;
  }
  .address {
    max-width: 215px;
    margin-left: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
    color: #666666;
  }
  #sqlb {
    // color: #c3c3c3;
    color: #666666;
  }
}
#remarks {
  min-height: 114px;
  height: auto;
  label {
    display: inline;
    vertical-align: top;
    margin-right: 30px;
  }
  textarea {
    display: block;
    width: 350px;
    max-height: 150px;
    outline: 0;
    line-height: 20px;
    word-wrap: break-word;
    overflow-x: hidden;
    overflow-y: auto;
    // border: 1px solid #ebebeb;
    border: 0;
  }
}
.pic-group {
  height: 76px;
  // width: 686.0025px;
  padding: 0 16px;
  margin: 0 auto;
  line-height: 38px;
  .pic-name {
    display: inline-block;
    width: 94px;
    font-weight: 600;
    line-height: 76px;
  }
  .van-uploader {
    float: right;
  }
  .imageUp {
    float: right;
    width: 56px;
    height: 56px;
    margin-top: 10px;
    // border: 1px dashed #cdcfd2;
    border-radius: 2.5px;
    font-size: 30px;
    color: #cdcfd2;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 56px;
    height: 56px;
  }
}
.cooTitle {
  background: #f4f5f8;
  height: 55px;
  line-height: 55px;
  padding-left: 16px;
  color: #999999;
  font-size: 12px;
}
.cooProduct {
  line-height: 55px;
  padding-left: 16px;
  overflow: hidden;
  label {
    display: inline-block;
    width: 205px;
  }
  input[type="checkbox"] + label::before {
    content: "\a0"; /*不换行空格*/
    display: inline-block;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    margin-right: 12.5px;
    border: 1px solid #dfdfdf;
    border-radius: 1px;
    line-height: 1;
  }
  input[type="checkbox"]:checked + label::before {
    background-image: url("/static/images/service/icon-check.svg");
    background-size: 12px 12px;
    border: 0;
  }
  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  img {
    width: 13.5px;
    height: 14px;
    margin-right: 7px;
    margin-top: 18px;
  }
  span {
    // color: #c3c3c3;
    color: #666666;
    float: right;
    margin-right: 8px;
  }
}
.check-group {
  height: 45px;
  line-height: 45px;
  padding: 15px 16px;
  overflow: hidden;
  label {
    width: 280px;
    display: inline-block;
  }
  input[type="checkbox"] + label::after {
    content: "\a0"; /*不换行空格*/
    // display: inline-block;
    float: right;
    vertical-align: middle;
    width: 12px;
    height: 12px;
    border: 1px solid #dfdfdf;
    border-radius: 2px;
    line-height: 1;
    margin: 17px 16px 0 0;
  }
  input[type="checkbox"]:checked + label::after {
    background-image: url("/static/images/service/icon-check.svg");
    background-size: 12px 12px;
    border: 0;
  }
  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
}
.bussiness {
  max-height: 430px;
  overflow: scroll;
  .bussiness-group {
    overflow: hidden;
    line-height: 40px;
    padding: 10px 16px;
    label {
      width: 250px;
      display: inline-block;
    }
    checkbox {
      float: right;
    }
  }
}

.radio-group {
  height: 45px;
  line-height: 45px;
  padding: 0 16px;
  input[type="radio"] + label::after {
    content: "\a0"; /*不换行空格*/
    // display: inline-block;
    float: right;
    vertical-align: middle;
    width: 15px;
    height: 15px;
    border: 1px solid #dfdfdf;
    border-radius: 50%;
    line-height: 1;
    margin-top: 17px;
  }
  input[type="radio"]:checked + label::after {
    background-image: url("http://cws-wechat.lunz.cn/static/images/service/danxuan.svg");
    background-size: 15px 15px;
    border: 0;
  }
  input[type="radio"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
}
.explain {
  height: 35px;
  background: #f4f5f8;
  color: #999999;
  font-size: 12px;
  line-height: 35px;
  padding-left: 16px;
}
.border0:nth-last-child(1) {
  border: 0;
}
.botbackground {
  height: 65px;
  width: 100%;
  background: #f4f5f8;
}
.infoComplate {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 100;
  button {
    width: 167.5px;
    height: 41px;
    background: #4289ff;
    border-radius: 4px;
    color: #fff;
    border: 0;
    line-height: 41px;
  }
  .backbtn {
    background: #fff;
    color: #4289ff;
    border: 1px solid #4289ff;
    margin-left: 15px;
  }
  .btn {
    margin-right: 15px;
  }
}
.checkbox_box {
  display: block;
  height: 45px;
  margin: 0 16px;
}
.check_box {
  float: right;
}
</style>

<script>
import wx from 'wx';
import api from '@/utils/api';
import util from '@/utils/util';

export default {
  data () {
    return {
      checked: false, // 全选框
      nowIndex: 0,
      merchantType: [
        { value: null, name: '必填' },
        { value: 'DT0000000007', name: 'KXK' },
        { value: 'DT0000000008', name: 'KXA' },
        { value: 'DT0000000009', name: 'KXB' },
        { value: 'DT0000000010', name: 'KXC' },
        { value: 'DT0000000011', name: 'MGK' },
        { value: 'DT0000000012', name: 'MGA' },
        { value: 'DT0000000013', name: 'MGB' },
        { value: 'DT0000000014', name: 'WXK' },
        { value: 'DT0000000015', name: 'WXA' },
        { value: 'DT0000000016', name: 'WXB' }
      ],
      index: 0,
      taxIndex: 0,
      yearIndex: 0,
      checkboxArr: [
        { id: 'flagSQT', name: '商圈T', checked: false },
        { id: 'flagSQL', name: '商圈L', checked: false },
        { id: 'flagSQJ', name: '商圈+', checked: false },
        { id: 'flagOther', name: '其他', checked: false },
        { id: 'flagJMQ', name: '居民区', checked: false }
      ],
      taxType: ['请选择', '小规模纳税人', '一般纳税人', '个人独资', '个体户'],
      payWayArr: [
        { id: 'payBank', name: '刷卡', checked: false },
        { id: 'payAlipay', name: '支付宝', checked: false },
        { id: 'payWechat', name: '微信', checked: false },
        { id: 'payMoney', name: '现金', checked: false }
      ],
      yearList: ['请选择'],
      closeImg: '/static/images/service/icon-jia.svg',
      longImg: '/static/images/service/icon-jia.svg',
      // 经营范围
      show: false,
      // 支付方式
      show1: false,
      // 商圈类别
      show2: false,
      // 营业时间
      show4: false,
      // 歇业时间
      show5: false,
      // 产品开始时间
      show6: false,
      datepickerIndex: '',
      currentDate1: new Date().getTime(),
      maxDate: new Date().getTime(),
      sqlb: '必填',
      currentDate: '07:00',
      currentDate2: '18:00',
      payway: '请选择',
      checkArr: [],
      // 数据中心返回的经营范围
      res: [],
      name: [], // ？？？
      title: '',
      scopeIndex: 0,

      smallCar: '',
      bigCar: '',
      washGood: '',
      washCard: '',

      nothing: false, // 暂无

      productList: [],

      params: {
        spinfo: {
          sPName: '',
          sPType: '',
          sellerId: wx.getStorageSync('mem_userId'),
          sellerName: wx.getStorageSync('mem_username'),
          remark: null,
          enabled: ''
        },
        itemList: [],
        secondary: {
          connectName: '',
          address: '必填',
          lng: '',
          lat: '',
          connectMobile: null,
          taxType: null,
          openYear: '',
          storeNumber: '',
          brandName: null,
          businessBeginTime: '',
          businessEndTime: '',
          maxStation: '',
          area: ''
        },
        status: {
          carperDay: '',
          employNumber: '',
          flagSQT: false,
          flagSQL: false,
          flagSQJ: false,
          flagOther: false,
          flagJMQ: false,
          payBank: false,
          payAlipay: false,
          payWechat: false,
          payMoney: false
        },
        picList: []
      }
    };
  },
  created () {
    this.GetScopeTree();
    this.getYearList();
    this.getProductList();
  },
  methods: {
    // 商户性质
    radioChange (e) {
      this.params.spinfo.enabled = e.mp.detail.value;
    },
    // 商户类型
    bindPickerChange (e) {
      this.index = e.mp.detail.value;
      this.params.spinfo.sPType = this.merchantType[this.index].value;
    },
    // 点选类别
    changeType (a) {
      a.checked = !a.checked;
    },
    // 商圈弹窗关闭
    sqClose (event) {
      if (event.mp.detail === 'confirm') {
        this.sqlb = '必填';
        this.checkboxArr.forEach(x => {
          if (x.checked === true) {
            this.params.status[x.id] = true;
            if (this.sqlb === '必填') {
              this.sqlb = x.name;
            } else {
              this.sqlb += ' ' + x.name;
            }
          } else {
            this.params.status[x.id] = false;
          }
        });
        this.show2 = false;
      } else {
        this.show2 = false;
      }
    },
    // 上传图片
    async chooseImage (e) {
      var that = this;
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
        success: function (res) {
          let tempFilePaths = res.tempFilePaths;
          if (tempFilePaths.length > 0) {
            that.upImage(tempFilePaths[0], e);
          }
        }
      });
    },
    // 上传至oss
    async upImage (img, index) {
      wx.showLoading({
        title: '图片上传中...',
        mask: true
      });
      util.uploadFile(api.AddFileAliyun, img, 'POST').then(res => {
        wx.hideLoading();
        if (res.Success) {
          if (index === 0) {
            this.closeImg = res.Data.Url;
          } else {
            this.longImg = res.Data.Url;
          }
          res.Data.ScenceType = index;
          for (var i = 0; i < this.params.picList.length; i++) {
            if (this.params.picList[i].ScenceType === index) {
              this.params.picList.splice(i, 1);
            }
          }
          this.params.picList.push(res.Data);
        } else {
          wx.hideLoading();
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '上传失败',
            mask: true
          });
        }
      });
    },
    // 跳转地图页
    showMap () {
      var that = this;
      wx.chooseLocation({
        success: function (res) {
          that.params.secondary.address = res.address;
          that.params.secondary.lat = res.latitude;
          that.params.secondary.lng = res.longitude;
        }
      });
    },
    // 选择商圈类别
    choiceType () {
      this.checkboxArr.forEach(x => {
        x.checked = this.params.status[x.id];
      });
      console.log(this.checkboxArr);
      this.show2 = true;
    },
    // 选择营业时间
    startTime () {
      this.show4 = true;
    },
    choseT (value) {
      this.params.secondary.businessBeginTime = value.mp.detail;
      this.show4 = false;
    },
    cancelchooseT () {
      this.show4 = false;
    },
    // 选择歇业时间
    endTime () {
      this.show5 = true;
    },
    endT (value) {
      this.params.secondary.businessEndTime = value.mp.detail;
      this.show5 = false;
    },
    cancelendT () {
      this.show5 = false;
    },
    // 点选支付方式
    changePayWay (e) {
      e.checked = !e.checked;
    },
    // 支付方式
    payWay () {
      this.payWayArr.forEach(x => {
        x.checked = this.params.status[x.id];
      });
      this.show1 = true;
    },
    // 选择支付方式
    payClose (event) {
      if (event.mp.detail === 'confirm') {
        this.payway = '请选择';
        this.payWayArr.forEach(x => {
          if (x.checked === true) {
            this.params.status[x.id] = true;
            if (this.payway === '请选择') {
              this.payway = x.name;
            } else {
              this.payway += ' ' + x.name;
            }
          } else {
            this.params.status[x.id] = false;
          }
        });
        this.show1 = false;
      } else {
        this.show1 = false;
      }
    },
    // 是否支持快洗
    serviceKX (e) {
      this.params.spinfo.enabled = e.mp.detail.value;
    },
    // 是否有电路施工能力
    serviceDL (e) {
      this.params.spinfo.enabled = e.mp.detail.value;
    },
    // 是否支持预约
    serviceYY (e) {
      this.params.spinfo.enabled = e.mp.detail.value;
    },
    // 是否有LED屏
    serviceLED (e) {
      this.params.spinfo.enabled = e.mp.detail.value;
    },
    // 纳税人类别
    bindTaxType (e) {
      if (e.mp.detail.value !== 0) {
        this.taxIndex = e.mp.detail.value;
        this.params.secondary.taxType = this.taxType[e.mp.detail.value];
      }
    },
    // 开业年份
    bindYearChange (e) {
      if (e.mp.detail.value !== 0) {
        this.yearIndex = e.mp.detail.value;
        this.params.secondary.openYear = this.yearList[e.mp.detail.value];
      }
    },
    // 下一步
    changeTabs () {
      if (this.nowIndex === 0) {
        if (
          this.params.spinfo.enabled !== 'true' &&
          this.params.spinfo.enabled !== 'false'
        ) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '店铺性质为空',
            mask: true
          });
        } else if (!this.params.spinfo.sPName) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '商户名称为空',
            mask: true
          });
        } else if (!this.params.spinfo.sPType) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '商户类型为空',
            mask: true
          });
        } else if (!this.params.secondary.connectName) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '店长姓名为空',
            mask: true
          });
        } else if (this.params.secondary.address === '必填') {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '门店地址为空',
            mask: true
          });
        } else if (this.sqlb === '必填') {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '商圈类别为空',
            mask: true
          });
        } else {
          this.nowIndex++;
          wx.pageScrollTo({
            scrollTop: 0
          })
        }
      } else if (this.nowIndex === 1) {
        if (!this.params.secondary.maxStation) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '请输入工位数',
            mask: true
          });
        } else {
          this.nowIndex++;
          wx.pageScrollTo({
            scrollTop: 0
          })
        }
      } else if (this.nowIndex === 2) {
        this.nowIndex++;
        wx.pageScrollTo({
          scrollTop: 0
        })
      } else {
        this.submit();
      }
    },
    // 经营范围列表
    GetScopeTree () {
      api.getDCHandle('basic/BusinessScope/GetScopeTree', '').then(res => {
        if (res.Success) {
          this.res = res.Data;
        } else {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '数据查询失败',
            mask: true
          });
        }
      });
    },
    // 经营范围弹窗
    choiceProject (index) {
      this.scopeIndex = index;
      this.checkArr = this.res[index].Children;
      wx.setStorageSync('childred', this.checkArr)
      this.title = '选择' + this.res[index].Name + '项目';
      this.show = true;
    },
    // 经营范围全选
    checkedAll (e) {
      this.checked = !this.checked;
      if (this.checked) {
        // 实现反选
        this.checkArr.forEach(function (item, index) {
          item.checked = true;
        });
      } else {
        // 实现全选
        this.checkArr.forEach(function (item, index) {
          item.checked = false;
        });
      }
    },
    // 选择单个经营范围
    changeSelect (item) {
      item.checked = !item.checked;
    },
    // 选择经营范围后保存
    beforeClose (action, done) {
      if (action.mp.detail === 'confirm') {
        this.checked = false;
        let a = this.checkArr.filter(x => x.checked === true);
        if (a.length === 0) {
          this.res[this.scopeIndex].content = '';
        } else {
          this.res[this.scopeIndex].content = '';
          for (let i = 0; i < a.length; i++) {
            if (a[i].checked === true) {
              this.res[this.scopeIndex].content += a[i].Name + ' ';
            }
          }
        }
        this.show = false;
      } else {
        this.res[this.scopeIndex].Children = wx.getStorageSync('childred');
        this.show = false;
      }
    },
    // 获取年份列表
    getYearList () {
      var nowYear = new Date();
      var year = nowYear.getFullYear();
      for (let i = 0; i < 50; i++) {
        this.yearList.push(year - i);
      }
    },
    // 选择上一步
    backTabs () {
      if (this.nowIndex > 0) {
        this.nowIndex--;
      } else {
        wx.navigateBack({
          delta: 1
        });
        // Dialog.confirm({
        //   title: '警告',
        //   message: '确定要返回吗？已填写的信息将丢失'
        // }).then(() => {
        //   // on confirm
        //   wx.switchTab({
        //     url: 'list'
        //   })
        // }).catch(() => {
        //   // on cancel
        // });
      }
    },
    // 获取合作项目
    getProductList () {
      api.getHandle('Product/GetProductListWX', '').then(res => {
        if (res.Success) {
          res.Data.forEach(x => {
            x.checked = false;
          })
          this.productList = res.Data;
        } else {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '产品列表查询失败!',
            mask: true
          });
        }
      })
    },
    // 选择暂无
    changeNothing () {
      this.nothing = !this.nothing;
      if (this.nothing === true) {
        for (var i = 0; i < this.productList.length; i++) {
          this.productList[i].checked = false;
        }
      }
    },
    // 选择合作项目
    changeProduct (e) {
      if (e.checked) {
        e.checked = false;
      } else {
        e.checked = true;
      }
      this.nothing = false;
    },

    // 产品合作时间
    proStartTime (index) {
      this.datepickerIndex = index;
      this.show6 = true;
    },
    // 选择产品合作时间
    confirmkftTime (value) {
      console.log(value);
      this.productList[this.datepickerIndex].beginTime = util.formatToDate(new Date(value.mp.detail));
      this.show6 = false;
    },
    cancelkftTime () {
      this.show6 = false;
    },
    submit () {
      this.params.itemList = [];
      if (this.nothing === true) {
        this.params.itemList.push({
          itemType: 2,
          itemName: '暂无',
          itemId: 'DT0000000018'
        });
      } else {
        for (var i = 0; i < this.productList.length; i++) {
          if (this.productList[i].checked === true) {
            if (this.productList[i].beginTime == null) {
              wx.showToast({
                title: '请输入合作合作时间',
                icon: '/static/images/icon/icon_error.png',
                duration: 2000
              })
              return;
            } else {
              this.params.itemList.push({
                itemType: 2,
                itemId: this.productList[i].Id,
                itemBeginTime: this.productList[i].beginTime
              });
            }
          }
        }
      }
      wx.showLoading({
        title: '保存中……'
      });
      if (this.smallCar) {
        this.params.itemList.push({
          itemType: 1,
          itemId: 'DT0000000003',
          itemPrice: this.smallCar
        });
      }
      if (this.bigCar) {
        this.params.itemList.push({
          itemType: 1,
          itemId: 'DT0000000002',
          itemPrice: this.bigCar
        });
      }
      if (this.washGood) {
        this.params.itemList.push({
          itemType: 1,
          itemId: 'DT0000000004',
          itemPrice: this.washGood
        });
      }
      if (this.washCard) {
        this.params.itemList.push({
          itemType: 1,
          itemId: 'DT0000000005',
          itemPrice: this.washCard
        });
      }
      var newList = this.res;
      // eslint-disable-next-line no-redeclare
      for (var i = 0; i < newList.length; i++) {
        for (var j = 0; j < newList[i].Children.length; j++) {
          if (newList[i].Children[j].checked === true) {
            this.params.itemList.push({
              itemParentOrder: newList[i].SortOrder,
              itemOrder: newList[i].Children[j].SortOrder,
              itemType: 3,
              itemId: newList[i].Children[j].Id,
              itemName: newList[i].Children[j].Name,
              itemParentId: newList[i].Id,
              itemParentName: newList[i].Name
            });
          }
        }
      }
      api.postHandle('Provider/AddOrEditProvider', this.params).then(result => {
        if (result.Data) {
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            icon: 'success',
            duration: 2000
          });
          wx.switchTab({
            url: '/pages/service/list'
          })
          this.$router.push({ path: '/service/list' });
        } else {
          wx.hideLoading();
          wx.showToast({
            title: '失败',
            icon: 'none',
            duration: 2000
          });
        }
      });
    },
    slip () {
      wx.pageScrollTo({
        scrollTop: 300
      })
    }
  }
};
</script>
