// 运动函数
function move(ele, target, fn) {
    // 遍历对象
    let count = 0;
    for (let k in target) {
        // 对象有5个键
        // 开启5个定时器
        // 如何捕获到运动结束
        // 最后一个定时器结束，运动结束
        
        count++
        const timer = setInterval(() => {
          let current;
          if(k === 'opacity') {
              current = window.getComputedStyle(ele)[k] * 100
          } else {
              current = parseInt(window.getComputedStyle(ele)[k])
          }
          let distance = (target[k] - current) / 10
          distance = distance > 0 ? Math.ceil(distance):Math.floor(distance)
          if (current === target[k]) {
              clearInterval(timer)
              count--
              if (count === 0) {
                  fn()
              }
          } else {
              
              if (k === 'opacity') {
                  ele.style[k] = (current + distance) / 100
              } else {
                  ele.style[k] = current + distance + 'px'
              }
          }
        }, 15)
      
    }
}

// 随机数字函数
function randomNum(min,max) {
    var re = Math.floor(Math.random() * (max - min + 1))
    var re1 = re + min 
    return re1
}
// 随机函数
function randomColor() {
    var arr = []
    for (var i = 0; i < 3; i++) {
        arr.push(randomNum(0, 255))
    }
    var color = "rgb(" + arr.join(',') + ")"
    console.log(color)
    return color
}

// 防抖 
function debounce(fn, delay = 600) {
    let timer = null
    return function () {
        if (timer) clearTimeout
        timer = setTimeout(() => {
            fn()
        }, delay)
    }
}

// 混乱字符特效
class Randomchar {
    constructor (ele) {
        this.ele = document.querySelector(ele)
        this.timer = null
        this.flag = true
        this.arr = ['-', '+', '=', '#', '!', '$', '&', '%', '>', '<', '?']
        this.hover()
    }
    
    hover() {
        // 保存 this 指向
        const _this = this;
        [...this.ele.children].forEach((item) => {
          item.onmouseover = function () {
            if (!_this.flag) return;
            _this.flag = false;
            // 改变 this 指向 传入保存的 this 指向 _this
            _this.changeText.call(this, this.innerText, _this);
          };
        });
    }
    // 多少字 有 多少效果
    changeChar(str) {
        let res = str.split("");
          // 当文字小于四个时 全部都给特效
          if (res.length <= 4 && res.length > 0) {
            for (let i = 0; i < res.length; i++) {
              res[i] = this.arr[Math.floor(Math.random() * this.arr.length)];
            }
          } else if (res.length === 5) {
            // 当文字等于 5 时 改 后 3 个
            for (let i = res.length - 1; i > 1; i--) {
              res[i] = this.arr[Math.floor(Math.random() * this.arr.length)];
            }
          } else if (res.length > 5) {
            // 当文字大于 五 个时
            for (let i = res.length - 1; i > 1; i--) {
              res[i] = this.arr[Math.floor(Math.random() * this.arr.length)];
            }
          }
          // 拼接 返回
          return res.join("");
    }
    // 效果
    changeText(str, _this) {
        let lev = 0
        _this.timer = setInterval(() => {
            lev++
            this.innerText = _this.changeChar(str)
            if (lev > 10) {
                clearInterval(_this.timer)
                this.innerText = str
                _this.flag = true
            }
        }, 80)
    }
}


