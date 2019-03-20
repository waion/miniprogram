<template>
  <view class="detail">
    <view class="seller">
      <view class="seller-title">{{provider.spinfo.SPName}}</view>
      <view class="seller-name">责任销售：{{provider.spinfo.SellerName}}</view>
      <view class="border1"></view>
      <view class="seller-address">
        <view class="sellerl"  @click="showmap">
          <img src="/static/images/icon/dizhi2.svg" class="addImg">
          <span >{{provider.secondary.Address}}</span>
        </view>
        <view class="sellerr" @click="callStore">
          <view class="line"></view>
          <img src="/static/images/icon/dianhua.svg" class="phoImg" >
        </view>
      </view>
    </view>
    <view class="border16"></view>
    <view class="mainTab border1">
      <span @click="toData(0)">
        <a :class="{active: tabNum==0}">资料</a>
      </span>
      <span @click="toData(1)">
        <a :class="{active: tabNum==1}">订单记录</a>
      </span>
    </view>
    <view v-if="tabNum==0">
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
        <view class="detail-group">
          <label class="detail-name">性质</label>
          <span class="detail-content">{{provider.spinfo.Enabled==true?'有效':'无效'}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group border1">
          <label class="detail-name s-name">门店名称</label>
          <span class="detail-content s-content">{{provider.spinfo.SPName}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">商户类型</label>
          <span class="detail-content">{{provider.spinfo.SPType=='DT0000000007'?'KXK':provider.spinfo.SPType=='DT0000000008'?'KXA':provider.spinfo.SPType=='DT0000000009'?'KXB':provider.spinfo.SPType=='DT0000000010'?'KXC':provider.spinfo.SPType=='DT0000000011'?'MGK':provider.spinfo.SPType=='DT0000000012'?'MGA':provider.spinfo.SPType=='DT0000000013'?'MGB':provider.spinfo.SPType=='DT0000000014'?'WXK':provider.spinfo.SPType=='DT0000000015'?'WXA':provider.spinfo.SPType=='DT0000000016'?'WXB':''}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">店长姓名</label>
          <span class="detail-content">{{provider.secondary.ConnectName}}</span>
        </view>
        <view class="detail-group">
          <label class="detail-name">联系电话</label>
          <span class="detail-content">{{provider.secondary.ConnectMobile==null?'':provider.secondary.ConnectMobile}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group border1">
          <label class="detail-name s-name">商圈类别</label>
          <span class="detail-content s-content">{{sqlb}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group border1">
          <label class="detail-name">门店连锁数量</label>
          <span class="detail-content">{{provider.secondary.StoreNumber==null?'':provider.secondary.StoreNumber}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">品牌</label>
          <span class="detail-content">{{provider.secondary.BrandName==null?'':provider.secondary.BrandName}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">纳税人类别</label>
          <span class="detail-content">{{provider.secondary.TaxType==null?'':provider.secondary.TaxType}}</span>
        </view>
        <view class="detail-group">
          <label class="detail-name">开业年份</label>
          <span class="detail-content">{{provider.secondary.OpenYear==null?'':provider.secondary.OpenYear}}</span>
        </view>
        <view class="border16"></view>
        <view class="pic-group border1">
          <label class="pic-name">店面近景图片</label>
          <view class="imageUp">
            <img v-if="closeImg" :src="closeImg" id="closeImg" @click="previewClose">
          </view>
        </view>
        <view class="pic-group">
          <label class="pic-name">店面远景图片</label>
          <view class="imageUp">
            <img v-if="longImg" :src="longImg" id="longImg" @click="previewLong">
          </view>
        </view>
      </view>
      <view v-show="nowIndex==1">
        <view class="detail-group border1">
          <label class="detail-name">营业时间</label>
          <span class="detail-content">{{provider.secondary.BusinessBeginTime==null?'':provider.secondary.BusinessBeginTime}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">歇业时间</label>
          <span class="detail-content">{{provider.secondary.BusinessEndTime==null?'':provider.secondary.BusinessEndTime}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">工位数（个）</label>
          <span class="detail-content">{{provider.secondary.MaxStation}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">员工数量（人）</label>
          <span class="detail-content">{{provider.status.EmployNumber==null?'':provider.status.EmployNumber}}</span>
        </view>
        <view class="detail-group">
          <label class="detail-name">门店面积（平方）</label>
          <span class="detail-content">{{provider.secondary.Area==null?'':provider.secondary.Area}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group border1">
          <label class="detail-name">标准洗车价（元）</label>
          <span class="detail-content">{{smallCar}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">大车加价（元）</label>
          <span class="detail-content">{{bigCar}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">精洗零售价（元）</label>
          <span class="detail-content">{{goodWash}}</span>
        </view>
        <view class="detail-group border1">
          <label class="detail-name">会员普洗均价（元）</label>
          <span class="detail-content">{{cardWash}}</span>
        </view>
        <view class="detail-group">
          <label class="detail-name">日均进店车次</label>
          <span class="detail-content">{{provider.status.CarPerDay==null?'':provider.status.CarPerDay}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group">
          <label class="detail-name">支付方式</label>
          <span class="detail-content">{{payway}}</span>
        </view>
        <view class="border16"></view>
        <view class="detail-group border1" v-for="(item,index) in support" :key="index" >
          <label class="detail-name">{{item.name}}</label>
          <span class="detail-content">{{item.value}}</span>
        </view>
      </view>
      <view v-show="nowIndex==2">
        <view class="busscope" v-for="(item,index) in bussinessScope" :key="index" >
          <view class="jy-name">{{item}}</view>
          <view class="jy-content">
            <label v-for="(model,ind) in scopeList" :key="ind" >
              <span v-if="model.ItemParentName==item">{{model.ItemName}}&nbsp;</span>
            </label>
          </view>
          <view class="border16"></view>
        </view>
      </view>
      <view v-show="nowIndex==3">
        <view class="detail-group">
          <label class="detail-name">责任销售</label>
          <span class="detail-content">{{provider.spinfo.SellerName}}</span>
        </view>
        <view class="busscope">
          <view class="scope-name">合作产品</view>
          <view class="overf" v-for="(item,index) in partner" :key="index">
            <view class="scop-content">{{item.ItemId=='DT0000000018'?'暂无':item.ItemName}}</view>
            <view class="scop-time">{{item.ItemBeginTime}}</view>
          </view>
        </view>
        <view class="border16"></view>
        <view class="remark">
          <p>备注</p>
          <view class="remark-content">{{provider.spinfo.Remark==null?'':provider.spinfo.Remark}}</view>
        </view>
      </view>
    </view>
    <view v-else>
      <view class="total border1">
        <span>总成交额：</span> ￥12345678.00
      </view>
      <view class="order border1" @click="toOrderDetail">
        <view class="order-left">
          <view class="order-lt">
            <span class="order-name">王思思</span>
            <span class="'order-price'">￥3000.00</span>
          </view>
          <view class="order-time">
            成交时间：2019-02-25
          </view>
        </view>
        <view class="rigImg">
          <img src="/static/images/service/icon-right.svg">
        </view>
      </view>
    </view>
    <view class="botbackground" v-if="sellerId==provider.spinfo.SellerId"></view>
    <view class="edit" v-if="sellerId==provider.spinfo.SellerId">
      <view class="more" @click="showMore()">
        <span>更多操作</span>
        <img src="/static/images/service/icon-datexia.svg">
        <view class="pop" v-if="more">
          <view class="changeres" @click="changePerson">变更责任人</view>
          <view class="delete" @click="deleteInfo">删除</view>
        </view>
        <view class="jiao" v-if="more"></view>
      </view>
      <button class="editbtn" @click="editInfo">编辑</button>
    </view>
    <van-dialog id="cha" :show="showPerson" use-slot async-close show-cancel-button @close="onClose" @confirm="ddd" closeOnClickOverlay title="变更责任人">
      <view class="radio_box">
        <view v-for="(item, index) in personArr" :key="index" class="radio_group">
          <label :for="index" class="type_1" :class="{'type_1_active':actId == item.Id}" @click="checkedHandle(item)">{{item.Name}}
          </label>
        </view>
      </view>
    </van-dialog>
  </view>
</template>

<style lang="less" scoped>
.detail {
  width: 100%;
  background: #fff;
  font-size: 15px;
  color: #484848;
}
.seller {
  padding: 0 16px;
  .seller-title {
    font-size: 16px;
    font-weight: 800;
    margin-top: 15px;
  }
  .seller-name {
    color: #888888;
    font-size: 12px;
    line-height: 27px;
  }
  .seller-address {
    color: #333333;
    font-size: 16px;
    line-height: 50px;
    height: 50px;
    overflow: hidden;
    .sellerl {
      float: left;
    }
    .addImg {
      width: 10.5px;
      height: 13px;
      margin-right: 5px;
      margin-top: 20px;
      float: left;
    }
    span {
      display: block;
      float: left;
      width: 270px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .sellerr {
      float: right;
      margin: 19px 6px;
    }
    .line {
      width: 1px;
      height: 15px;
      background: #ebebeb;
      margin-right: 22px;
      float: left;
    }
    .phoImg {
      width: 14px;
      height: 14px;
      float: right;
    }
  }
}
.mainTab {
  height: 50px;
  font-size: 16px;
  font-weight: 800;
  span {
    line-height: 50px;
    display: inline-block;
    width: 50%;
    text-align: center;
  }
  a {
    height: 48px;
    color: #888888;
    display: inline-block;
  }
  .active {
    color: #4289ff;
    border-bottom: 3px solid #4289ff;
  }
}
.total {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #333333;
  font-weight: 800;
  padding-left: 16px;
  span {
    font-size: 12px;
    color: #888888;
    font-weight: 400;
  }
}
.order {
  height: 75px;
  padding: 0 16px;
  font-size: 16px;
  font-weight: 500;
  .order-left {
    float: left;
    .order-lt {
      overflow: hidden;
    }
    .order-name {
      display: block;
      float: left;
      margin: 15px 15px 10px 0;
    }
    .order-price {
      float: left;
      margin-top: 15px;
      color: #4289ff;
    }
    .order-time {
      color: #888888;
      font-weight: 400;
      font-size: 12px;
    }
  }
  .rigImg {
    float: right;
    display: flex;
    height: 75px;
    align-items: center;
    img {
      width: 6px;
      height: 15px;
    }
  }
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
  font-size: 12px;
  font-weight: 800;
  span {
    line-height: 55px;
    display: inline-block;
    width: 25%;
    text-align: center;
  }
  a {
    width: 82px;
    height: 30px;
    line-height: 30px;
    color: #333333;
    background: #f5f5f5;
    border: 1px solid #f5f5f5;
    display: inline-block;
  }
  .active {
    color: #4289ff;
    border: 1px solid #4289ff;
    background: #fff;
  }
}
.detail-group {
  height: 55px;
  // width: 686.0025px;
  padding: 0 16px;
  margin: 0 auto;
  line-height: 55px;
  .detail-name {
    display: inline-block;
    width: 135px;
    font-weight: 600;
  }
  .detail-content {
    float: right;
    color: #666666;
    max-width: 265px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    white-space: nowrap;
  }
  .s-name{
    width: 90px;
  }
  .s-content{
    max-width: 250px;
  }
  .img-icon {
    width: 12.5px;
    height: 15px;
    float: right;
    margin-top: 17px;
    margin-left: 3.5px;
  }
  .address-name {
    display: inline-block;
    width: 60px;
    font-weight: 600;
  }
  .address {
    max-width: 265px;
    overflow: hidden;
    text-align: end;
    text-overflow: ellipsis;
    display: inline-block;
    white-space: nowrap;
  }
  img {
    width: 12.5px;
    height: 15px;
    float: right;
  }
}
.pic-group {
  height: 80px;
  // width: 686.0025px;
  padding: 0 16px;
  margin: 0 auto;
  line-height: 80px;
  .pic-name {
    display: inline-block;
    width: 94px;
    font-weight: 600;
  }
  .imageUp {
    float: right;
    width: 59px;
    height: 59px;
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
    width: 59px;
    height: 59px;
  }
}
.busscope {
  .scope-name {
    background: #f4f5f8;
    height: 40px;
    line-height: 40px;
    padding-left: 16px;
    color: #999999;
    font-size: 12px;
  }
  .overf {
    overflow: hidden;
  }
  .scop-content {
    padding: 15px 16px;
    line-height: 16px;
    float: left;
  }
  .scop-time {
    padding: 15px 16px;
    line-height: 16px;
    color: #666666;
    float: right;
  }
  .jy-name {
    width: 100%;
    height: 39px;
    line-height: 39px;
    text-indent: 16px;
    color: #484848;
    background: #f4f5f8;
    font-weight: 800;
  }
  .jy-content {
    color: #666666;
    background: #fff;
    padding: 6px 16px;
    line-height: 39px;
  }
}
.remark {
  p {
    line-height: 39px;
    text-indent: 16px;
  }
  .remark-content {
    padding: 0 16px 15px;
    line-height: 16px;
    color: #666666;
  }
}
.botbackground {
  height: 65px;
  width: 100%;
  background: #f4f5f8;
}
.edit {
  width: 100%;
  height: 55px;
  position: fixed;
  bottom: 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 16px;
  .more {
    width: 110px;
    height: 41px;
    border: 1px solid #888888;
    border-radius: 3px;
    color: #888888;
    background: #fff;
    line-height: 41px;
    padding:0;
    margin-left: 135px;
    text-align: center;
    position: relative;
    img{
      width: 10px;
      height: 6px;
      margin-left: 6px;
    }
    .pop{
      width: 80px;
      position: absolute;
      bottom: 55px;
      padding: 0 15px;
      background: #fff;
      border: 1px solid #888888;
      border-radius: 6px;
      view{
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        overflow: hidden;
      }
      .changeres{
        border-bottom: 1px solid #ECECEC;
      }
    }
    .jiao{
        position: absolute;
        top: -14px;
        width: 0;
        height: 0;
        border-top: 10px solid #888888;
        border-left: 10px solid transparent;
        border-right: 10px solid transparent;
        border-bottom: 10px solid transparent;
        margin-left: 45px;
        background-color: rgba(0,0,0,0);
    }
  }
  .editbtn {
    width: 96px;
    height: 41px;
    border: 1px solid #4289ff;
    border-radius: 3px;
    color: #4289ff;
    background: #fff;
    line-height: 41px;
    margin-right: 15px;
  }
}
.radio_box {
  max-height: 450px;
  overflow-y: auto;
  padding: 10px 0 0 10px;
}

.radio_group {
  display: inline-flex;
  margin: 5.5px;
  padding-bottom: 4px;
}
input[type="radio"] {
  display: none;
}

.type_1 {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 78px;
  background-color: #fff;
  font-size: 16px;
  font-family: PingFangSC-Medium;
  font-weight: 400;
  color: rgba(51, 51, 51, 1);
  transition: all 0.1s ease-out;
  padding: 7.5px 2.5px;
  border-radius: 25px;
  border: 1px solid rgba(153, 153, 153, 0.4);
}

.type_1_active {
  color: #fff;
  background: #4289ff;
  border: 1px solid #4289ff;
}
</style>

<script>
import wx from 'wx';
import api from '@/utils/api';
import util from '@/utils/util';
import getCurrentPages from 'wxFunction';

export default {
  data () {
    return {
      providerId: '',
      provider: {
        spinfo: {},
        status: {},
        secondary: {},
        picList: [],
        itemList: []
      },
      sqlb: '',
      closeImg: '',
      longImg: '',
      payway: '',
      smallCar: '',
      bigCar: '',
      goodWash: '',
      cardWash: '',
      tabNum: 0,
      nowIndex: 0,
      bussinessScope: [],
      support: [],
      scopeList: [],
      partner: [],

      showPerson: false,
      personArr: [],
      sellerId: wx.getStorageSync('mem_userId'),
      person: '',
      actId: '',
      selectMan: null,
      more: false
    };
  },
  mounted () {
    var page = getCurrentPages();
    this.providerId = page[page.length - 1].options.id;
    this.getDetailInfo();
    this.getuser();
  },
  methods: {
    // 加载详情信息
    getDetailInfo () {
      let data = {
        providerId: this.providerId
      };
      api.getHandle('Provider/GetProviderDetail', data).then(res => {
        if (res.Success) {
          this.provider = res.Data;
          this.sqlb = (this.provider.status.FlagSQT === true ? '商圈T' : '') + (this.provider.status.FlagSQL === true ? ' 商圈L ' : '') + (this.provider.status.FlagSQJ === true ? ' 商圈+ ' : '') + (this.provider.status.FlagOther === true ? ' 其他 ' : '') + (this.provider.status.FlagJMQ === true ? ' 居民区 ' : '');
          this.payway = (this.provider.status.PayAlipay === true ? ' 支付宝' : '') + (this.provider.status.PayBank === true ? ' 银行卡' : '') + (this.provider.status.PayMoney === true ? ' 现金' : '') + (this.provider.status.PayWechat === true ? ' 微信' : '');
          this.partner = this.provider.itemList.filter(x => x.ItemType === 2); // 合作项目
          this.scopeList = this.provider.itemList.filter(x => x.ItemType === 3); // 经营范围
          for (var i = 0; i < this.partner.length; i++) {
            this.partner[i].ItemBeginTime = util.formatDate(this.partner[i].ItemBeginTime);
          }
          // 洗车价格
          this.provider.itemList.filter(x => x.ItemType === 1).forEach(item => {
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
          this.provider.status.ServiceKX === true ? this.support.push({name: '支持快洗', value: '是'}) : this.provider.status.ServiceKX === false ? this.support.push({name: '支持快洗', value: '否'}) : this.support.push({name: '支持快洗', value: ''});
          this.provider.status.ServiceDL === true ? this.support.push({name: '电路施工能力', value: '有'}) : this.provider.status.ServiceDL === false ? this.support.push({name: '电路施工能力', value: '无'}) : this.support.push({name: '电路施工能力', value: ''});
          this.provider.status.ServiceLED === true ? this.support.push({name: 'LED屏', value: '有'}) : this.provider.status.ServiceLED === false ? this.support.push({name: 'LED屏', value: '无'}) : this.support.push({name: 'LED屏', value: ''});
          this.provider.status.ServiceYY === true ? this.support.push({name: '支持预约', value: '是'}) : this.provider.status.ServiceYY === false ? this.support.push({name: '支持预约', value: '否'}) : this.support.push({name: '支持预约', value: ''});
          // 图片显示
          // eslint-disable-next-line no-redeclare
          for (var i = 0; i < this.provider.picList.length; i++) {
            if (this.provider.picList[i].ScenceType === 0) {
              this.closeImg = 'https:' + this.provider.picList[i].Url;
            } else if (this.provider.picList[i].ScenceType === 1) {
              this.longImg = 'https:' + this.provider.picList[i].Url;
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
    // 导航
    showmap () {
      wx.openLocation({
        latitude: this.provider.secondary.Lat,
        longitude: this.provider.secondary.Lng,
        name: this.provider.spinfo.SPName,
        address: this.provider.secondary.Address
      })
    },
    // 联系电话
    callStore () {
      console.log(this.provider);
      if (!this.provider.secondary.ConnectMobile) {
        wx.showToast({
          image: '/static/images/icon/icon_error.png',
          title: '联系电话为空！',
          mask: true
        });
      } else {
        wx.makePhoneCall({
          phoneNumber: this.provider.secondary.ConnectMobile
        });
      }
    },
    // 获取销售人员
    getuser () {
      const params = {
        departId: api.departId
      };
      api.getUCHandle('UserManager/GetUserItemsBydepartId', params).then(res => {
        if (res.Success) {
          this.personArr = res.Data;
        } else {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '销售列表获取失败！',
            mask: true
          });
        }
      });
    },
    toOrderDetail (id) {
      // wx.navigateTo({
      //   url: 'orderDetail?id=' + id
      // })
      wx.navigateTo({
        url: 'orderDetail?id='
      })
    },
    // 切换tabs
    toggleTabs (index) {
      this.nowIndex = index;
    },
    // 切换大tab
    toData (index) {
      this.tabNum = index;
    },
    // 编辑
    editInfo () {
      wx.setStorageSync('nowIndex', this.nowIndex);
      wx.navigateTo({
        url: 'editInfo?id=' + this.providerId
      })
    },
    // 预览图片
    previewClose () {
      wx.previewImage({
        urls: [this.closeImg]
      })
    },
    previewLong () {
      wx.previewImage({
        urls: [this.longImg]
      })
    },
    // 变更负责人
    changePerson () {
      this.showPerson = true;
    },
    ddd (event) {
      event.target.dialog.setData({
        loading: {
          confirm: false,
          cancel: false
        }
      })
    },
    onClose (event) {
      if (event.mp.detail === 'confirm') {
        var handTime = new Date(this.provider.spinfo.HandoverTime);
        var a = new Date();
        var timespan = a.getTime() - handTime.getTime();
        var day = Math.floor(timespan / (60 * 60 * 24 * 1000));
        let spanDays = 30 - day;
        if (!this.selectMan) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '请选择责任人',
            mask: true
          });
        } else if (this.selectMan.Id === this.sellerId) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: '不能变更为自己',
            mask: true
          });
        } else if (day < 30) {
          wx.showToast({
            image: '/static/images/icon/icon_error.png',
            title: `请${spanDays}天后重试`,
            duration: 3000,
            mask: true
          });
          this.showPerson = false;
        } else {
          let data = {
            providerId: this.providerId,
            sellerId: this.selectMan.Id,
            sellerName: this.selectMan.Name
          };
          api.getHandle('Provider/SelectSeller', data).then(res => {
            if (res.Success) {
              wx.showToast({
                icon: 'success',
                title: '变更成功',
                mask: true
              })
              this.showPerson = false;
              this.getDetailInfo();
            } else {
              wx.showToast({
                image: '/static/images/icon/icon_error.png',
                title: '变更失败',
                mask: true
              })
            }
          });
        }
      } else {
        this.showPerson = false;
      }
    },
    // radio选定后处理函数
    checkedHandle (e) {
      this.actId = e.Id;
      this.selectMan = e;
    },
    // 显示变更联系人和删除按钮
    showMore () {
      this.more = !this.more;
    },
    // 删除信息
    deleteInfo () {
      let that = this;
      wx.showModal({
        title: '提示',
        content: '确定删除吗？',
        success (res) {
          if (res.confirm) {
            let data = {
              providerId: that.providerId
            };
            api.getHandle('Provider/DelProvider', data).then(res => {
              if (res.Success) {
                wx.showToast({
                  title: '删除成功',
                  icon: 'none',
                  duration: 2000
                });
                setTimeout(() => {
                  wx.navigateBack({
                    delta: 1
                  })
                }, 100)
                // this.preLoad();
              } else {
                wx.showToast({
                  title: '删除失败',
                  icon: 'none',
                  duration: 2000
                });
              }
            })
          }
        }
      })
    }
  }
};
</script>
