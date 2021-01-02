// pages/developer/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      zhiFu:"https://images.cnblogs.com/cnblogs_com/jake-jin/1608236/o_200517034918IMG_20200517_114653.jpg"
  },
  // 跳转外部连接
  toOut(){
    wx.navigateTo({
      url: 'https://www.cnblogs.com/jake-jin/',
      success: (result)=>{
        
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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

  }
})