<template>
  <view v-if="isShow">
    <radio-group>
      <label :class="{checkbox: true, checked: item.checked}" v-for="(item,index) in checkboxArr" @tap.stop="radio2" :id="index" :key="item.name">
        <checkbox :value="item.name" :checked="item.checked" :disabled="!item.checked"/>
        {{item.name}}
      </label>
    </radio-group>
  </view>
</template>

<style scoped>
.modal_mask {
  width: 100%;
  height: 65%;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  z-index: 100;
} /* 
  .modal_Box{
    height: 90%;
    width: 100%;
    position: fixed;
    z-index: 999999;
    bottom: 0;
    background-color: #fff;
  }
  .modal_title{
    display: flex;
    justify-content: space-between;
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #e5e5e5;
    padding: 0 32px;
  }
  .modal_title button{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #508CEE;
    margin: 0px 0px;
    vertical-align: middle;
    line-height: 40px;
    background: #fff;
  }
  .modal_title p{
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #333333;
  }
  .modal_content{
    height: 360px;
    padding: 0px 10px 0px 30px;
  }
  .color{
    color: red;
  }
  .wrap{
    width: 550px;
    margin: 50px auto;
  }

  .checkbox-con{
    margin-top: 40px;
    text-align: center
  }
  .checkbox{
    width: 216px;
    height: 48px;
    line-height: 48px;
    font-family: PingFangSC-Regular;
    font-size: 13px;
    color: #666666;
    text-align: center;
    display: inline-block;
    position: relative;
    z-index: 9999;
    background-color: #f9f9f9;
    margin-right: 20px;
    margin-bottom: 26px;
  }
  .checkbox:first-of-type{
    margin-top: 40px;
  }
  .checkbox:last-of-type{
    margin-bottom: 40px;
  }
  .checked{
    color: #508CEE !important;
    background: #F2F7FF;
  }
  .checkbox checkbox{
    display: none
  } */
</style>

<script>
// eslint-disable-next-line no-unused-vars
import Dialog from '../../static/vant/dialog/dialog';
export default {
  name: 'index',
  props: ['isShow', 'checkboxArr', 'titlea'],
  data () {
    return {
      checkedInsurance: []
    };
  },
  methods: {
    radio2 (e) {
      let index = e.mp.target.id; // 获取当前点击的下标
      this.checkboxArr[index].checked = !this.checkboxArr[index].checked; // 改变当前选中的checked值
      this.checkedInsurance = [];
      this.checkboxArr.forEach(item => {
        if (item.checked) {
          this.checkedInsurance.push(item);
        }
      });
    },
    // 取消之后传给父组件的值
    tapNoShow () {
      this.isShow = false;
      // this.checkboxArr.forEach(item => {
      //   item.checked = false
      // });
      // this.checkedInsurance = [];
      // this.flag = false;
      this.$emit('getInsurance', this.isShow);
    },
    // 确定之后传给父组件的值
    tapComfirm () {
      this.isShow = false;
      this.$emit('getInsurance', this.checkedInsurance, this.isShow);
    }
  }
};
</script>
