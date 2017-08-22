// pages/card/card.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: {
      name: "张小超",
      position: "技术",
      tel: "17703813226",
      company: "北京容与视觉设计郑州分公司",
      email: "674058081@qq.com",
      area: "河南郑州",
      address: "金水区国基路国家知识产权产业设计园",
      trade: "视觉设计/品牌策划",
      headimg: "http://wx.qlogo.cn/mmopen/sice1iaSYDKXphkPmw1UNHc4PLNlfr1GvlhocD7Fl5BIONKCMofzmnA44Z4ImPU0RabmZsZvjo5H7IzoXwRSiafucjXicvOBnOSib/132",
      longitude: "113.6721900000",
      latitude: "34.8199200000",
      markers: [
        {
          iconPath: '../image/mark.png',
          id: 1,
          latitude: 34.8199300000,
          longitude: 113.6723900000,
          callout: {
            content: '北京容与视觉设计郑州分公司',
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
      uid: options.uid
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
    let session=wx.getStorageSync("sessionID");
    wx.request({
      url: '',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      methoad:"POST",
      data:{},
      success:function(res){

      }
    })
  }
})