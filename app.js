//app.js
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.getUserInfo({
        withCredentials: false,
        success: function(res) {
          that.globalData.userInfo = res.userInfo
          typeof cb == "function" && cb(that.globalData.userInfo)
        }
      })
    }
  },
  //获取用户的登录状态 
  userLogin:function(){
    var _this=this;
    // 检查用户登录状态的
    let session=wx.getStorageSync("sessionID");
    if(session==""){
      wx.login({
        success: function (res) {
          if (res.errMsg == "login:ok") {
            wx.request({
              url: 'https://www.xiaodaofls.com/index.php/index/session3d',
              header: {
                'content-type': 'application/x-www-form-urlencoded'
              },
              dataType: "json",
              data: { code: res.code },
              method: 'POST',
              success: function (res) {
                if (res.data) {
                  wx.setStorage({
                    key: 'sessionID',
                    data: res.data,
                  })
                }
              },
              fail: function () {
                console.log('出错了');
              }
            })
          }
        }
      })
    }
  },

  globalData: {
    userInfo: null,
  }
})
