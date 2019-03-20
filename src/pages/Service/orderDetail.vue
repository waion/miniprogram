<template>
    <view class="orderDetail">
        <view class="order-list border1">
            <span class="order-name">服务商名称</span>
            <span class="order-content">巧匠汽修</span>
        </view>
        <view class="order-list border1">
            <span class="order-name">责任销售</span>
            <span class="order-content">王思思</span>
        </view>
        <view class="order-list border1">
            <span class="order-name">成交时间</span>
            <span class="order-content">2017-02-25</span>
        </view>
        <view class="order-list">
            <span class="order-name">成交额</span>
            <span class="order-content">￥32785.00</span>
        </view>
        <view class="mxt">
            明细
        </view>
        <view class="order-pro border1">
            <span class="order-name">快富通-快富通终生版</span>
            <span class="order-center">×1</span>
            <span class="order-content">¥32785.00</span>
        </view>
        <view class="order-pro border1">
            <span class="order-name">产品线-子产品</span>
            <span class="order-center">×1</span>
            <span class="order-content">¥32785.00</span>
        </view>
        <view class="order-pro border1">
            <span class="order-name">车险-大美州</span>
            <span class="order-center">×1</span>
            <span class="order-content">¥32785.00</span>
        </view>
        <view class="order-pro border1">
            <span class="order-name">车险-大美州</span>
            <span class="order-center">×1</span>
            <span class="order-content">¥32785.00</span>
        </view>
    </view>
</template>

<style lang="less" scoped>
.orderDetail{
    height: 100%;
    font-size: 16px;
}
.border1{
    border-bottom: 0.5px solid #EBEBEB;
}
.order-list{
    background: #fff;
    height: 55px;
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    .order-name{
        color: #484848;
        font-weight: 500;
        line-height: 55px;
    }
    .order-content{
        font-size: 15px;
        color: #666666;
        line-height: 55px;
    }
}
.mxt{
    height: 40px;
    line-height: 40px;
    background: #F4F5F8;
    color: #999999;
    font-size: 12px;
    padding-left: 16px;
}
.order-pro{
    background: #fff;
    height: 55px;
    margin: 0 16px;
    display: flex;
    justify-content: space-between;
    .order-name{
        color: #484848;
        font-weight: 500;
        line-height: 55px;
        display: inline-block;
        width: 152px;
    }
    .order-center{
        color: #666666;
        line-height: 55px;
    }
    .order-content{
        font-size: 15px;
        color: #666666;
        line-height: 55px;
    }
}
</style>

<script>
export default {

}
</script>
