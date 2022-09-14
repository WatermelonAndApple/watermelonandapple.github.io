
//一言开发者中心:语句接口:  https://developer.hitokoto.cn/
//获取名人名言
let MRMY=null;//接受名言数据
function getMingRenMinYan(){
    /*
a	动画
b	漫画
c	游戏
d	文学
e	原创
f	来自网络
g	其他
h	影视
i	诗词
j	网易云
k	哲学
l	抖机灵
    */

   let url="https://v1.hitokoto.cn?c=a"
    axios({
    method:'get',
    url:url,
    }).then((res)=>{
    //接受返回的数据
    MRMY={
        sentence: res.data.hitokoto,//句子
        originateFrom: res.data.from //来源,出处
    }
    //改变首页的句子
    displayMRMY();
    }).catch((err)=>{
    //错误
    console.log(err)
    })
}
//执行函数获取名名言
getMingRenMinYan()
//将获取到的名言显示在圆圈中心
function displayMRMY(){
    let h3=document.querySelector("#home-info  .wrap h3");
    let h5=document.querySelector("#home-info  .wrap h5");
    if(h3){
        h3.innerText=MRMY.sentence;
    }
    if(h5){
        h5.innerText="---《"+MRMY.originateFrom+"》";  
    }
}




