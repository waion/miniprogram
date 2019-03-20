<template>
  <view class="info">
    <view class="tabs border1">
      <span @click="toggleTabs(0)">
        <a :class="{active: nowIndex==0}">基本信息</a>
      </span>
      <span @click="toggleTabs(1)">
        <a :class="{active: nowIndex==1}">门店信息</a>
      </span>
      <span @click="toggleTabs(2)">
        <a :class="{active: nowIndex==2}">经营范围</a>
      </span>
      <span @click="toggleTabs(3)">
        <a :class="{active: nowIndex==3}">详细信息</a>
      </span>
    </view>
    <view v-show="nowIndex==0">
      <view class="form-group border1">
        <label class="form-name">是否有效</label>
        <radio-group class="radio_box" @change="radioChange">
          <radio value="true" :checked="params.spinfo.Enabled==true?true:false"/>有效
          <radio color="#EA5A49" value="false" :checked="params.spinfo.Enabled==false?true:false"/>无效
        </radio-group>
      </view>
      <view class="form-group border1">
        <label class="form-name">门店名称</label>
        <input type="text" :value="params.spinfo.SPName" placeholder="必填">
      </view>
      <view class="form-group border1">
        <label class="form-name">商户类型</label>
        <picker mode="selector" @change="bindPickerChange" @cancel="bindPickerCancel" :value="index" :range="merchantType" range-key="name" class="type">
          <view class="picker">{{merchantType[index].name}}</view>
        </picker>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1">
        <label class="form-name">店长姓名</label>
        <input type="text" v-model="params.secondary.ConnectName" placeholder="必填">
      </view>
      <view class="form-group">
        <label class="form-name">联系电话</label>
        <input type="text" v-model="params.secondary.ConnectMobile">
      </view>
      <view class="border16"></view>
      <view class="form-group border1" @click="showMap()">
        <label class="form-name add-name">详细地址</label>
        <span class="address">{{params.secondary.Address}}</span>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="form-group" @click="choiceType()">
        <label class="form-name">商圈类别</label>
        <span id="sqlb">{{sqlb}}</span>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="border16"></view>
      <view class="form-group border1">
        <label class="form-name">门店连锁数量</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.secondary.StoreNumber"
        >
      </view>
      <view class="form-group border1">
        <label class="form-name">品牌</label>
        <input type="text" v-model="params.secondary.BrandName">
      </view>
      <view class="form-group border1">
        <label class="form-name">纳税人类别</label>
        <picker mode="selector" @change="bindTaxType" @cancel="bindTaxCancel" :value="taxIndex" :range="taxType" class="type">
          <view class="picker">{{taxType[taxIndex]}}</view>
        </picker>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="form-group">
        <label class="form-name">开业年份</label>
        <picker mode="selector" @change="bindYearChange" @cancel="bindTaxCancel" :value="yearIndex" :range="yearList" class="type">
            <view class="picker">
              {{yearList[yearIndex]}}
            </view>
        </picker>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="border16"></view>
      <view class="pic-group border1">
        <label class="pic-name">店面近景图片</label>
        <view class="imageUp" @click="chooseImage(1)">
          <img class="upload_in" :src="closeImg" alt>
        </view>
      </view>
      <view class="pic-group">
        <label class="pic-name">店面远景图片</label>
       <view class="imageUp" @click="chooseImage(2)">
          <img class="upload_in" :src="longImg" alt>
        </view>
      </view>
    </view>
    <view v-show="nowIndex==1">
      <view class="form-group border1" @click="startTime()">
        <label class="form-name">营业时间</label>
        <span
          id="startTime"
        >{{params.secondary.BusinessBeginTime==null? "" :params.secondary.BusinessBeginTime.slice(0,5)}}</span>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1" @click="endTime()">
        <label class="form-name">歇业时间</label>
        <span
          id="endTime"
        >{{params.secondary.BusinessEndTime== null? "" :params.secondary.BusinessEndTime.slice(0,5)}}</span>
        <img src="../../../static/images/service/icon-right.svg">
      </view>
      <view class="form-group border1">
        <label class="form-name">工位数</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.secondary.MaxStation"
          placeholder="必填"
        >
        <i>个</i>
      </view>
      <view class="form-group border1">
        <label class="form-name">员工数量</label>
        <input
          type="number"
          oninput="this.value = this.value.replace(/[^0-9]/g, '')"
          v-model="params.status.EmployNumber"
        >
        <i>个</i>
      </view>
      <view class="form-group">
        <label class="form-name">门店面积</label>
        <input
          class="smInput"
          type="number"
          oninput="this.value = this.value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3')"
          v-model="params.secondary.Area"
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
          v-model="params.status.CarPerDay"
        >
        <i>次</i>
      </view>
      <view class="border16"></view>
      <view class="form-group" @click="payWay()">
        <label class="form-name">支付方式</label>
        <span id="payway">{{payway}}</span>
        <img src="../../../static/images/service/icon-right.svg">
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
        <span class="selling">{{params.spinfo.SellerName}}</span>
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
        <input type="checkbox" name="none" id="none" v-model="nothing" @change="changeNothing()">
        <label for="none">暂无</label>
      </view>
      <view class="border16"></view>
      <view class="form-group" id="remarks">
        <label class="form-name">备注</label>
        <textarea v-model="params.spinfo.Remark" @change="slip()"></textarea>
      </view>
    </view>
    <view class="botbackground"></view>
    <view class="bottombtn">
      <button @click="back()" class="back">返回</button>
      <button @click="submit()" id="btn">保存</button>
    </view>
    <!-- 选择支付方式弹窗 -->
    <van-dialog use-slot async-close title="选择支付方式（可多选）" :show="show1" show-cancel-button @close="payClose" closeOnClickOverlay>
      <view class="checkbox_box" v-for="(item,index) in payWayArr" :key="index" @click="changePayWay(item)">
        <label :for="item.id" class="check_title">{{item.name}}</label>
        <input type="checkbox" class="check_box" :id="item.id" :checked="item.checked">
      </view>
    </van-dialog>
    <!-- 商圈类别弹窗 -->
    <van-dialog use-slot async-close title="选择商圈类别" :show="show2" show-cancel-button closeOnClickOverlay @close="sqClose">
      <view class="checkbox_box" v-for="(item,index) in checkboxArr" :key="index" @click="changeType(item)">
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
    <!-- 合作项目合作时间弹窗 -->
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
    height: 53px;
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
  // width: 343px;
  padding: 0 16px;
  margin: 0 auto;
  line-height: 55px;
  overflow: hidden;
  .form-name {
    display: block;
    width: 105px;
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
      font-size: 13px;
      width: 15px;
      height: 15px;
      margin-right: 9.5px;
      border-radius: 50%;
      border: 1px solid #dfdfdf;
      text-indent: 0.15em;
      line-height: 1;
    }
    input[type="radio"]:checked + label::before {
      background-image: url("../../../static/images/service/danxuan.svg");
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
    // border: 0.0133rem solid #ebebeb;
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
    // border: 0.0133rem dashed #cdcfd2;
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
  // color: #999999;
  font-weight: 600;
  background: #f4f5f8;
  height: 55px;
  line-height: 55px;
  padding-left: 16px;
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
    background-image: url("../../../static/images/service/icon-check.svg");
    background-size: 12px 12px;
    border: 0;
  }
  input[type="checkbox"] {
    position: absolute;
    clip: rect(0, 0, 0, 0);
  }
  img {
    width: 13.5px;
    height: 13.5px;
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
    border-radius: 1px;
    line-height: 1;
    margin: 17px 16px 0 0;
  }
  input[type="checkbox"]:checked + label::after {
    background-image: url("../../../static/images/service/icon-check.svg");
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
    background-image: url("../../../static/images/service/danxuan.svg")
      no-repeat;
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
.bottombtn {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  button {
    width: 160px;
    // height: 66px;
    height: 41px;
    background: #4289ff;
    border-radius: 3px;
    color: #fff;
    border: 0;
    line-height: 41px;
  }
  .back {
    background: #fff;
    border: 1px solid #4289ff;
    color: #4289ff;
    margin-left: 15px;
  }
  #btn {
    margin-right: 15px;
  }
}
</style>

