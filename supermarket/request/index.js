// 异步请求记录
let ajaxTimes=0;
// 封装请求代码
export const request=(params)=>{
    // 判断 url中是否带有my 请求是否私有的路径 带上Header token
    let header={...params.header};
    if(params.url.includes("/my/")){
        // 拼接Header 带上 token
        header["Authorization"] = wx.getStorageSync("token");
    }

    ajaxTimes++;
    // 显示加载中 效果
    wx.showLoading({
        title: "加载中",
        mask: true
    });
    // 定义公共的url
    const baseUrl = "https://api-hmugo-web.itheima.net/api/public/v1";
    // 成功执行，失败执行
    return new Promise((resolve,reject)=>{
        wx.request({
            ...params,
            header: header,
            url:baseUrl+params.url,
            success:(result)=>{
                resolve(result.data.message);
            },
            fail:(err)=>{
                reject(err);
            },
            complete:()=>{
                ajaxTimes--;
                if(ajaxTimes==0){
                    // 关闭等待图标
                wx.hideLoading();
                }
                
            }
          });
    })
}