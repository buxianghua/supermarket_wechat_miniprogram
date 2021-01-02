// pages/category/index.js
// 引入用来发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 左侧菜单数据
    leftMenuList: [],
    // 右侧商品数据
    rightContent: [],
    // 被点击的左侧菜单
    currentIndex: 0,
    // 右侧滚动条距离顶部的距离
    scrollTop: 0
  },
  // 接口的返回数据
  Cates: [],
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    /**
     * web中本地存数据与小程序区别
     * web:localStorage.setItem{"key","value"} localStorage.getItem{"key"}
     * 小程序:wx.setStorageSync('key','value') wx.getStorageSync('key')
     * web:存入的时候,将数据经过toString()后再存入
     * 小程序:直接存入
     */
    // 获取本地存储中的数据
    const Cates = wx.getStorageSync('cates');
    // 判断
    if (!Cates) {
      // 不存在数据，则发送请求
      this.getCates();
    } else {
      // 有旧数据
      if (Date.now() - Cates.time > 1000 * 300) {
        // 过期了重新发送数据
        this.getCates();
      } else {
        // 使用旧数据
        this.Cates = Cates.data;
        // 渲染左边的菜单数据
        let leftMenuList = this.Cates.map(v => v.cat_name);
        // 渲染右边的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }

  },
  //获取分类数据
  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(res => {
    //   this.Cates = res.data.message;
    //   // 此时说明已经获取数据成功,开始将数据存入本地
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //   // 构造左边的菜单数据
    //   let leftMenuList = this.Cates.map(v => v.cat_name);
    //   // 构造右边的商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent
    //   })
    // })

    // 使用es7的async await来发送请求
    const res = await request({url:"/categories"});
    // this.Cates = res.data.message;
    this.Cates = res;
    // 此时说明已经获取数据成功,开始将数据存入本地
    wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    // 构造左边的菜单数据
    let leftMenuList = this.Cates.map(v => v.cat_name);
    // 构造右边的商品数据
    let rightContent = this.Cates[0].children;
    this.setData({
      leftMenuList,
      rightContent
    })

  },
  // 左侧菜单点击事件
  handleItemTap(e) {
    // 获取被点击的标题身上的索引
    // 给data中的currentIndex赋值
    // 根据不通的索引渲染右侧不同的商品内容
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;
    
    this.setData({
      currentIndex: index,
      rightContent,
      // 重新设置右侧内容的scroll-view标签距离顶部的距离
      scrollTop:0
    })

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