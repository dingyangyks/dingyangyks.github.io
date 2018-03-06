!(function () {
    var board = [];

    function randn(n) {
        return Math.floor(Math.random() * n);
    }

    function init() {
        for (var i = 0; i < 16; i++) {
            board[i] = undefined;
        }

        var index1 = randn(16);
        var index2 = randn(16);
        while (index1 === index2) {
            index1 = randn(16);
            index2 = randn(16);
        }
        board[index1] = Math.random() > 0.3 ? 2 : 4;
        board[index2] = Math.random() > 0.3 ? 2 : 4;

        var main = document.getElementById('main');
        for (var i = 0; i < 16; i++) {
            // 创建格子
            var odiv = document.createElement('div');
            odiv.classList.add('cellbox');
            main.appendChild(odiv);
            if (i === index1 || i === index2) {
                odiv.innerText = board[i];
                odiv.classList.add('num_' + board[i]);
            }
        }

    }

    function move(direction) {
        for (var i = 0; i < 4; i++) {
            var arr = pickBoardData(direction, i);
            arr = shiftAndMerge(arr);
            setBoardData(arr, direction, i);
        }

        function pickBoardData(direction, rowOrCol) {
            var arr = board.filter(function (item, index, arr) {
                if (direction === 'up' || direction === 'down') {
                    if (index % 4 === rowOrCol) {
                        return true;
                    }
                } else if (direction == 'left' || direction === 'right') {
                    if (Math.floor(index / 4) === rowOrCol) {
                        return true;
                    }
                }
            });
            if (direction === 'up' || direction === 'left') {
                arr = arr.reverse();
            }
            return arr;
        }

        function setBoardData(arr, direction, rowOrCol) {
            if (direction === 'up' || direction === 'left') {
                arr = arr.reverse();
            }
            for (var i = 0; i < 16; i++) {
                if (direction === 'up' || direction === 'down') {
                    if (i % 4 === rowOrCol) {
                        board[i] = arr.shift();
                    }
                } else if (direction == 'left' || direction === 'right') {
                    if (Math.floor(i / 4) === rowOrCol) {
                        board[i] = arr.shift();
                    }
                }
            }
        }


        function shift(arr) {
            var emptyIndex = -1;
            for (var i = arr.length - 1; i >= 0; i--) {
                if (emptyIndex === -1 && arr[i] == undefined) {
                    emptyIndex = i;
                }
                if (emptyIndex !== -1 && arr[i] != undefined) {
                    arr[emptyIndex] = arr[i];
                    emptyIndex -= 1;
                    arr[i] = undefined;
                }
            }
            return arr;
        }

        function merge(arr) {
            for (var i = arr.length - 1; i > 0; i--) {
                if (arr[i] == arr[i - 1] && arr[i] !== undefined) {
                    arr[i] = arr[i] * 2;
                    arr[i - 1] = undefined;
                }
            }
            return arr;
        }

        function shiftAndMerge(arr) {
            return shift(merge(shift(arr)));

        }

    }



    function bindEvent() {
        document.addEventListener('keydown', function (event) {
            var keyCode = event.keyCode;
            switch (keyCode) {
                case 37://左
                    move('left');
                    break;
                case 38://上
                    move('up');
                    break;
                case 39://右
                    move('right');
                    break;
                case 40://下
                    move('down');
                    break;
                default:
                    break
            }
            if (isGameOver()) {
                alert('game over!')
            } else {
                addNumber();
                setHTML();
            }

        })
    }

    function isGameOver() {
        if (getEmptyCellIndexArray().length === 0) {
            if (canMerge()) {
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    }

    function canMerge() {
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 4; j++) {
                // hand
                if (board[i * 4 + j] === board[(i + 1) * 4 + j]) {
                    return true;
                }
                if (board[j * 4 + i] === board[j * 4 + i + 1]) {
                    return true;
                }
            }
        }
    }

    function getEmptyCellIndexArray() {
        var avalibleIndexArray = [];
        for (var i = 0; i < 16; i++) {
            if (board[i] == undefined) {
                avalibleIndexArray.push(i);
            }
        }
        return avalibleIndexArray;
    }

    function addNumber() {
        var avalibleIndexArray = getEmptyCellIndexArray();
        var index = avalibleIndexArray[Math.floor(Math.random() * avalibleIndexArray.length)];
        board[index] = Math.random() > 0.3 ? 2 : 4;
    }

    function setHTML() {
        var cells = document.querySelectorAll('.main > .cellbox');
        for (var i = 0; i < 16; i++) {
            var cell = cells[i];
            if (!board[i]) {
                cell.innerText = '';
                cell.className = 'cellbox';
            } else {
                cell.innerText = board[i];
                cell.className = 'cellbox num_' + board[i];
            }
        }
    }


    init();
    bindEvent();
})();





// var elementArr = [];
// window.addEventListener('load', function () {
//     // 初始化 
//     elementArr = init();
//     createNum(elementArr);
//     createNum(elementArr);
//     // 移动
//     controlKey();


//     // console.log(elementArr[0][0].value)


// })

// // 初始化棋盘
// function init() {

