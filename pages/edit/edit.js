// edit.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionID:"",
    headimg:"",
    userInfo:{},
    area:"请选择您的所在地区",
    map:{
      longitude:"",
      latitude:"",
      markers:[
        {
          latitude:"",
          longitude:"",
          iconPath:"../image/mark.png",
          callout:{
            title: "",
            borderRadius:5,
            padding:10,
            dislay:"ALWAYS"
          }
        }
      ],
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this=this;
    app.getUserInfo(function(userInfo){
      // console.log(userInfo);
      _this.setData({
        "headimg": userInfo.avatarUrl,
      })
    });
    // 设置openid
    _this.setData({
      "sessionID": wx.getStorageSync("sessionID")
    });
    _this.getUserInfo(this.data.sessionID);
   
  },
  // 选择地址
  chooseLocation:function(){
    var _this=this;
    wx.chooseLocation({
      success: function(res) {
        if(res.errMsg=="chooseLocation:ok"){
         _this.setData({
           map: {           
             latitude: res.latitude,
             longitude: res.longitude,
             iconPath: "../image/mark.png",
             markers: [{
               longitude: res.longitude,
               latitude: res.latitude,
             }]
           }
         });
        }
      },
    })
  },
  // 选择地域
  chooseArea:function(e){
    this.setData({
      "area":e.detail.value,
    });
  },
  //提交数据
  formData:function(e){
    var _this=this;  
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/saveUserInfo',
      method:'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{
        "sessionID": _this.data.sessionID,
        "userinfo": JSON.stringify(e.detail.value),
        "map": JSON.stringify(_this.data.map),
        "headimg":_this.data.headimg,
        "area":_this.data.area
      },
      success:function(res){
        wx.showLoading({
          title: '数据提交中···',
          mash:true
        })
        if(res.data==1){  
          wx.hideLoading();
          wx.showToast({
            title: '提交成功',
            success:function(){
             setTimeout(function(){
               wx.navigateBack({
                 url: '/pages/index/index',
               });
             },1000);
            }
          })
        }
      },
      fail:function(){}
    })
  },
  // 获取用户信息
  getUserInfo: function (session) {
    var _this = this
    wx.showLoading({
      title: '请求数据中',
    })
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/getSelfInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: { "sessionID": session },
      success: function (res) {
        _this.setData({
          "userInfo": {
            name: res.data.name,
            position: res.data.position,
            tel: res.data.tel,
            company: res.data.company,
            email: res.data.email,
            area: res.data.area,
            address: res.data.address,
            trade: res.data.trade,
            headimg: res.data.headimg,      
          },
          "area":res.data.area,
          "map.longitude": res.data.map.markers[0]['longitude'],
          "map.latitude": res.data.map.markers[0]['latitude'], 
          "map.markers[0]": 
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
        });
        wx.hideLoading();
      },
      fail: function (res) {

      }
    })
  }
})