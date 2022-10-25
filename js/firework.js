// 鼠标点击特效,,鼠标点击页面使页面点击部分出现反馈效果
//颜色
const colors = ['#ff9a9e', '#a18cd1', '#a1c4fd', '#ABD9FF', '#6E85B7', '#FFEEEE', '#D8E9A8', '#F1EBBB'];
//将canvas放入body中
const canvas = document.createElement("canvas");
canvas.id = "firework";
document.body.appendChild(canvas);
canvas.setAttribute("style", "width:100%;height:100%;position:fixed;top:0;left:0;pointer-events: none;z-index:9999;");
//创建pointer并将其放入到body中
const pointer = document.createElement("span");
pointer.classList.add("pointer");
document.body.appendChild(pointer);

// const V_MAX=8;//最大速度,Ball中的vy，vx不可以超过它
// const g= -0.9;//重力加速度
// const BALL_COUNT=5;
let ctx;//canvas
//小球数组。
let balls = [];
//是否长按
let longPressed = false;
let longPress;
//加速度
let multiplier = 0;
let width, height;
let orgin;
let normal;

//鼠标点击特效
function clickEffect() {
    //小球
    if (canvas.getContext && window.addEventListener) {
        ctx = canvas.getContext("2d");
        updateSize(); //更新图形的状态信息，小球的圆心位置（x,y）以及半径信息
        window.addEventListener('resize', updateSize, false);
        loop(); //绘制图形
        window.addEventListener('mousedown', function (e) {
            pushBalls(randBetween(10, 20), e.clientX, e.clientY);
            document.body.classList.add("is-pressed");
            longPress = setTimeout(function () {
                document.body.classList.add("is-longpress");
                longPressed = true;
            }, 500);
        }, false);
        window.addEventListener('mouseup', function (e) {
            clearInterval(longPress);
            if (longPressed == true) {
                document.body.classList.remove("is-longpress");
                pushBalls(randBetween(50 + Math.ceil(multiplier), 100 + Math.ceil(multiplier)), e.clientX, e.clientY)
                longPressed = false;
            }
            document.body.classList.remove("is-pressed");
        }, false);
        window.addEventListener("mousemove", function (e) {
            let x = e.clientX;
            let y = e.clientY;
            pointer.style.top = y + "px";
            pointer.style.left = x + "px";
        }, false)
    } else {
        console.log("你的浏览器不支持canvas和addEventListener");
    }

};

function updateSize() {
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = window.innerWidth + 'px';
    canvas.style.height = window.innerHeight + 'px';
    ctx.scale(2, 2);
    width = (canvas.width = window.innerWidth);
    height = (canvas.height = window.innerHeight);
    orgin = {
        x: width / 2,
        y: height / 2
    };
    normal = {
        x: width / 2,
        y: height / 2
    };
};
class Ball {
    constructor(x = orgin.x, y = orgin.y) {
        // 小球的圆心所在的位置
        this.x = x; //小球当前所在的位置
        this.y = y;
        //移动的方向
        this.angle = Math.PI * 2 * Math.random();
        //设置加速度
        if (longPressed == true) {
            this.multiplier = randBetween(12 + multiplier, 16 + multiplier);
        } else {
            this.multiplier = randBetween(6,8);
        }
        // x,y方向的速度
        this.vx = (this.multiplier + Math.random() * 0.5) * Math.cos(this.angle);
        this.vy = (this.multiplier + Math.random() * 0.5) * Math.sin(this.angle);
        //圆的半径
        this.r = randBetween(6, 8) + 3 * Math.random();
        this.color = colors[Math.floor(Math.random() * colors.length)]
    }
    //更新数据
    update() {
        this.x += this.vx - normal.x;
        this.y += this.vy - normal.y;
        normal.x = -2 / window.innerWidth * Math.sin(this.angle);
        normal.y = -2 / window.innerHeight * Math.cos(this.angle);
        this.r -= 0.6;
        this.vx *= 0.9;
        this.vy *= 0.9;
    }
}

//绘制图形
function loop() {
    ctx.fillStyle = "rgba(255,255,255,0)";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.r < 0) continue;
        ctx.fillStyle = b.color;
        ctx.beginPath();
        //绘制圆
        // ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2, false);
        // ctx.fill();
        //绘制三角形
        ctx.moveTo(b.x-b.r,b.y-b.r);
        ctx.lineTo(b.x+b.r,b.y-b.r);
        ctx.lineTo(b.x-b.r,b.y+b.r);
        //绘制正方形
        // ctx.moveTo(b.x - b.r, b.y - b.r);
        // ctx.lineTo(b.x + b.r, b.y - b.r);
        // ctx.lineTo(b.x - b.r, b.y + b.r);
        // ctx.lineTo(b.x + b.r, b.y + b.r); 
        // 绘制不规则图形
        // ctx.moveTo(b.x - b.r, b.y - b.r);
        // ctx.lineTo(b.x - b.r * Math.random(), b.y + b.r * Math.random());
        // ctx.lineTo(b.x + b.r * Math.random(), b.y + b.r * Math.random());
        // ctx.lineTo(b.x + b.r * Math.random(), b.y - b.r * Math.random());
        ctx.fill();
        //更新数据（可以理解为使小球向前移动）
        b.update();
    }
    if (longPressed == true) {
        multiplier += 0.1;
    } else if (!longPressed && multiplier >= 0) {
        multiplier -= 0.3;
    }
    //使小球消失
    removeBall();
    requestAnimationFrame(loop);
};

//将数据放入数组
function pushBalls(count = BALL_COUNT, x = orgin.x, y = orgin.y) {
    for (let i = 0; i < count; i++) {
        balls.push(new Ball(x, y));
    }
};

//书籍生成一个不在     min ~  min+max 之间的一个数
function randBetween(min, max) {
    return Math.floor(Math.random() * max) + min;
}
//移除小球
function removeBall() {
    for (let i = 0; i < balls.length; i++) {
        let b = balls[i];
        if (b.x + b.r < 0 || b.x - b.r > width || b.y + b.r < 0 || b.y - b.r > height || b.r < 0) {
            balls.splice(i, 1);
        }
    }
};
//调用点击特效函数
clickEffect();