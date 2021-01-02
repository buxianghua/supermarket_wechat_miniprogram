// pages/order/index.js
/**
 * 1 页面被打开的时 onshow
 *    onshow 不同于 onLoad 无法在形参上接收 options 参数
 *    判断缓存中有没有token
 *      没有 直接跳转到授权页面
 *      有 直接往下执行
 *  1  获取url上的参数type
 *  2  根据type来决定页面标题的数组元素 那个被激活选中
 *  3  根据type去发送请求获取订单数据
 *  4  渲染页面
 * 2 点击不同的标题 重新发送请求获取数据渲染数据 
 */
// 引入用来发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "代发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
    orders:[]

  },

  onShow(options){

    // const token = wx.getStorageSync("token");
    // if(!token){
    //   wx.navigateTo({
    //     url: '/pages/auth/index'
    //   });
    //   return;
    // }
    
    // 获取当前小程序的页面栈 数组 长度最大是10个页面
    let pages = getCurrentPages();
    // 数组中 索引最大的页面就是当前页面
    let currentPages = pages[pages.length-1];
    
    // 获取url上的type参数
    const {type} = currentPages.options;
    // 激活选中页面标题
    this.changeTitleByIndex(type - 1);
    this.getOrders(type);
  },
  // 获取订单列表的方法
  async getOrders(type){
    const res = await request({url:"/my/orders/all",data:{type}});
    this.setData({
      orders:res.orders.map(v=>({...v,create_time_cn:(new Date(v.create_time*1000).toLocaleString())}))
    })
  },
  // 根据标题索引来激活选中标题数组
  changeTitleByIndex(index){
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail;
    this.changeTitleByIndex(index);
    // 重新发送请求
    this.getOrders(index+1);
  }
  
})