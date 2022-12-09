//文章右侧的标题导航栏

let title = []
// let subtitle = []
//获取文章的每小节的标题
function getBlogTitle(t) {
    let tmp = []
    for (let i = 0; i < t.length; i++) {
        tmp.push(t[i].id)
    }
    return tmp
}
//获取二级标题
title = getBlogTitle(document.getElementsByTagName('h3'))
let div = document.querySelector('#content-left-nav')
//创建文章导航栏
function createTitleNav() {
    title.forEach((e) => {
        //创建a连接
        let a = document.createElement('a')
        a.href = `#${e}`;
        a.innerText = `${e}`
        div.appendChild(a)
        div.appendChild(document.createElement('br'))
    })
}
createTitleNav()
//返回文章顶部的按钮
window.addEventListener('scroll', () => {
    let top = document.getElementById('go-to-top');
    if (window.scrollY <= 0) {
        top.style.display = 'none' //不显示返回顶部的图标
    } else {
        top.style.display = 'inline-block'; //显示返回顶部的图标
    }
    console.log(window.scrollY)
    top.style.top = window.scrollY + 600 + 'px'
})