<script>
import wx from 'wx';
// eslint-disable-next-line no-unused-vars
import api from '@/utils/api';
// eslint-disable-next-line no-unused-vars
import util from '@/utils/util';
import getCurrentPages from 'wxFunction';

export default {
  data () {
    return {
      checked: false, // 全选框
      // nowIndex: 'this.myStorage.Get(nowIndex)',
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
        { id: 'PayMoney', name: '现金', checked: false }
      ],
      yearList: ['请选择'],
      show: false,
      // 支付方式
      show1: false,
      // 商圈类别
      show2: false,
      // 开业时间
      show4: false,
      // 歇业时间
      show5: false,
      // 合作项目合作时间
      show6: false,
      currentDate1: new Date(),
      maxDate: new Date(),

      sqlb: '必填',
      currentDateBegin: '7:00',
      currentDateEnd: '18:00',
      payway: '',
      checkArr: [],
      res: [],
      name: [],
      title: '',
      scopeIndex: 0,
      xxdz: '点击跳转到地图页',
      productList: [],
      providerId: '',

      smallCar: '',
      bigCar: '',
      washGood: '',
      washCard: '',

      nothing: false, // 暂无

      // 加载图片
      closeImg: '/static/images/service/icon-jia.svg',
      longImg: '/static/images/service/icon-jia.svg',

      params: {
        spinfo: {},
        itemList: [],
        secondary: {},
        status: {},
        picList: []
      },
      flagSQT: false,
      flagSQL: false,
      flagSQJ: false,
      flagJMQ: false,
      flagOther: false,
      payBank: false,
      payAlipay: false,
      payWechat: false,
      PayMoney: false
    };
  },
  components: {
    // Dialog
  },

  created () {
    // this.getYearList();
    // this.getProductList();
  },
  mounted () {
    this.nowIndex = wx.getStorageSync('nowIndex');
    var page = getCurrentPages();
    this.providerId = page[page.length - 1].options.id;
    this.GetScopeTree();
    this.getYearList();
    this.getProductList();
    this.jtReturn();
    this.pushHistore();
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
    jtReturn () {
      // window.addEventListener('popstate', function (e) {
      // Dialog.confirm({
      //   title: '',
      //   message: '确定要返回吗？已填写的信息将丢失。'
      // })
      //   .then(() => {
      //     // location.href =
      //     //   '/service/detail?Id=' + location.href.split('Id=')[1];
      //   })
      //   .catch(() => {
      //     var state = {
      //       title: '新增',
      //       url: ''
      //     };
      //     window.history.pushState(state, state.title, state.url);
      //   });
      // });
    },
    pushHistore () {
      // var state = {
      //   title: '编辑',
      //   url: ''
      // };
      // window.history.pushState(state, state.title, state.url);
    },
    onReadClose (file) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '上传中'
      });
      var localData = file.content.split('base64,')[1];
      var data = {
        image: localData, // 图片base64编码字符串
        imageType: 0 // 图片名称  比如用户ID
      };
      this.$api.handlePost('ResourceItem/AddFileAliyun', data, result => {
        this.closeImg = result.Data.Url;
        for (var i = 0; i < this.params.picList.length; i++) {
          // eslint-disable-next-line eqeqeq
          if (this.params.picList[i].ScenceType == 0) {
            this.params.picList.splice(i, 1);
            i -= 1;
          }
        }
        result.Data.ScenceType = 0;
        this.params.picList.push(result.Data);
        this.$toast.clear();
      });
    },
    onReadLong (file) {
      this.$toast.loading({
        duration: 0, // 持续展示 toast
        forbidClick: true, // 禁用背景点击
        loadingType: 'spinner',
        message: '上传中'
      });
      var localData = file.content.split('base64,')[1];
      var data = {
        image: localData, // 图片base64编码字符串
        imageType: 0 // 图片名称  比如用户ID
      };
      this.$api.handlePost('ResourceItem/AddFileAliyun', data, result => {
        this.longImg = result.Data.Url;
        for (var i = 0; i < this.params.picList.length; i++) {
          // eslint-disable-next-line eqeqeq
          if (this.params.picList[i].ScenceType == 1) {
            this.params.picList.splice(i, 1);
            i -= 1;
          }
        }
        result.Data.ScenceType = 1;
        this.params.picList.push(result.Data);
        this.$toast.clear();
      });
    },
    getYearList () {
      var nowYear = new Date();
      var year = nowYear.getFullYear();
      for (let i = 0; i < 50; i++) {
        this.yearList.push(year - i);
      }
    },
    GetScopeTree () {
      let data = {
        providerId: this.providerId
      };
      api.getHandle('Provider/GetProviderDetail', data).then(res => {
        if (res.Success) {
          this.params = res.Data;
          this.sqlb = (this.params.status.FlagSQT === true ? '商圈T' : '') + (this.params.status.FlagSQL === true ? ' 商圈L ' : '') + (this.params.status.FlagSQJ === true ? ' 商圈+ ' : '') + (this.params.status.FlagOther === true ? ' 其他 ' : '') + (this.params.status.FlagJMQ === true ? ' 居民区 ' : '');
          this.payway = (this.params.status.PayAlipay === true ? ' 支付宝' : '') + (this.params.status.PayBank === true ? ' 银行卡' : '') + (this.params.status.PayMoney === true ? ' 现金' : '') + (this.params.status.PayWechat === true ? ' 微信' : '');
          this.partner = this.params.itemList.filter(x => x.ItemType === 2); // 合作项目
          this.scopeList = this.params.itemList.filter(x => x.ItemType === 3); // 经营范围
          for (var i = 0; i < this.partner.length; i++) {
            this.partner[i].ItemBeginTime = util.formatDate(this.partner[i].ItemBeginTime);
          }
          // 洗车价格
          this.params.itemList.filter(x => x.ItemType === 1).forEach(item => {
            if (item.ItemId === 'DT0000000002') {
              this.bigCar = item.ItemPrice;
            } else if (item.ItemId === 'DT0000000003') {
              this.smallCar = item.ItemPrice;
            } else if (item.ItemId === 'DT0000000004') {
              this.goodWash = item.ItemPrice;
            } else if (item.ItemId === 'DT0000000005') {
              this.cardWash = item.ItemPrice;
            }
          });
          this.support = [];
          // 门店特色
          this.params.status.ServiceKX === true ? this.support.push({name: '支持快洗', value: '是'}) : this.params.status.ServiceKX === false ? this.support.push({name: '支持快洗', value: '否'}) : this.support.push({name: '支持快洗', value: ''});
          this.params.status.ServiceDL === true ? this.support.push({name: '电路施工能力', value: '有'}) : this.params.status.ServiceDL === false ? this.support.push({name: '电路施工能力', value: '无'}) : this.support.push({name: '电路施工能力', value: ''});
          this.params.status.ServiceLED === true ? this.support.push({name: 'LED屏', value: '有'}) : this.params.status.ServiceLED === false ? this.support.push({name: 'LED屏', value: '无'}) : this.support.push({name: 'LED屏', value: ''});
          this.params.status.ServiceYY === true ? this.support.push({name: '支持预约', value: '是'}) : this.params.status.ServiceYY === false ? this.support.push({name: '支持预约', value: '否'}) : this.support.push({name: '支持预约', value: ''});
          // 图片显示
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.params.picList.length; i++) {
            if (this.params.picList[i].ScenceType === 0) {
              this.closeImg = 'https:' + this.params.picList[i].Url;
            } else if (this.params.picList[i].ScenceType === 1) {
              this.longImg = 'https:' + this.params.picList[i].Url;
            }
          }
          this.bussinessScope = [];
          // 经营范围
          for (let i = 0; i < this.scopeList.length; i++) {
            if (i === 0) {
              this.bussinessScope.push(this.scopeList[0].ItemParentName);
            } else {
              if (this.bussinessScope.indexOf(this.scopeList[i].ItemParentName) === -1) {
                this.bussinessScope.push(this.scopeList[i].ItemParentName);
              }
            }
          }
        } else {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '数据查询失败！',
            mask: true
          });
        }
      });
    },
    getProductList () {
      api.getHandle('Product/GetProductListWX', '', result => {
        if (result.Success) {
          this.productList = result.Data;
          this.GetScopeTree();
        } else {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '产品列表查询失败',
            mask: true
          });
        }
      });
    },
    // 切换tabs
    toggleTabs (index) {
      this.nowIndex = index;
    },
    // 加载修改信息
    getEditInfo () {
      let data = {
        providerId: this.providerId
      };
      api.getHandle('Provider/GetProviderDetail?', data, result => {
        if (result.Data) {
          this.params = result.Data;
          // if (
          //   // location.href.indexOf('name') > -1 &&
          //   // this.myStorage.Get('provider') != null
          // ) {
          //   // this.params = this.myStorage.Get('provider');
          //   this.params.secondary.Address = decodeURI(
          //     // location.href.split('addr=')[1].split('&')[0]
          //   );
          //   // var latng = location.href.split('latng=')[1].split('&')[0];
          //   // this.params.secondary.Lat = latng.split(',')[0];
          //   // this.params.secondary.Lng = latng.split(',')[1];
          //   this.myStorage.Remove('provider');
          // }
          // eslint-disable-next-line eqeqeq
          this.washCar = this.params.itemList.filter(x => x.ItemType == 1); // 洗车价格
          // eslint-disable-next-line eqeqeq
          this.partner = this.params.itemList.filter(x => x.ItemType == 2); // 合作项目
          this.bussinessScope = this.params.itemList.filter(
            // eslint-disable-next-line eqeqeq
            x => x.ItemType == 3
          );
          // 加载商圈类别
          this.sqlb =
            // eslint-disable-next-line eqeqeq
            (this.params.status.FlagSQT == true ? ' 商圈T' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.FlagSQL == true ? ' 商圈L' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.FlagSQJ == true ? ' 商圈+' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.FlagOther == true ? ' 其他' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.FlagJMQ == true ? ' 居民区' : '');
          if (
            !this.params.status.FlagSQT &&
            !this.params.status.FlagSQL &&
            !this.params.status.FlagSQJ &&
            !this.params.status.FlagOther &&
            !this.params.status.FlagJMQ
          ) {
            this.sqlb = '必填';
          } else {
            document.getElementById('sqlb').style.color = '#666';
          }
          // 加载支付方式
          this.payway =
            // eslint-disable-next-line eqeqeq
            (this.params.status.PayBank == true ? '刷卡' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.PayAlipay == true ? ' 支付宝' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.PayWechat == true ? ' 微信' : '') +
            // eslint-disable-next-line eqeqeq
            (this.params.status.PayMoney == true ? ' 现金' : '');
          if (
            !this.params.status.PayBank &&
            !this.params.status.PayAlipay &&
            !this.params.status.PayWechat &&
            !this.params.status.PayMoney
          ) {
            this.payway = '';
          }

          for (var i = 0; i < this.params.picList.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.params.picList[i].ScenceType == 0) {
              this.closeImg = 'https:' + this.params.picList[i].Url;
            // eslint-disable-next-line eqeqeq
            } else if (this.params.picList[i].ScenceType == 1) {
              this.longImg = 'https:' + this.params.picList[i].Url;
            }
          }
          // 经营范围
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.res.Data.length; i++) {
            var sList = this.bussinessScope.filter(
              // eslint-disable-next-line eqeqeq
              x => x.ItemParentId == this.res.Data[i].Id
            );
            var idList = sList.map(x => {
              return x.ItemId;
            });
            // eslint-disable-next-line eqeqeq
            if (sList.length != 0) {
              this.res.Data[i].content = '';
              for (var j = 0; j < sList.length; j++) {
                this.res.Data[i].content += sList[j].ItemName + ' ';
              }
              for (var k = 0; k < this.res.Data[i].Children.length; k++) {
                if (idList.indexOf(this.res.Data[i].Children[k].Id) > -1) {
                  this.res.Data[i].Children[k].checked = true;
                }
              }
            }
          }
          // 合作项目
          if (this.partner.filter(x => x.ItemName == null).length > 0) {
            this.nothing = true;
          } else {
            // eslint-disable-next-line no-redeclare
            for (var i = 0; i < this.partner.length; i++) {
              // eslint-disable-next-line no-redeclare
              for (var j = 0; j < this.productList.length; j++) {
                // eslint-disable-next-line eqeqeq
                if (this.partner[i].ItemId == this.productList[j].Id) {
                  this.productList[j].checked = true;
                  this.productList[j].beginTime = this.partner[i].ItemBeginTime;
                }
              }
            }
            console.log(this.productList);
          }

          // 洗车价格
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.washCar.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.washCar[i].ItemId == 'DT0000000003') {
              this.smallCar = this.washCar[i].ItemPrice;
            // eslint-disable-next-line eqeqeq
            } else if (this.washCar[i].ItemId == 'DT0000000002') {
              this.bigCar = this.washCar[i].ItemPrice;
            // eslint-disable-next-line eqeqeq
            } else if (this.washCar[i].ItemId == 'DT0000000004') {
              this.washGood = this.washCar[i].ItemPrice;
            // eslint-disable-next-line eqeqeq
            } else if (this.washCar[i].ItemId == 'DT0000000005') {
              this.washCard = this.washCar[i].ItemPrice;
            }
          }
          // 编辑时间弹窗显示当前
          this.currentDateBegin =
            this.params.secondary.BusinessBeginTime == null
              ? '7:00'
              : this.params.secondary.BusinessBeginTime.slice(0, 5);
          this.currentDateEnd =
            this.params.secondary.BusinessEndTime == null
              ? '18:00'
              : this.params.secondary.BusinessEndTime.slice(0, 5);
        }
      });
    },
    payClose (action, done) {
      // eslint-disable-next-line eqeqeq
      if (action == 'confirm') {
        this.params.status.PayBank = this.payBank;
        this.params.status.PayWechat = this.payWechat;
        this.params.status.PayAlipay = this.payAlipay;
        this.params.status.PayMoney = this.PayMoney;
        this.payway =
          // eslint-disable-next-line eqeqeq
          (this.params.status.PayBank == true ? '刷卡' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.PayAlipay == true ? ' 支付宝' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.PayWechat == true ? ' 微信' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.PayMoney == true ? ' 现金' : '');
        if (
          !this.params.status.PayBank &&
          !this.params.status.PayAlipay &&
          !this.params.status.PayWechat &&
          !this.params.status.PayMoney
        ) {
          this.payway = '';
        }
        document.getElementById('payway').style.color = '#666';
        done();
      } else {
        done();
      }
    },
    sqClose (action, done) {
      if (action === 'confirm') {
        this.params.status.FlagSQT = this.flagSQT;
        this.params.status.FlagJMQ = this.flagJMQ;
        this.params.status.FlagSQJ = this.flagSQJ;
        this.params.status.FlagSQL = this.flagSQL;
        this.params.status.FlagOther = this.flagOther;
        this.sqlb =
          // eslint-disable-next-line eqeqeq
          (this.params.status.FlagSQT == true ? ' 商圈T' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.FlagSQL == true ? ' 商圈L' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.FlagSQJ == true ? ' 商圈+' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.FlagOther == true ? ' 其他' : '') +
          // eslint-disable-next-line eqeqeq
          (this.params.status.FlagJMQ == true ? ' 居民区' : '');
        if (
          !this.params.status.FlagSQT &&
          !this.params.status.FlagSQL &&
          !this.params.status.FlagSQJ &&
          !this.params.status.FlagOther &&
          !this.params.status.FlagJMQ
        ) {
          this.sqlb = '必填';
          document.getElementById('sqlb').style.color = '#c3c3c3';
        } else {
          document.getElementById('sqlb').style.color = '#666';
        }
        done();
      } else {
        done();
      }
    },
    // 选择商圈类别
    choiceType () {
      this.checkboxArr.forEach(x => {
        x.checked = this.params.status[x.id];
      });
      console.log(this.checkboxArr);
      this.show2 = true;
    },
    // 跳转地图页
    showMap () {
      var that = this;
      wx.chooseLocation({
        success: function (res) {
          that.params.secondary.Address = res.address;
          that.params.secondary.lat = res.latitude;
          that.params.secondary.lng = res.longitude;
        }
      });
    },

    // 切换暂无
    changeNothing () {
      // eslint-disable-next-line eqeqeq
      if (this.nothing == true) {
        for (var i = 0; i < this.productList.length; i++) {
          this.productList[i].checked = false;
          document.getElementById(i).style.display = 'none';
        }
      }
      console.log(this.productList);
    },
    // 选择产品
    changeProduct (item, index) {
      // eslint-disable-next-line eqeqeq
      if (item.checked == true) {
        document.getElementById(index).style.display = 'block';
      } else {
        document.getElementById(index).style.display = 'none';
      }

      console.log(this.productList);
      // eslint-disable-next-line eqeqeq
      if (this.productList.filter(x => x.checked == true).length > 0) {
        this.nothing = false;
      }
    },
    // 选择开业时间
    startTime () {
      this.show4 = true;
    },
    choseT (value) {
      this.params.secondary.BusinessBeginTime = value;
      document.getElementById('startTime').style.color = '#666';
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
      this.params.secondary.BusinessEndTime = value;
      document.getElementById('endTime').style.color = '#666';
      this.show5 = false;
    },
    cancelendT () {
      this.show5 = false;
    },
    // 支付方式
    payWay () {
      this.payBank = this.params.status.PayBank;
      this.payWechat = this.params.status.PayWechat;
      this.payAlipay = this.params.status.PayAlipay;
      this.PayMoney = this.params.status.PayMoney;
      this.show1 = true;
    },
    // 经营范围弹窗
    choiceProject (index) {
      this.scopeIndex = index;
      this.checkArr = this.res.Data[index].Children;
      this.myStorage.Set('children', this.checkArr);
      this.title = '选择' + this.res.Data[index].Name + '项目';
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
    // 格式化日期
    formatDate (date) {
      if (date) {
        return date.split('T')[0];
      }
    },
    // 产品合作时间
    proStartTime (index) {
      this.datepickerIndex = index;
      this.show6 = true;
    },
    confirmkftTime (value) {
      // eslint-disable-next-line standard/computed-property-even-spacing
      this.productList[
        this.datepickerIndex
      ].beginTime = value.toLocaleDateString();
      this.show6 = false;
    },
    cancelkftTime () {
      this.show6 = false;
    },
    submit () {
      if (
        // eslint-disable-next-line eqeqeq
        this.params.spinfo.Enabled != '0' && this.params.spinfo.Enabled != '1'
      ) {
        // Toast.fail('请选择基本信息-门店是否有效');
      } else if (!this.params.spinfo.SPName) {
        // Toast.fail('请输入基本信息-门店名称');
      } else if (!this.params.secondary.ConnectName) {
        // Toast.fail('请输入基本信息-店长姓名');
        // eslint-disable-next-line eqeqeq
      } else if (this.params.secondary.Address == '必填') {
        // Toast.fail('请输入基本信息-详细地址');
        // eslint-disable-next-line eqeqeq
      } else if (this.sqlb == '必填') {
        // Toast.fail('请选择基本信息-商圈类别');
      } else if (!this.params.spinfo.SPType) {
        // Toast.fail('请选择基本信息-商户类型');
      } else if (!this.params.secondary.MaxStation) {
        // Toast.fail('请输入门店信息-工位数');
      } else {
        this.params.itemList = [];
        // eslint-disable-next-line eqeqeq
        if (this.nothing == true) {
          this.params.itemList.push({
            ItemType: 2,
            ItemName: '暂无'
          });
        } else {
          for (var i = 0; i < this.productList.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (this.productList[i].checked == true) {
              if (this.productList[i].beginTime == null) {
                // Toast.fail('请输入合作合作时间');
                return;
              } else {
                this.params.itemList.push({
                  ItemType: 2,
                  ItemId: this.productList[i].Id,
                  ItemBeginTime: this.productList[i].beginTime
                });
              }
            }
          }
        }

        if (this.smallCar) {
          this.params.itemList.push({
            ItemType: 1,
            ItemId: 'DT0000000003',
            ItemPrice: this.smallCar
          });
        }
        if (this.bigCar) {
          this.params.itemList.push({
            ItemType: 1,
            ItemId: 'DT0000000002',
            ItemPrice: this.bigCar
          });
        }
        if (this.washGood) {
          this.params.itemList.push({
            ItemType: 1,
            ItemId: 'DT0000000004',
            ItemPrice: this.washGood
          });
        }
        if (this.washCard) {
          this.params.itemList.push({
            ItemType: 1,
            ItemId: 'DT0000000005',
            ItemPrice: this.washCard
          });
        }
        // eslint-disable-next-line no-redeclare
        for (var i = 0; i < this.res.Data.length; i++) {
          for (var j = 0; j < this.res.Data[i].Children.length; j++) {
            // eslint-disable-next-line eqeqeq
            if (this.res.Data[i].Children[j].checked == true) {
              this.params.itemList.push({
                itemType: 3,
                itemId: this.res.Data[i].Children[j].Id,
                itemName: this.res.Data[i].Children[j].Name,
                itemParentId: this.res.Data[i].Id,
                itemParentName: this.res.Data[i].Name
              });
            }
          }
        }
        console.log(this.params);
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
      }
    },
    back () {
      // this.$router.back(-1);
      this.$router.push(`detail?Id=${this.providerId}`);
    },
    slip () {
      window.scroll(0, 300);
    }
  }
};
</script>
