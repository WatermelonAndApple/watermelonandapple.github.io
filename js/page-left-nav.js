//文章右侧的标题导航栏
let titleNav = []

/**
 * 获取文章 的几级标题
 * @param  hType 
 * @returns 
 */
function getTitleByHType(hType) {
    let hTitle = document.getElementsByTagName(hType);
    return hTitle;
}

//获取文章的每小节的标题
function getBlogTitle(t) {
    //获取1-3级标题
    let h1s = getTitleByHType('h1');
    let h2s = getTitleByHType('h2');
    let h3s = getTitleByHType('h3');
    //获取每一级标题的具体文字内容
    let h1List = getTitleContentList(h1s);
    let h2List = getTitleContentList(h2s);
    let h3List = getTitleContentList(h3s);
    // 将标题重新组合到一起形成标题导航栏的数据格式
    let h2Map = new Map();
    h2List.forEach((e) => {
        //以几级标题为key，整个数据为value
        h2Map.set(e.substr(0, 3), {
            h2: e,
            h3: []
        });
    })
    //将三级标题加入到其对应的二级标题中
    h3List.forEach((e) => {
        h2Map.get(e.substr(0, 3)).h3.push(e);
    })
    let h1Map = new Map();
    h1List.forEach((e) => {
        //以几级标题为key，整个数据为value
        h1Map.set(e.substr(0, 1), {
            h1: e,
            h2: []
        });
    })
    for (let v of h2Map.values()) {
        h1Map.get(v.h2.substr(0, 1)).h2.push(v);
    }

    //获取到最终转换为导航栏的多级标题数据格式
    for (let v of h1Map.values()) {
        titleNav.push(v)
    }
}
//获取每一级标题内容的集合
function getTitleContentList(hs) {
    let hList = [];
    for (let i = 0, len = hs.length; i < len; i++) {
        if (hs[i].childNodes[1]) {
            //获取每个标题的具体文字内容
            // hList.push(hs[i].childNodes[1].data);
            hList.push(hs[i].id);
        }
    }
    return hList;
}
//创建文章导航栏
function createTitleNav() {
    getBlogTitle();
    // console.log(titleNav);
    //获取存放标题的div父容器
    let div = document.querySelector('#content-left-nav')
    titleNav.forEach((e1) => {
        //1级标题导航
        let a1 = document.createElement('a')
        div.appendChild(a1);
        a1.href = `#${e1.h1}`;
        a1.innerText = `${e1.h1}`
        if (e1.h2) { //如果存在二级标题
            e1.h2.forEach((e2) => {
                let a2 = document.createElement('a')
                a2.href = `#${e2.h2}`;
                a2.innerText = `${e2.h2}`
                div.appendChild(a2);
                if (e2.h3) { //如果存在三级级标题
                    e2.h3.forEach((e3) => {
                        let a3 = document.createElement('a')
                        a3.href = `#${e3}`;
                        a3.innerText = `${e3}`
                        a3.style.textIndent="4em";
                        div.appendChild(a3);
                    })
                }
                a2.style.textIndent="2em";
            })
        }
    })
}
//生成文章左侧的标题导航栏
createTitleNav()