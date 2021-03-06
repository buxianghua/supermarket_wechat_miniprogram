// pages/cart/index.js
/**
 * 1获取用户对小程序所授予获取地址的权限 权限状态 scope
 *    假设用户 点击获取收获地址的提示框 确定 authSetting scope.address
 *     scope 值 true 可以直接调用获取收货地址
 *    假设 用户 点击获取收货地址的提示框 取消
 *    scope 值 false
 *    假设用户 从来没有点击过 收货地址的api
 *    scope undefined 可以直接调用获取收货地址
 *      诱导用户 打开 授权设置页面 当用户重新给予获取地址权限时
 *      获取收货地址
 *   将获取到的收货地址存入本地存储中
 * 2页面加载完毕
 *  onLoad onShow
 *  获取本地存储中的地址数据
 *  把数据 设置给data中的一个变量
 * 3 onshow
 *   1 回到商品详情页面 第一次添加商品的时候 手动添加了属性
 *   2 num=1
 *   3 checked = true
 *  1 获取缓存中的购物车数组
 *  2 把购物车实现 数据的展示
 * 4 全选实现 数据的展示
 *  1 onshow 获取缓存中的购物车数组
 *  2 根据购物车中的商品数据 都返回true 才全选
 * 5 价格和总数量
 *  1 都需要商品被选中 才计算
 *  2 获取购物车数组
 *  3 遍历
 *  4 判断商品是否被选中
 *  5 总价格 += 商品单价*数量
 *  6 总数量 += 商品数量
 *  7 把计算后的价格和数量返回到data中
 * 6 商品的选中
 *  1 绑定change事件
 *  2 获取到被修改的商品对象
 *  3 商品对象选中状态 取反
 *  4 重新填充回data中和缓存中
 *  5重新计算全选，总价格。。。
 * 7 全选与反选
 *  1 全选复选框绑定事件
 *  2 获取data中的全选变量 allchecked
 *  3 直接取反 allChecked = !allChecked
 *  4 遍历购物车数组 让里面商品选中状态 跟随全选按钮改变
 *  5 把购物车数组和 allChecked重新设置回data 设置回缓存
 * 8 商品数量的编辑
 *  1 + — 按钮 绑定同一个点击事件 区分关键 自定义属性
 *    + +1 - -1
 *  2 传递被点击的商品ID goods_id
 *  3 获取data中的购物车数组 来获取需要被修改的商品对象
 *  4 直接修改商品对象的num
 *    当数量为1时，再点击-1  弹窗提示 询问用户 是否要删除 
 *                                  确定则 删除  取消 啥都不做
 *  5 把cart数组 重新设置回缓存和data中
 * 9 点击结算
 *  判断有没有收货地址信息
 *  判断用户有没有选购商品
 *  经过以上验证 跳转到 支付页面
 */
import { getSetting, chooseAddress, openSetting, showModal, showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from "../../lib/runtime/runtime";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },

  // 点击收货地址
  async bandleChooseAddress() {
    // 获取 权限状态
    // wx.getSetting({
    //   success: (result) => {
    //     // 获取权限状态 只要发现有一些 属性名有怪异 要使用 [] 形式来获取属性值
    //     const scopeAddress = result.authSetting["scope.address"];
    //     if (scopeAddress === true || scopeAddress === undefined) {
    //       // 调用小程序内置API获取收获地址
    //       wx.chooseAddress({
    //         success: (result1) => {
    //           console.log(result1);
    //         },
    //         fail: () => { },
    //         complete: () => { }
    //       });
    //     } else {
    //       // 用户以前拒绝过授予权限 诱导获取权限
    //       wx.openSetting({
    //         success: (result) => {
    //           // 调用 收货地址代码
    //           wx.chooseAddress({
    //             success: (result2) => {
    //               console.log(result2);
    //             },
    //             fail: () => { },
    //             complete: () => { }
    //           });
    //         },
    //         fail: () => { },
    //         complete: () => { }
    //       });
    //     }
    //   },
    //   fail: () => { },
    //   complete: () => { }
    // });

    try {
      // 获取 权限状态
      const res1 = await getSetting();
      const scopeAddress = res1.authSetting["scope.address"];
      // 判断 权限状态
      if (scopeAddress === false) {
        // 先诱导用户获取权限
        await openSetting();
      }
      // 调用获取收货地址 api
      let address = await chooseAddress();
      address.all = address.provinceName+address.cityName+address.countyName+address.detailInfo;
      // 存入到缓存中
      wx.setStorageSync("address", address);
    } catch (error) {
      console.log(error);
    }

  },
  // 商品的选中
  handeItemChange(e){
    // 获取被修改的商品ID
    const goods_id = e.currentTarget.dataset.id;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到被修改的商品对象
    let index = cart.findIndex(v=>v.goods_id===goods_id);
    // 选中状态取反
    cart[index].checked=!cart[index].checked;
    this.setCart(cart);
  },
  // 设置购物车状态同时 计算底部工具栏数据 全选 总价格 购买数量
  setCart(cart){
    
    let allChecked=true;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      if(v.checked){
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
      }else{
        allChecked=false;
      }
    })
    // 判断数组是否为空
    allChecked = cart.length!=0?allChecked:false;
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    });
    wx.setStorageSync("cart",cart);
  },
  // 商品全选功能
  handeItemAllCheck(){
    // 获取data中数据
    let {cart,allChecked} = this.data;
    // 修改值
    allChecked=!allChecked;
    // 循环修改cart中的值
    cart.forEach(v=>v.checked=allChecked);
    // 把修改后的值重新填充回data和缓存
    this.setCart(cart);
  },
  // 商品数量编辑功能
  async handletItemNumEdit(e){
    // 获取传递来的参数
    const {operation,id}=e.currentTarget.dataset;
    // 获取购物车数组
    let {cart} = this.data;
    // 找到需要修改的商品的索引
    const index = cart.findIndex(v=>v.goods_id===id);
    // 判断是否要执行删除
    if(cart[index].num===1&&operation===-1){
      // 弹窗提示
      // wx.showModal({
      //   title: '提示',
      //   content: '您是否要删除此商品',
      //   success: (res) =>{
      //     if(res.confirm){
      //       cart.splice(index,1);
      //       this.setCart(cart);
      //     }else if(res.cancel){
      //       console.log("取消");
      //     }
      //   }
      // })
      const res = await showModal({content:"您是否要删除此商品"});
      if(res.confirm){
        cart.splice(index,1);
        this.setCart(cart);
      }
    }else{
      // 修改数量
      cart[index].num+=operation;
      // 设置回缓存和data中
      this.setCart(cart);
    }
  },
  // 点击空购物车
  async handleEmpty(){
    await showModal({content:"您还没买东西呢"});
  },
  // 点击结算
  async handlePay(){
    // 判断收获地址
    const {address, totalNum} = this.data;
    if(!address.userName){
      await showToast({title:"您还没有选择收货地址"});
      return;
    }
    
    // 判断用户有没有选购商品
    if(totalNum===0){
      await showToast({title:"您还没有选购商品"});
      return;
    }
    // 跳转到 支付页面
    wx.navigateTo({
      url: '/pages/pay/index'
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
    // 获取缓存中的收获地址信息
    const address = wx.getStorageSync('address');
    // 获取缓存中的购物车数据
    const cart = wx.getStorageSync("cart")||[];
    this.setData({address});
    this.setCart(cart);
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