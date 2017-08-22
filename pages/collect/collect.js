// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList:[
      {
        "uid":1,
        "headimg":"http://wx.qlogo.cn/mmopen/sice1iaSYDKXphkPmw1UNHc4PLNlfr1GvlhocD7Fl5BIONKCMofzmnA44Z4ImPU0RabmZsZvjo5H7IzoXwRSiafucjXicvOBnOSib/132",
        "name":"张小超",
        "company":"云皇科技",
        "time":"2017-08-12"
      },
      {
        "uid": 2,
        "headimg": "http://wx.qlogo.cn/mmopen/9jj4vaULmc27gMx8ibsHc7zEUFuTg08svicF7vdAtmXVtYAkNibbQ245P6iaOWnGjQvE2j71dC8kJPKPiaCFNOl0ybZc5MrSb9QHia/0",
        "name": "志昊·窦",
        "company": "无业",
        "time": "2017-08-12"
      },
      {
        "uid": 3,
        "headimg": "http://wx.qlogo.cn/mmopen/78EkX665csCYEfkBAgS69FMsFlHLBfDXWIbjxGuibmogZz7XUcMdtvfA6oIlufrEKIHX0ftSb2ZxoGAe1sxgUwicXgf9Mcv752/132",
        "name": "个儿·于",
        "company": "云皇科技",
        "time": "2017-08-12"
      },
      {
        "uid": 4,
        "headimg": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLAtMthicEoY8uq4RicPg2CiapevmU1OwkwicYCjRd8vJch3tQhSdtp40D43BN22q6iawuA0ic5Q3ERXM1iaQ/132",
        "name": "柚子·代",
        "company": "云皇科技",
        "time":"2017-08-12"
      },
      {
        "uid": 5,
        "headimg": "http://wx.qlogo.cn/mmopen/78EkX665csDciaCsInnuibOQxYxH4GPGo1cZDib8JQQLzuzFwClqlcn718WhctjlzB8fbSDnKPSbKB9hhxW5mm4KlwUcsOKFsaQ/132",
        "name": "小道·何",
        "company": "云皇科技",
        "time":"2017-08-12"
      },
      {
        "uid": 6,
        "headimg": "http://wx.qlogo.cn/mmopen/ajNVdqHZLLCpXBugw4zyTiaDXtQY89ZibJI0ZUlknz7H2L1NcJr4MSdribUJq3qTibmIx5evQLJ0kQ3nNwiaSf43m6A/132",
        "name": "帮曦·乔",
        "company": "研究生",
        "time":"2017-08-12"
      },
      {
        "uid": 6,
        "headimg": "http://wx.qlogo.cn/mmopen/sice1iaSYDKXphkPmw1UNHc7BFaKzhuntQt6B80jFnoBlbnX8Sz0wQgmqO1UEic3Z5DGPKdkGmIqrBV2uhmJ6jfho0BticKHQ4wL/132",
        "name": "周",
        "company": "总经理",
        "time": "2017-08-12"
      },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  openDetail:function(e){
    var uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '/pages/card/card?uid='+uid,
    })
  }
})