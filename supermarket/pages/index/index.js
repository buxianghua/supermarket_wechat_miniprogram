//index.js

// 引入用来发送请求的方法
import { request } from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //轮播图数组
    swiperList: [],
    // 导航栏数组
    catesList: [],
    // 获取楼层数据
    floorList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 优化请求发送通过es6的promise来解决
    // 发送异步请求获取轮播图数据
    // let request = wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',
    //   data: {},
    //   header: {'content-type':'application/json'},
    //   method: 'GET',
    //   dataType: 'json',
    //   responseType: 'text',
    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   },
    //   fail: ()=>{},
    //   complete: ()=>{}
    // });

    this.getSwiperList();
    this.getCateList();
    this.getFloorList();

  },

  // 获取轮播图数据
  getSwiperList(){
    request({ url: "/home/swiperdata" })
      .then(result => {
        this.setData({
          swiperList: result
        })
      })
  },
  // 获取分类导航数据
  getCateList(){
    request({ url: "/home/catitems" })
      .then(result => {
        this.setData({
          catesList: result
        })
      })
  },
  // 获取楼层数据
  getFloorList(){
    request({ url: "/home/floordata" })
      .then(result => {
        this.setData({
          floorList: result
        })
      })
  }
})
