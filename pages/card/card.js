// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: "",
      position: "",
      tel: "",
      company: "",
      email: "",
      area: "",
      address: "",
      trade: "",
      headimg: "",
      longitude: "",
      latitude: "",
      markers: [
        {
          iconPath: '../image/mark.png',
          id: 1,
          latitude: '',
          longitude: '',
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let session = wx.getStorageSync("sessionID")
    // 获取用户信息
    this.setData({
      uid: options.uid,
      collect:options.collect
    })
    this.getUserInfo(session);   
  },
  // 获取用户信息
  getUserInfo: function (session) {
    var _this = this
    wx.showLoading({
      title: '请求数据中',
    });
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/getOtherInfo',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      method: "POST",
      data: { "uid": _this.data.uid },
      success: function (res) {
        _this.setData({
          userInfo: {
            name: res.data.name,
            position: res.data.position,
            tel: res.data.tel,
            company: res.data.company,
            email: res.data.email,
            area: res.data.area,
            address: res.data.address,
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
        wx.hideLoading();
      },
      fail: function (res) {

      }
    })
  },

  // 跳转到名片编辑页面
  createCard:function(){
    wx.navigateTo({
      url: '/pages/edit/edit',
    })
  },
  // 保存到我的名片夹
  saveCard:function(){
    let _this=this;
    let session=wx.getStorageSync("sessionID");
    wx.showLoading({
      title: '数据保存中',
      mask:true
    })
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/saveOtherInfo',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      method:"POST",
      data:{"sessionID":session,"uid":_this.data.uid},
      success:function(res){
        if(res.data==1){
          wx.hideLoading();
          wx.showToast({
            title: '保存成功',
            success:function(){
              wx.switchTab({
                url: '/pages/collect/collect',
              })
            }
          })
        }
      }
    })
  },
  callNumber:function(){
    let _this=this;
    wx.makePhoneCall({
      phoneNumber: _this.data.userInfo.tel,
    })
  }
})