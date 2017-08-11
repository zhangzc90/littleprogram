//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    share:{
      title:'我的名片',
      path:'/pages/index/index',
    },
    markers:[
      {
        iconPath:'../image/mark.png',
        id:1,
        latitude: 34.8199300000,
        longitude: 113.6723900000,
        callout:{
          content:'北京容与视觉设计郑州分公司',
          borderRadius:5,
          padding:5,
          bgColor:'#ffffff',
          color:'#000000',
          display:'ALWAYS'
        }
      },
      ],
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo
      })
    })
  },
  onShareAppMessage:function(){
    return{
      title:this.data.share.title,
      path:this.data.share.path,
      success:function(res){
        console.log(res);
      }
    }
  },
  openNavi:function(){
    wx.openLocation({
      latitude: 34.8199300000,
      longitude: 113.6723900000,
      scale:28
    })
  }
})
