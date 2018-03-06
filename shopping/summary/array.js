Array.prototype._foreach = function (func, _this) {
    var arr = this;//foreach的this,arr

    for (var index = 0, len = arr.length; index < len; index++) {
        func(arr[index], index, arr);
    }

    func = func.bind(_this);//改变func的this 默认指向window 严格模式下undefined
    func();
    func.apply(_this, [arr[index], index, arr]);
    func.call(_this, arr[index], index, arr);
}

Array.prototype._map = function (func, _this) {
    var arr = this;
    var newarr = [];
    for (var index = 0, len = arr.length; index < len; index++) {
        newarr.push(func(arr[index], index, arr))
    }

    func = func.bind(_this);//改变func的this 默认指向window 严格模式下undefined
    func();
    func.apply(_this, [arr[index], index, arr]);
    func.call(_this, arr[index], index, arr);
    

    return newarr;
}

Array.prototype._filter = function (func, _this) {
    var arr = this;
    var newarr = [];
    for (var index = 0, len = arr.length; index < len; index++) {
        if (func(arr[index], index, arr)) {
            newarr.push(arr[index]);
        }
    }

    func = func.bind(_this);//改变func的this 默认指向window 严格模式下undefined
    func();
    func.apply(_this, [arr[index], index, arr]);
    func.call(_this, arr[index], index, arr);

    return newarr;
}

Array.prototype._some = function (func, _this) {
    var arr = this;
    var newarr = [];

    for (var index = 0, len = arr.length; index < len; index++) {
        func = func.bind(_this);//改变func的this 默认指向window 严格模式下undefined
        func(arr[index], index, arr);
        func.apply(_this, [arr[index], index, arr]);
        func.call(_this, arr[index], index, arr);
        if (func(arr[index], index, arr)) {
            return true;
        }
    }
    return false;
}

Array.prototype._every = function (func, _this) {
    var arr = this;
    var newarr = [];

    for (var index = 0, len = arr.length; index < len; index++) {
        func = func.bind(_this);//改变func的this 默认指向window 严格模式下undefined
        func(arr[index], index, arr);
        func.apply(_this, [arr[index], index, arr]);
        func.call(_this, arr[index], index, arr);
        if (!func(arr[index], index, arr)) {
            return false;
        }
    }
    return true;
}

var a = [1, 2, 3, 4, 5];
var result = a._every(function (x, s, f) {
    return x > 0;
})

console.log(result)
