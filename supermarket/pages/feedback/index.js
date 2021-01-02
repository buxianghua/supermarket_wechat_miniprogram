// pages/feedback/index.js
/**
 * 1 点击+触发tap事件
 *    调用小程序内置的 选择图片的 api
 *    获取到 图片的路径 数组  
 *    把图片路径 存到 data中
 *    页面获取数据 图片数组 循环显示 自定义组件
 * 2 点击 自定义 组件
 *    获取被点击的元素的索引
 *    获取data中的图片数组
 *    根据索引 数组中删除对应的元素
 *    把数组重新设置回data中
 * 3 点击提交
 *    获取文本内容
 *      data中定义变量 存放输入内容
 *      文本域中  绑定 输入事件 事件触发 把输入框的 值 存入到变量中
 *    对内容合法性验证
 *    验证通过 用户选择图片 上传 返回图片外网连接
 *        遍历图片数组
 *        挨个上传
 *        自己维护图片数组 存放 图片上传的外网连接
 *    文本域 和 外网图片路径 一起提交 到服务器 
 *    请求页面清空
 *    返回上一级页面
 * 
 */
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "产品意见",
        isActive: true
      },
      {
        id: 1,
        value: "投诉",
        isActive: false
      }
    ],
    // 被选中的图片数组
    chooseImgs:[],
    // 文本域内容
    textVal:""
  },
  // 外网的图片路径数组
    UpLoadImgs:[],
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
// 点击+选择图片
handleChooseImg(){
  // 调用小程序内置的选择图片api
  wx.chooseImage({
    count: 9,
    sizeType: ['original','compressed'],
    sourceType: ['album','camera'],
    success: (result)=>{
      
      this.setData({
        chooseImgs:[...this.data.chooseImgs,...result.tempFilePaths]
      })
    }
  })
},
// 点击 自定义图片组件
handleRemoveImg(e){
  // 获取被点击的数组索引
  const {index} = e.currentTarget.dataset;
  // 获取data中的图片数组
  let {chooseImgs} = this.data;
  // 删除元素
  chooseImgs.splice(index,1);
  this.setData({
    chooseImgs
  })
},
// 文本域的输入事件
handleTextInput(e){
  this.setData({
    textVal:e.detail.value
  })
},
// 提交按钮的点击
handleFormSubmit(){
  // 获取文本域的内容
  const {textVal,chooseImgs} = this.data;
  // 合法性检测
  
  if(!textVal.trim()){
    // 不合法
    wx.showToast({
      title: '输入内容不合法',
      icon: 'none',
      mask: true
    });
    return;
  }
  // 正在上传
  wx.showLoading({
    title: 正在提交,
    mask: true
  });
  // 判断上传文件中有没有图片
  if(chooseImgs != 0){
    // 准备上传图片 到服务器
    chooseImgs.forEach((v,i)=>{
    // api不支持同时上传
    wx.uploadFile({
      url: 'https://images.ac.cn/',
      filePath: v,
      name: "file",
      formData: {},
      success: (result)=>{
        let url = JSON.parse(result.data).url;
        this.UpLoadImgs.push(url);
        // 所有的图片上传完毕后才触发
        if(i===chooseImgs.length-1){
          wx.hideLoading();
          console.log("把文本图片和外网数组提交到后台");
          // 提交成功
          // 重置页面
          this.setData({
            textVal:"",
            chooseImgs:[]
          })
          // 返回上一个页面
          wx.navigateBack({
            delta: 1
          });
        }
      }
    });
  })

  }else{
    wx.hideLoading();
    wx.navigateBack({
      delta: 1
    });
  }

}


})