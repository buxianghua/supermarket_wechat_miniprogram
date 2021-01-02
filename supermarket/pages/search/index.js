// pages/search/index.js
/**
 * 1 输入框绑定 值改变事件input事件
 *    1 获取到输入框的值
 *    2 合法判断
 *    3 检查通过 把输入的数据 发送给后台
 *    4 返回的数据打印到页面
 * 3 防抖 定时器 节流
 *    防抖 一般应用于输入框 防止重发数据
 *    节流 一般用于页面下拉和上拉
 *    防止搜索过程中 一致交互
 */
// 引入用来发送请求的方法
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goods:[],
    // 取消 按钮 是否显示
    isFocus:false,
    // 输入框的值
    inputValue:""
  },
  TimeId:-1,
  // 输入框的值改变 就会触发事件
  handleInput(e){
    // 获取输入框的值
    const {value} = e.detail;
    // 检测合法性
    if(!value.trim()){
      this.setData({
        goods:[],
        isFocus:false
      })
      // 值不合法
      return;
    }
    this.setData({
      isFocus:true
    })
    clearTimeout(this.TimeId);
    this.TimeId=setTimeout(() => {
      // 发送请求获取数据
      this.qsearch(value);
    }, 1000);
  },
  // 发送请求获取建议 数据
  async qsearch(query){
    const res = await request({url:"/goods/qsearch",data:{query}});
    console.log(res);
    this.setData({
      goods:res
    })
  },
  // 点击清除
  handleCancel(){
    this.setData({
      inputValue:"",
      isFocus:false,
      goods:[]
    })
  }
})