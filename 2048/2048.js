var elementArr = [];
window.addEventListener('load', function () {
    // 初始化 
    elementArr = init();
    createNum(elementArr);
    createNum(elementArr);
    // 移动
    controlKey();


    // console.log(elementArr[0][0].value)


})

// 初始化棋盘
function init() {
    var board = [];
    // 初始化格子
    for (var i = 0; i < 4; i++) {
        board[i] = [];
        for (var j = 0; j < 4; j++) {
            // 创建格子
            var odiv = document.createElement('div');
            odiv.classList.add('cellbox');
            var main = document.getElementById('main');
            main.appendChild(odiv);
            board[i][j] = {
                element: odiv,
                value: 0
            };
        }
    }
    return board;
}

function createNum(arr) {
    // 随机产生2或4
    var startNum = Math.random();
    // 产生坐标随机数
    var board_x = Math.floor(Math.random() * 4);
    var board_y = Math.floor(Math.random() * 4);
    var currentElement = arr[board_x][board_y];
    if (currentElement.value !== 0) {
        createNum(arr);
        return;
    }
    var dom = currentElement.element;
    var initialNum = startNum > 0.5 ? 4 : 2;
    dom.classList.add("num_" + initialNum);
    currentElement.value = initialNum;
    dom.innerText = initialNum;
}

// 操控键盘
function controlKey() {
    document.addEventListener('keydown', function (event) {
        var keyCode = event.keyCode;
        switch (keyCode) {
            case 37://左
                for (var i = 0; i < 4; i++) {
                    var arr = getBoderRow(i);
                    move(arr);
                    merge(arr);
                    arr.reverse();
                    changeLocation(arr, i);
                    console.log("left:" + arr)
                }
                break;
            case 38://上
                for (var i = 0; i < 4; i++) {
                    var arr = getBoderCol(i);
                    move(arr);
                    merge(arr);
                    arr.reverse();
                    changeLocation(arr, i);
                    console.log("up:" + arr)
                }
                break;
            case 39://右
                for (var i = 0; i < 4; i++) {
                    var arr = getBoderRow(i);
                    move(arr);
                    merge(arr);
                    changeLocation(arr, i);
                    console.log("right:" + arr)
                }
                break;
            case 40://下
                for (var i = 0; i < 4; i++) {
                    var arr = getBoderCol(i);
                    move(arr);
                    merge(arr);
                    changeLocation(arr, i);
                    // console.log("down:" + arr)
                }
                break;
            default:
                break
        }
    })
}

// 移动位置
function changeLocation(arr, index) {
    console.log(arr, index);
    elementArr.forEach(function(item,i) {
        var dom = item[index].element;
        if (arr[i] ==0){
            dom.innerText = '';
            dom.classList.remove("num_" + item[index].value);
            item[index].value = 0;
            return;
        } 
        item[index].value = arr[i];
        dom.innerText = arr[i];
        dom.classList.add("num_" + item[index].value);
    }) 
} 

// 判断是否可移动
function moveable(elementArr) {
    for (var i = 0; i < 4; i++) {
        for (var j = 0; j < 4; j++) {
            if (elementArr[i][j].value !== 0) {
                // 是否向左
                if (j !== 0 && (elementArr[i][j - 1].value === 0 || elementArr[i][j - 1].value === elementArr[i][j].value)) {
                    return true;
                }
                // 是否向右
                if (j !== 3 && (elementArr[i][j + 1].value === 0 || elementArr[i][j + 1].value === elementArr[i][j].value)) {
                    return true;
                }
                // 是否向上
                if (i !== 0 && (elementArr[i - 1][j].value === 0 || elementArr[i - 1][j].value === elementArr[i][j].value)) {
                    return true;
                }
                // 是否向下
                if (i !== 3 && (elementArr[i + 1][j].value === 0 || elementArr[i + 1][j].value === elementArr[i][j].value)) {
                    return true;
                }
            }
        }
    }
}

// 获得行
function getBoderRow(row) {
    var singleArr = [];
    if (row !== -1) {

        for (var i = 0; i < 4; i++) {
            var x = elementArr[row][i].value;
            singleArr.push(x);
        }
        // singleArr = elementArr[row].map(function(item) {
        //     return item.value;
        // })

    }
    return singleArr;
}

//获得列
function getBoderCol(column) {
    if (column !== -1) {
        var singleArr = [];
        for (var i = 0; i < 4; i++) {
            var x = elementArr[i][column].value;
            singleArr.push(x);
        }
    }
    return singleArr;
}

// 移动
function move(arr) {
    for (var i = 0; i < 3; i++) {
        if (arr[i]) {
            if (!arr[i + 1]) {
                arr[i + 1] = arr[i];
                arr[i] = 0;
                move(arr);
            }
        }
    }
    return arr;
}

// 合并
function merge(arr) {
    for (var i = 3; i > 0; i--) {
        if (arr[i]) {
            if (arr[i - 1]) {
                if (arr[i] === arr[i - 1]) {
                    arr[i] = arr[i] * 2;
                    arr[i - 1] = 0;
                    move(arr);
                }
            }
        }
    }
    return arr;
}



