// function move(arr) {
//     for (var i = 0; i < 3; i++) {
//         if (arr[i]) {
//             if (!arr[i + 1]) {//i+1不存在
//                 arr[i + 1] = arr[i];
//                 arr[i] = null;
//                 for (var j = 0; j < 3; j++) {
//                     if (arr[j]) {
//                         if (!arr[j + 1]) {//i+1不存在
//                             arr[j + 1] = arr[j];
//                             arr[j] = null;
//                             for (var k = 0; k < 3; k++) {
//                                 if (arr[k]) {
//                                     if (!arr[k + 1]) {//i+1不存在
//                                         arr[k + 1] = arr[k];
//                                         arr[k] = null;
//                                     }
//                                 }
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
//     return arr;
// }

// function move(arr){
//     for(var i = 0; i < 3; i++){
//         if(arr[i]){
//             if(!arr[i+1]){
//                 arr[i+1] = arr[i];
//                 arr[i] = null;
//                 move(arr);
//             }
//         }
//     }
//     return arr;
// }

// function merge(arr){
//     for(var i = 3; i > 0; i--){
//         if(arr[i]){
//             if(arr[i-1]){
//                 if(arr[i] === arr[i-1]){
//                     arr[i] = arr[i]*2;
//                     arr[i-1] = null;
//                     move(arr);
//                 }
//             }
//         }
//     }
//     return arr;
// }

// var arr1 = [2, null, 2, null];
// move(arr1);
// console.log(merge(arr1));

// var arr2 = [2, 2, 2, null];
// move(arr2);
// console.log(merge(arr2));

// var arr3 = [1,2,3,4,5]
// arr3.reverse();
// console.log(arr3)

function randomFun(m){
    var index1 = Math.floor(Math.random() * n);
    var index2 = Math.floor(Math.random() * n);
    if(index1 === index2){
        index1 = Math.floor(Math.random() * n);
        index2 = Math.floor(Math.random() * n);
    }
}
















































// for (var j = 0; j < 3; j++) {
//     if (arr[j]) {
//         if (!arr[j + 1]) {//i+1不存在
//             arr[j + 1] = arr[j];
//             arr[j] = null;
//         }
//     }
// }



















// function merge(arr) {
//     for (var i = 0; i < 3; i++) {
//         if (arr[i]) {
//             if (!arr[i + 1]){
//                 arr[i + 1] = arr[i];
//                 arr[i] = null;
//                 for (var j = 3; j > 0; j--) {
//                     if (arr[j] === arr[j - 1]) {
//                         arr[j] = arr[j] * 2;
//                         for(var k = 0; k < 3; k++){
//                             if(arr[k] === arr[k+1]){
//                                 arr[k+1] = arr[k];
//                                 arr[k] = null;
//                                 console.log(arr)
//                                 return arr;
//                             }
//                         }
//                     }
//                 }
//             }
//         }
//     }
// }

// var arr = [2,2,undefined,undefined];
// console.log(merge(arr));
