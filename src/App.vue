<script>
import wx from 'wx';
export default {
  mpType: 'app',
  created () {
    // 调用API从本地缓存中获取数据
    // const logs = wx.getStorageSync('logs') || [];
    // logs.unshift(Date.now());
    // wx.setStorageSync('logs', logs);
    console.log('app created and cache logs by setStorageSync');
  },
  onLaunch () {
    const updateManager = wx.getUpdateManager()
    updateManager.onUpdateReady(function () {
      wx.showModal({
        title: '更新提示',
        content: '新版本已经准备好，是否重启应用？',
        success: function (res) {
          if (res.confirm) {
            // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
            updateManager.applyUpdate()
          }
        }
      })
    });

    var memUsername = wx.getStorageSync('mem_username');
    var ucRoleid = wx.getStorageSync('uc_roleid');
    var memUserId = wx.getStorageSync('mem_userId');
    var openId = wx.getStorageSync('openId');
    if (memUsername && ucRoleid && memUserId && openId) {
      // this.globalData.userId = wx.getStorageSync('userId');
      // this.globalData.openId = wx.getStorageSync('openId');
      // this.globalData.tokenId = wx.getStorageSync('tokenId');
      // this.globalData.qxentity = wx.getStorageSync('qxentity');
      // this.globalData.userName = wx.getStorageSync('userName');
      // this.globalData.passWord = wx.getStorageSync('passWord');
    } else {
      console.log('跳转');
      wx.reLaunch({
        url: '/pages/ucenter/index'
      })
    }
  }
};
</script>

<style>
.container {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  box-sizing: border-box;
}
</style>