//     // 初始化格子
//     for (var i = 0; i < 4; i++) {
//         board[i] = [];
//         for (var j = 0; j < 4; j++) {
//             // 创建格子
//             var odiv = document.createElement('div');
//             odiv.classList.add('cellbox');
//             var main = document.getElementById('main');
//             main.appendChild(odiv);
//             board[i][j] = {
//                 element: odiv,
//                 value: 0
//             };
//         }
//     }
//     return board;
// }

// function createNum(arr) {
//     // 随机产生2或4
//     var startNum = Math.random();
//     // 产生坐标随机数
//     var board_x = Math.floor(Math.random() * 4);
//     var board_y = Math.floor(Math.random() * 4);
//     var currentElement = arr[board_x][board_y];
//     if (currentElement.value !== 0) {
//         createNum(arr);
//         return;
//     }
//     var dom = currentElement.element;
//     var initialNum = startNum > 0.5 ? 4 : 2;
//     dom.classList.add("num_" + initialNum);
//     currentElement.value = initialNum;
//     dom.innerText = initialNum;
// }

// // 操控键盘
// function controlKey() {
//     document.addEventListener('keydown', function (event) {
//         var keyCode = event.keyCode;
//         switch (keyCode) {
//             case 37://左
//                 for (var i = 0; i < 4; i++) {
//                     var arr = getBoderRow(i);
//                     move(arr);
//                     merge(arr);
//                     arr.reverse();
//                     console.log("left:" + arr)
//                 }
//                 break;
//             case 38://上
//                 for (var i = 0; i < 4; i++) {
//                     var arr = getBoderCol(i);
//                     move(arr);
//                     merge(arr);
//                     arr.reverse();
//                     console.log("up:" + arr)
//                 }
//                 break;
//             case 39://右
//                 for (var i = 0; i < 4; i++) {
//                     var arr = getBoderRow(i);
//                     move(arr);
//                     merge(arr);
//                     console.log("right:" + arr)
//                 }
//                 break;
//             case 40://下
//                 for (var i = 0; i < 4; i++) {
//                     var arr = getBoderCol(i);
//                     move(arr);
//                     merge(arr);
//                     changeLocation(arr, i);
//                     // console.log("down:" + arr)
//                 }
//                 break;
//             default:
//                 break
//         }
//     })
// }

// // 移动位置
// function changeLocation(arr, index) {
//     console.log(arr, index);
//     elementArr.forEach(function(item,i) {
//         var dom = item[index].element;
//         if (arr[i] ==0){
//             dom.innerText = '';
//             dom.classList.remove("num_" + item[index].value);
//             item[index].value = 0;
//             return;
//         } 
//         item[index].value = arr[i];
//         dom.innerText = arr[i];
//         dom.classList.add("num_" + item[index].value);
//     }) 
// } 

// // 判断是否可移动
// function moveable(elementArr) {
//     for (var i = 0; i < 4; i++) {
//         for (var j = 0; j < 4; j++) {
//             if (elementArr[i][j].value !== 0) {
//                 // 是否向左
//                 if (j !== 0 && (elementArr[i][j - 1].value === 0 || elementArr[i][j - 1].value === elementArr[i][j].value)) {
//                     return true;
//                 }
//                 // 是否向右
//                 if (j !== 3 && (elementArr[i][j + 1].value === 0 || elementArr[i][j + 1].value === elementArr[i][j].value)) {
//                     return true;
//                 }
//                 // 是否向上
//                 if (i !== 0 && (elementArr[i - 1][j].value === 0 || elementArr[i - 1][j].value === elementArr[i][j].value)) {
//                     return true;
//                 }
//                 // 是否向下
//                 if (i !== 3 && (elementArr[i + 1][j].value === 0 || elementArr[i + 1][j].value === elementArr[i][j].value)) {
//                     return true;
//                 }
//             }
//         }
//     }
// }

// // 获得行
// function getBoderRow(row) {
//     var singleArr = [];
//     if (row !== -1) {

//         for (var i = 0; i < 4; i++) {
//             var x = elementArr[row][i].value;
//             singleArr.push(x);
//         }
//         // singleArr = elementArr[row].map(function(item) {
//         //     return item.value;
//         // })

//     }
//     return singleArr;
// }

// //获得列
// function getBoderCol(column) {
//     if (column !== -1) {
//         var singleArr = [];
//         for (var i = 0; i < 4; i++) {
//             var x = elementArr[i][column].value;
//             singleArr.push(x);
//         }
//     }
//     return singleArr;
// }

// // 移动
// function move(arr) {
//     for (var i = 0; i < 3; i++) {
//         if (arr[i]) {
//             if (!arr[i + 1]) {
//                 arr[i + 1] = arr[i];
//                 arr[i] = 0;
//                 move(arr);
//             }
//         }
//     }
//     return arr;
// }

// // 合并
// function merge(arr) {
//     for (var i = 3; i > 0; i--) {
//         if (arr[i]) {
//             if (arr[i - 1]) {
//                 if (arr[i] === arr[i - 1]) {
//                     arr[i] = arr[i] * 2;
//                     arr[i - 1] = 0;
//                     move(arr);
//                 }
//             }
//         }
//     }
//     return arr;
// }



