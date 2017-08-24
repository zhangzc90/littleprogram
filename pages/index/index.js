//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    sessionID: "",  
    // 分享操作参数
    share:{
      title:'我的名片',
      path:'/pages/card/card',
    },
    // 名片信息
    userInfo:{
      name:"",
      position:"",
      tel:"",
      company:"",
      email:"",
      area:"",
      address:"",
      intro:"",
      trade:"",
      headimg:"",
      longitude:"",
      latitude:"",
      markers: [
        {
          iconPath: '../image/mark.png',
          id: 1,
          latitude:"" ,
          longitude: "",
          callout: {
            content: '',
            borderRadius: 5,
            padding: 5,
            bgColor: '#ffffff',
            color: '#000000',
            display: 'ALWAYS'
          }
        },
      ],
    }
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    var _this=this;
    // 微信登录获取到用户的openid  
  },
  onShow:function(){
    let _this=this;
    app.userLogin(function(session){
      _this.getUserInfo(session);
    });
  },
  // 分享设置
  onShareAppMessage:function(){
    return{
      title:this.data.share.title,
      path:this.data.share.path,
      success:function(res){}
    }
  },
  // 打开地图
  openNavi:function(){
    var _this=this;
    wx.openLocation({
      latitude: _this.data.userInfo.latitude,
      longitude: _this.data.userInfo.longitude,
      scale:28,
      complete:function()  {
        console.log(this.data);
      }
    })  
  },

  // 编辑名片
  editCard:function(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  // 获取用户信息
  getUserInfo:function(session){
    var _this = this
    wx.showLoading({
      title: '请求数据中',
    });
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/getSelfInfo',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      data: { "sessionID": session},
      success:function(res){
        wx.hideLoading();
        if(!res.data)
          return;
        _this.setData({
          "share":{
            title:res.data.name+"的名片",
            path:"/pages/card/card?uid="+res.data.uid
          },
          userInfo: {
            name: res.data.name,
            position: res.data.position,
            tel: res.data.tel,
            company: res.data.company,
            email: res.data.email,
            area: res.data.area,
            address: res.data.address,
            intro:res.data.intro,
            trade: res.data.trade,
            headimg: res.data.headimg,
            longitude: res.data.map.markers[0]['longitude'],
            latitude: res.data.map.markers[0]['latitude'],
            markers: [
              {
                iconPath: '../image/mark.png',
                id: 1,
                latitude: res.data.map.markers[0]['latitude'],
                longitude: res.data.map.markers[0]['longitude'],
                callout: {
                  content: res.data.company,
                  borderRadius: 5,
                  padding: 5,
                  bgColor: '#ffffff',
                  color: '#000000',
                  display: 'ALWAYS'
                }
              },
            ],
          }
        });
       
      },
      fail:function(res){

      }
    })
  }
})
