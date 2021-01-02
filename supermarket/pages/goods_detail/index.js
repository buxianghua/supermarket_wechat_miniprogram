// 引入用来发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/goods_detail/index.js
/**
 * 1发送请求获取数据
 * 2点击轮播图 预览大图
 *    1给轮播图绑定点击事件
 *    2给调用向程序的api previewImage
 * 3点击加入购物车
 *    先绑定点击事件
 *    获取缓存中的购物车数据 数组形式
 *    先判断 当前商品是否已经在购物车
 *    已经存在 修改商品数据 执行购物车数量++ 重新把购物车数组 填充回缓存中
 *    不存在 则直接给购物车数组添加一个新元素 带上 购买的数量属性 再重新把购物车数组 填充回缓存中
 *    弹窗提示
 * 4商品收藏
 *  1 页面onshow 加载缓存中的商品收藏数据
 *  2 判断当前商品是否被收藏
 *    是 改变页面的图标
 *    否 啥也不做
 *  3 点击商品收藏按钮
 *    判断当前商品是否存在于购物车中
 *    已经存在 把该商品删除
 *    没有 则把商品添加到商品收藏组中 放入缓存
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    // 判断商品是否被收藏过
    isCollect:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages =  getCurrentPages();
    let currentPage = pages[pages.length-1];
    let options = currentPage.options;
    
    const {goods_id} = options;
    
    this.getGoodsDetail(goods_id);



  },
  // 商品对象
  GoodsInfo:{},
  // 获取商品详情数据
  async getGoodsDetail(goods_id){
    const goodsObj = await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo = goodsObj;
    // 获取缓存中的山坡收藏按钮
    let collect = wx.getStorageSync("collect")||[];
    // 判断当前商品是否被收藏
    let isCollect = collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        // iphone部分机型不支持webp图片格式
        // 最好的方法是找后台
        // 临时自己改要确保后台有1.webp => 1.jpg，然后就是替换
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'.jpg'),
        pics:goodsObj.pics
      },
      isCollect
    })
  },
  
  // 点击轮播图放大预览
  handlePrevewImage(e){
    // 构造要预览的图片数组
    const urls = this.GoodsInfo.pics.map(v=>v.pics_mid);
    // 接收传递来的图片url
    const current = e.currentTarget.dataset.url;
    wx.previewImage({
      current,
      urls
    })
  },
  // 点击加入购物车
  handleCartAdd(){
    // console.log("加入购物车");
    // 获取缓存中的购物车 数组
    let cart = wx.getStorageSync('cart')||[];
    // 判断商品对象是否存在于购物车
    let index = cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    if(index===-1){
      // 不存在 第一次添加
      this.GoodsInfo.num = 1;
      this.GoodsInfo.checked=true;
      cart.push(this.GoodsInfo);
    }else{
      // 已经存在于购物车 执行++
      cart[index].num++;
    }
    // 把购物车重新添加回缓存中
    wx.setStorageSync("cart", cart);
    // 弹窗提示
    wx.showToast({
      title: '加入成功',
      icon: 'success',
      // ture防止用户多次点击按钮
      mask:true
    })
  },
  // 点击收藏事件
  handleCollect(){
    let isCollect = false;
    // 获取缓存中的商品收藏数组
    let collect = wx.getStorageSync("collect")||[];
    // 判断该商品是否被收藏过
    let index = collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
    // 当Index != -1表示被收藏过
    if(index !== -1){
      // 能找到已经收藏过了 在数组中删除该商品
      collect.splice(index,1);
      isCollect=false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    }else{
      // 没有收藏过
      collect.push(this.GoodsInfo);
      isCollect=true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }
    // 把数组存入到缓存中
    wx.setStorageSync("collect", collect);
    // 修改data中属性 isCollect
    this.setData({
      isCollect
    })
  }
  
})