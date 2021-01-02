// pages/pay/index.js
/**
 * 1 页面加载的时候
 *   从缓存中获取购物车数据 渲染到页面中
 *     checked=true
 * 2 微信支付
 *  那些账号 可以微信支付
 *    企业账号
 *    企业账号后台给开发者权限 添加白名单
 * 3 支付按钮
 *  1 先判断缓存中是否有token
 *  2 没有 则获取授权
 *  3 有则正常执行
 *  4 完成微信支付
 *  5 手动删除购物车已经买过的商品
 *  6 填充缓存 跳转页面
 */
import { getSetting, chooseAddress, openSetting, showModal, showToast, login,requestPayment } from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
import {request} from "../../request/index.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    cart: [],
    totalPrice: 0,
    totalNum: 0
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
    // 获取缓存中的收获地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    let cart = wx.getStorageSync("cart") || [];
    // 过滤后的购物车数组
    cart = cart.filter(v => v.checked);
    this.setData({ address });

    // 总价格 总数量
    let totalPrice = 0;
    let totalNum = 0;
    cart.forEach(v => {

      totalPrice += v.num * v.goods_price;
      totalNum += v.num;

    })

    this.setData({
      cart,
      totalPrice,
      totalNum,
      address
    });


  },

  // 点击支付
  async handleOroderPay(){
    
    try {
      // 判断缓存中有没有token
    const token = wx.getStorageSync("token");
    // 判断
    if(!token){
      wx.navigateTo({
        url: "/pages/auth/index"
      });
      return;
    }

    // 创建订单
    // const header = {Authorization: token};
    // 准备 请求参数
    const order_price = this.data.totalPrice;
    const consignee_addr = this.data.address.all;
    const cart = this.data.cart;
    let goods = [];
    cart.forEach(v=>goods.push({
      goods_id:v.goods_id,
      goods_number:v.num,
      goods_price:v.goods_price
    }))
    const orderParams = {order_price,consignee_addr,goods};
    // 准备发送请求 获取订单
    const {order_number} = await request({url:"/my/orders/create",method:"POST",data:orderParams});
    // 发起 预支付接口
    const {pay} = await request({url:"/mu/orders/req_unifiedorder",method:"POST",data:{order_number}});
    // 发起微信支付
    await requestPayment(pay);
    // 查询后台 订单状态
    const res = await request({url:"/mu/orders/chkOrder",method:"POST",data:{order_number}});
    await showToast({title:"支付成功"});
    // 手动将购买过的商品在购物车删除
    let newCart = wx.getStorageSync("cart");
    newCart = newCart.filter("cart", newCart);

    // 跳转到订单页面
    wx.navigateTo({
      url: '/pages/order/index'
    });
    } catch (error) {
      await showToast({title:"支付失败"});
      console.log(error);
    }

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