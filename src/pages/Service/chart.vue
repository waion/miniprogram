<template>
  <view class="chart">
    <view
      class="date"
      @click="date=!date"
    >
      2019年1月
      <img
        src="/static/images/service/icon-datexia.svg"
        v-show="!date"
      >
      <img
        src="/static/images/service/icon-dateshang.svg"
        v-show="date"
      >
    </view>
    <view v-if="date">
      <view class="select-date">
        <view>
          <picker
            mode="selector"
            @change="bindPickerChange"
            @cancel="bindPickerCancel"
            :value="index"
            :range="array"
          >
            <view class="picker">
              {{array[index]}}年
            </view>
          </picker>
        </view>
        <view>
          <span>按月份</span>
          <picker
            @change="bindMonthChange"
            :value="mindex"
            :range="arrayMonth"
          >
            <view class="picker">
              {{arrayMonth[mindex]}}月
            </view>
          </picker>
          <!-- <span>按周期</span>
          <picker
            @change="bindCycleChange"
            :value="cindex"
            :range="arrayCycle"
          >
            <view class="picker">
              {{arrayCycle[cindex]}}
            </view>
          </picker> -->
        </view>
      </view>
      <view
        class="mongolia"
        @click="date=false"
      ></view>
    </view>
    <view class="banner">
      <view class="fl-l bleft">
        <p>5000.00</p>
        <span>
          <img src="/static/images/service/icon-ability.svg">
          我的业绩
        </span>
      </view>
      <view class="fl-l border-center"></view>
      <view class="fl-r bright">
        <p>
          13
          <i class="total">/50</i>
        </p>
        <span>
          <img src="/static/images/service/icon-ranking.svg">
          我的排名
        </span>
      </view>
      <view
        class="open-close"
        @click="table=!table"
      >
        <img
          src="/static/images/service/icon-xia.svg"
          v-if="!table"
        >
        <img
          src="/static/images/service/icon-shang.svg"
          v-if="table"
        >
      </view>
    </view>
    <view
      class="tablebox"
      v-if="table"
    >
      <view>
        <view class="title">产品名称</view>
        <view class="content">快富通</view>
        <view class="content">SCRM</view>
        <view class="content">智车品</view>
      </view>
      <view>
        <view class="title">金额</view>
        <view class="content">3000.00元</view>
        <view class="content">3000.00元</view>
        <view class="content">3000.00元</view>
      </view>
      <view>
        <view class="title">排名</view>
        <view class="content">13/23</view>
        <view class="content">13/23</view>
        <view class="content">13/23</view>
      </view>
    </view>
    <view class="inputpref">
      <button>录入业绩</button>
    </view>
    <view class="tabs border1">
      <span @click="toggleTabs0()">
        <a :class="{active: nowIndex==0}">汇总</a>
      </span>
      <span @click="toggleTabs1()">
        <a :class="{active: nowIndex==1}">快富通</a>
      </span>
      <span @click="toggleTabs2()">
        <a :class="{active: nowIndex==2}">产品A</a>
      </span>
      <span @click="toggleTabs3()">
        <a :class="{active: nowIndex==3}">产品B</a>
      </span>
    </view>
    <view
      v-show="nowIndex==0"
      class="list-box"
    >
      <view class="list">
        <img src="/static/images/service/first.svg">
        <span class="name">翟浩</span>
        <span class="data">956767000.00</span>
      </view>
      <view class="list">
        <img src="/static/images/service/second.svg">
        <span class="name">兰兰</span>
        <span class="data">32100.00</span>
      </view>
      <view class="list">
        <img src="/static/images/service/third.svg">
        <span class="name">丁丁</span>
        <span class="data">9000.00</span>
      </view>
      <view class="list">
        <span class="ranking">4</span>
        <span class="name">啦啦啦</span>
        <span class="data">5600.00</span>
      </view>
      <view class="list">
        <span class="ranking">5</span>
        <span class="name">啦啦啦</span>
        <span class="data">5600.00</span>
      </view>
    </view>
    <view
      v-show="nowIndex==1"
      class="list-box"
    >
      <view class="list">
        <img src="/static/images/service/first.svg">
        <span class="name">11</span>
        <span class="data">956767000.00</span>
      </view>
      <view class="list">
        <img src="/static/images/service/second.svg">
        <span class="name">22</span>
        <span class="data">32100.00</span>
      </view>
      <view class="list">
        <img src="/static/images/service/third.svg">
        <span class="name">33</span>
        <span class="data">9000.00</span>
      </view>
    </view>
    <view
      v-show="nowIndex==2"
      class="list-box"
    >
      <view>aaa</view>
    </view>
  </view>
