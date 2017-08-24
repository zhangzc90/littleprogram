// index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contactList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      sessionID:wx.getStorageSync('sessionID')
    });   
  },
  onShow:function(){
    this.loadCollect();
  },
  openDetail:function(e){
    var uid = e.currentTarget.dataset.uid;
    wx.navigateTo({
      url: '/pages/card/card?uid='+uid+"&collect=1",
    })
  },
  loadCollect:function(){
    let _this=this;
    wx.showLoading({
      title: '数据加载中',
      mask:true
    })
    wx.request({
      url: 'https://www.xiaodaofls.com/index.php/index/getContactList',
      method:'POST',
      header:{
        'content-type': 'application/x-www-form-urlencoded'
      },
      data:{'sessionID':_this.data.sessionID},
      success:function(res){
        wx.hideLoading();
        if(!res.data)
          return;       
        let datas=[];
        for( var item of res.data){
          datas.push(item);
        }
        _this.setData({
          contactList:datas
        });
      }
    })
  }
})