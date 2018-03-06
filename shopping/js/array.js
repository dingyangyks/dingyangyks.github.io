Array.prototype._forEach = function (func, _this) {
    array = this;
    // if (_this !== undefined) {
    //    func = func.bind(_this);
    // }
    for (var index = 0; index < array.length; index++) {
        item = array[index];
        func.apply(_this || null,[item, index, array]);
    }
}

// var arr = [1, 2, 3, 4, 5];
// var arr1 = [10, 20, 30, 40, 50]
// var result = arr._forEach(function (item, index, array) {
//     item++;
//     console.log(item);
// })
// var result1 = arr.forEach(function(item, index, array){
//     item++;
//     console.log(item);
// },arr1)


Array.prototype._map = function (func) {
    array = this;
    var newArr = [];
    for (var index = 0; index < array.length; index++) {
        item = array[index];
        var temp = func(item, index, array);
        temp && newArr.push(temp);
    }
    return newArr;
}
// var temp = [1, 2, 3]
// temp._forEach(function(a,b,c){
//     console.log(a)
//     console.log(b)
//     console.log(c)
//     console.log(this.a)

// },{a: '666'})
// temp.forEach(function (a, b) {
//     console.log(a)
//     console.log(b)
//     console.log(c)
//     console.log(this.a)

// },{a: '666'})

// var arr = [1,2,3,4,5,50];
// var result = arr._map(function(item, index, array){
//     return item * 2;
// })
// console.log(result)

// var result1 = arr.map(function(item, index, array){
//     return item * 2;
// })
// console.log(result1)

Array.prototype._filter = function (func) {
    array = this;
    var newArr = [];
    for (var index = 0; index < array.length; index++) {
        item = array[index];
        if (func(item, index, array)) {
            newArr.push(item);
        }
    }
    return newArr;
}

// var arr = [1,2,3,4,5,50];
// var result = arr._filter(function(item, index, array){
//     return (item > 3);
// })
// console.log(result)

// var result1 = arr.filter(function(item, index, array){
//     return (item > 2);
// })
// console.log(result1)

Array.prototype._some = function (func) {
    var array = this;
    for (var index = 0; index < array.length; index++) {
        if(func(array[index], index, array)){
            return true;
        };
    }
    return false;
}

// var arr = [8,1, 2, 3, 4, 15];
// result = arr._some(function (item, index, array) {
//     return (item > 9);
// })
// console.log(result)

// result1 = arr.some(function (item, index, array) {
//     return (item > 9);
// })
// console.log(result1)

Array.prototype._every = function (func) {
    array = this;
    for (var index = 0; index < array.length; index++) {
        if(!func(array[index], index, array)) {
            return false;
        };
    }
    return true;
}

// var arr = [8,1, 2, 3, 4, 15];
// result = arr._every(function (item, index, array) {
//     return (item > 9);
// })
// console.log(result)

// result1 = arr.every(function (item, index, array) {
//     return (item > 9);
// })
// console.log(result1)


var o = {};
[1,2,3].forEach(function(item,index,arr){
    this[index] = item;
},o);
console.log(o);


obj = {
    method: function(){
        var a = [1,2,3];
        a.forEach(function(item){
            this.arr.push(item);
        },this)
        return this.arr;
    },
    arr: [1,2,3,4]
}
console.log(obj.method());