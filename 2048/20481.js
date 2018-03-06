window.addEventListener('load', function () {
    init();
    controlKey();
})

// 初始化棋盘
var board = [];
for (var i = 0; i < 16; i++) {
    board[i] = undefined;
}

function init() {
    // 创建两个不相同的随机数
    var index1 = randomFun(16);
    var index2 = randomFun(16);
    while (index1 === index2) {
        index1 = randomFun(16);
        index2 = randomFun(16);
    }

    board[index1] = Math.random() > 0.5 ? 2 : 4;
    board[index2] = Math.random() > 0.5 ? 2 : 4;

    // 创建格子
    for (var i = 0; i < 16; i++) {
        var odiv = document.createElement('div');
        odiv.classList.add('cellbox');
        var main = document.getElementById('main');
        main.appendChild(odiv);

        // 把随机出来的数赋给制定的格子
        if (i === index1 || i === index2) {
            odiv.innerText = board[i];
            odiv.classList.add('num_' + board[i],'donghua');
        }
    }

}

// 初始化时随机产生两个不同数字
function randomFun(n) {
    return Math.floor(Math.random() * n);
}


//给按键绑定事件
function controlKey() {
    document.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 37://左
                move("left");
                break;
            case 38://上
                move("up");
                break;
            case 39://右
                move("right");
                break;
            case 40://下
                move("down");
                break;
            default:
                return;
        }
        if (gameOver()) {
            var wrap = document.getElementById('wrap');
            wrap.style.display = 'block';

            var endScore = document.getElementById('endscore');
            endScore.innerHTML = num;

            var restartBtn = document.getElementById('restart');
            restartBtn.addEventListener('click', clear);
        } else {
            // 随机出现一个数组
            addNum();
            // 数组移动完成后 把数组的对应到html
            setHTML();
        }
    })
}

// 移动函数
var num;
function move(direction) {
    var score = document.getElementById('curScore');
    //便利所有行或者列  方向由参数传入,不会重复
    for (var i = 0; i < 4; i++) {
        var arr = choose(direction, i);
        shiftAndMerge(arr);
        adjusData(direction, arr, i);
    }

    // 计分
    num = total(board);
    score.innerHTML = "score:" + num;
}

// 挑选单排或者单列的数组  重点！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！！
function choose(direction, rowOrCol) {
    var arr = [];//存储返回的新数组
    for (var i = 0; i < board.length; i++) {
        if (direction === 'up' || direction === 'down') {
            if (i % 4 === rowOrCol) {//获取列
                arr.push(board[i])
            }
        } else if (direction === 'left' || direction === 'right') {
            if (Math.floor(i / 4) === rowOrCol) {//获取行
                arr.push(board[i])
            }
        }
    }
    if (direction === 'up' || direction === 'left') {
        arr = arr.reverse();
    }
    return arr;
}

function shift(arr) {
    var emptyMark = -1;
    for (var i = arr.length - 1; i >= 0; i--) {
        if (arr[i] === undefined && emptyMark === -1) {
            emptyMark = i;
        }
        if (arr[i] !== undefined && emptyMark !== -1) {
            arr[emptyMark] = arr[i];
            arr[i] = undefined;
            emptyMark -= 1;
        }
    }
    return arr;
}

function merge(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        if (arr[i] && arr[i - 1] === arr[i]) {
            arr[i] = arr[i] * 2;
            arr[i - 1] = undefined;
        }
    }
    return arr;
}

function shiftAndMerge(arr) {
    return shift(merge(shift(arr)));
}

// 处理数组，使得他们都想最后一个合并 调整up和left时的数组顺序
function adjusData(direction, arr, rowOrCol) {
    if (direction === 'up' || direction === 'left') {
        arr = arr.reverse();
    }
    // 把得到的单行单列数组传给board
    for (var i = 0; i < board.length; i++) {
        if (direction === 'up' && i % 4 === rowOrCol) {//获取列
            board[i] = arr.shift();
        } else if (direction === 'down' && i % 4 === rowOrCol) {//获取列
            board[i] = arr.shift();
        } else if (direction === 'left' && Math.floor(i / 4) === rowOrCol) {//获取行
            board[i] = arr.shift();
        } else if (direction === 'right' && Math.floor(i / 4) === rowOrCol) {//获取列
            board[i] = arr.shift();
        }
    }
}

function setHTML() {
    var odiv = document.getElementsByClassName('cellbox');
    for (var i = 0; i < odiv.length; i++) {
        var cell = odiv[i];
        if (!board[i]) {
            cell.innerText = '';
            cell.className = 'cellbox';
        } else {
            cell.innerText = board[i];
            cell.className = 'cellbox num_' + board[i];
        }
    }
}


// 创建数字之前先要选出棋盘上哪些格子是空的
function findEmptyIndex() {
    var emptyArr = [];
    for (var i = 0; i < board.length; i++) {
        if (!board[i]) {
            emptyArr.push(i);
        }
    }
    return emptyArr;
}

// 每次按键随机创建一个随机数
function addNum() {
    var acceptBlankArr = findEmptyIndex();
    // 接收到的数组里面存储着空白格子的下标,
    // 随机取一个acceptBlankArr自己的下标,给对应的空白给子赋值
    var num = Math.floor(Math.random() * acceptBlankArr.length);
    var index = acceptBlankArr[num];
    board[index] = Math.random() > 0.5 ? 2 : 4;
}

// 判断游戏是否结束 结束的条件：棋盘没有空白格子 相邻的两个元素互不相等即不可合并
function gameOver() {
    if (findEmptyIndex().length === 0 && !convertible()) {
        return true;
    } else {
        return false;
    }
}

// 判断是否合并
function convertible() {
    for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 4; j++) {
            // 横向
            if (board[i * 4 + j] === board[(i + 1) * 4 + j]) {
                return true;
            }
            // 纵向
            if (board[j * 4 + i] === board[j * 4 + i + 1]) {
                return true;
            }
        }
    }
}

// restart事件
function clear() {
    wrap.style.display = 'none';
    var score = document.getElementById('curScore');
    score.innerHTML = "score:0";

    for (var i = 0; i < 16; i++) {
        board[i] = undefined;
    }

    var index1 = randomFun(16);
    var index2 = randomFun(16);

    while (index1 === index2) {
        index1 = randomFun(16);
        index2 = randomFun(16);
    }

    board[index1] = Math.random() > 0.5 ? 2 : 4;
    board[index2] = Math.random() > 0.5 ? 2 : 4;

    var odiv = document.getElementsByClassName('cellbox');

    for (var i = 0; i < odiv.length; i++) {
        odiv[i].className = "cellbox";
        odiv[i].innerHTML = "";
        // 把随机出来的数赋给制定的格子
        if (i === index1 || i === index2) {
            odiv[i].innerText = board[i];
            odiv[i].classList.add('num_' + board[i], 'donghua');
        }
    }
}

// 总分
function total(arr) {
    var num = 0;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== undefined) {
            num = num + arr[i];
        }
    }
    return num;
}

// 动画
// function appear(i){
//     var appearCell = board[i];
//     appearCell.animate({
//         width: "100px",
//         height: "100px",
//     }, 50);                                                   
// }


