</template>

<style lang="less" scoped>
.chart {
  width: 375px;
  background: #fff;
  font-size: 14px;
  color: #484848;
}
.fl-l {
  float: left;
}
.fl-r {
  float: right;
}

.date {
  height: 41px;
  text-align: center;
  line-height: 41px;
  color: #999999;
  img {
    width: 12.5px;
    height: 8px;
  }
}
.banner {
  width: 375px;
  height: 88px;
  background: url("http://cws-wechat.lunz.cn/static/images/service/chart-banner.svg");
  background-size: 375px 88px;
  color: #4289ff;
  .bleft {
    width: 187px;
  }
  .bright {
    width: 187px;
  }
  .border-center {
    width: 1px;
    height: 25px;
    background: #d4e1ff;
    margin-top: 28px;
  }
  p {
    font-size: 26px;
    text-align: center;
    margin-top: 15.5px;
    .total {
      display: inline;
      font-size: 13px;
      font-style: normal;
    }
  }
  span {
    font-size: 12px;
    text-align: center;
    display: flex;
    justify-content: center;
    img {
      width: 9px;
      height: 10px;
      margin-right: 6px;
      margin-top: 5px;
    }
  }
  .open-close {
    padding: 3px 10px 10px;
    width: 13.5px;
    height: 9px;
    overflow: hidden;
    margin: 0 auto;
    display: flex;
    img {
      width: 13.5px;
      height: 9px;
    }
  }
}
.tablebox {
  background: #f7faff;
  display: flex;
  justify-content: space-between;
  padding: 10px 15px;
  line-height: 30px;
  .title {
    color: #999999;
  }
}
.inputpref {
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 345px;
    height: 41px;
    background: #4289ff;
    border: 0;
    border-radius: 3px;
    color: #fff;
    margin-top: 10px;
  }
}
.tabs {
  span {
    line-height: 51px;
    display: inline-block;
    width: 80px;
    text-align: center;
    a {
      height: 51px;
      color: #999999;
      display: inline-block;
    }
    .active {
      color: #484848;
      border-bottom: 2px solid #4289ff;
    }
  }
}
.border1 {
  box-shadow: 0px 1px 2px 0px rgba(0, 21, 69, 0.1);
}
.list-box {
  padding: 0 16px;
}
.list {
  height: 43px;
  line-height: 43px;
  border-bottom: 1px solid #ebebeb;
  img {
    width: 17px;
    height: 20.5px;
    float: left;
    margin-top: 11.5px;
  }
  .ranking {
    width: 8px;
    display: block;
    padding: 0 4.5px;
    color: #484848;
    float: left;
  }
  .name {
    color: #484848;
    float: left;
    margin-left: 15px;
  }
  .data {
    color: #4289ff;
    font-weight: 800;
    display: block;
    max-width: 130px;
    float: right;
  }
}
.select-date {
  position: absolute;
  top: 41px;
  width: 375px;
  height: 191px;
  background: #fff;
  z-index: 99;
}
.mongolia {
  position: absolute;
  top: 232px;
  width: 375px;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
  z-index: 99;
}
.picker {
  width: 313px;
  height: 50px;
  margin: 0 auto;
  border: 1px solid #d9d9d9;
  font-size: 14px;
  line-height: 50px;
  padding: 0 15px;
}
</style>

<script>

export default {
  data () {
    return {
      table: false,
      date: false,
      nowIndex: 0,
      index: 0,
      array: ['2019', '2018', '2017', '2016'],
      mindex: 0,
      arrayMonth: ['1', '2', '3'],
      cindex: 0,
      arrayCycle: ['半年']
    };
  },
  methods: {
    // 切换tabs
    toggleTabs0 () {
      this.nowIndex = 0;
    },
    toggleTabs1 () {
      this.nowIndex = 1;
    },
    toggleTabs2 () {
      this.nowIndex = 2;
    },
    toggleTabs3 () {
      this.nowIndex = 3;
    },
    bindPickerChange (e) {
      // 第几个选择的值
      this.index = e.mp.detail.value;
    },
    bindPickerCancel () {
      console.log(1);
    },
    bindMonthChange (e) {
      this.mindex = e.mp.detail.value;
    }
  }
};
</script>
