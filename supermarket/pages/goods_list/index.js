// pages/goods_list/index.js
/**
 * 用户上滑页面 滚动条触底 开始加载下一页
 *  找到滚动条触底事件，
 *  判断还有没有下一页数据
 *    获取到总页数
 *      总页数=Math.ceil(总条数/页容量)
 *    获取到当前的页码 pagenum
 *    判断当前的页面是否大于或等于 总页数
 *      表示 没有下一页数据
 *  假设没有下一页数据  弹出提示
 *  假设又下一个数据  加载
 *    当前页码++
 *    重新发送请求
 *    数据请求回来  要对data中的数据进行拼接 而不是全部替换
 * 下拉刷新页码
 *  触发下拉刷新事件  页码json中开启配置项
 *  清空数组
 *  页码重置为1
 *  重新发送请求
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
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList:[]
  },
  // 接口要的参数
  QueryParams:{
    query:"",
    cid:"",
    pagenum:1,
    pagesize:10
  },
  // 总页数
  totalPages: 1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid=options.cid||[];
    // this.QueryParams.query=options.query||[];
    this.getGoodsList();
  },
  // 获取商品列表数据
  async getGoodsList(){
    const res = await request({url:"/goods/search",data:this.QueryParams});
    // console.log(res);
    // 获取请求总条数
    const total = res.total;
    // 计算总页数
    this.totalPages = Math.ceil(total/this.QueryParams.pagesize);
    // console.log(this.totalPages);
    this.setData({
      // 拼接的数据
      goodsList:[...this.data.goodsList,...res.goods]
    })
    // 关闭下拉刷新窗口
    wx.stopPullDownRefresh();
  },
  // 标题点击事件 从子组件传递过来
  handleTabsItemChange(e){
    // 获取被点击的标题索引
    const {index} = e.detail;
    // 修改原数组
    let {tabs} = this.data;
    tabs.forEach((v,i)=>i===index?v.isActive=true:v.isActive=false);
    // 赋值到data中
    this.setData({
      tabs
    })
  },



  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    // 重置数组
    this.setData({
      goodsList:[]
    })
    // 重置页码
    this.QueryParams.pagenum=1;
    // 发送请求
    this.getGoodsList();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // 判断是否有下一页数据
    if(this.QueryParams.pagenum>=this.totalPages){
      // 没有下一页数据
      wx.showToast({
        title: '到底啦',
        icon: 'success',
        image: '',
        duration: 1500,
        mask: false,
        success: (result)=>{
          
        },
        fail: ()=>{},
        complete: ()=>{}
      });
    }else{
      // 有下一页数据
      this.QueryParams.pagenum++;
      this.getGoodsList();
    }
  }
})