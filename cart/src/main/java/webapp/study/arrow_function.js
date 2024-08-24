// 水果清單
var fruits = ['蘋果', '香蕉', '橘子', '蘋果', '香蕉'];

// 傳統寫法
function traditionalWay(arr) {
    var result = '';
    for (var i = 0; i < arr.length; i++) {
        result += arr[i] + ', ';
    }
    return result.slice(0, -2); // 移除最後的逗號和空格
}

// 現代寫法
const modernWay = (arr) => arr.join(', ');

// 現代寫法 reduce
const number_reduce = () => {
	arr = [1, 2, 3, 4, 5];
	sum = arr.reduce((acc, num) => {
		subtotal = acc + num;
		return subtotal;
	}, 0);
	return sum; // 輸出: 15
}

// 現代寫法：計算每種水果的數量
/*
acc['蘋果'] = undefined; // 初始值為 undefined
acc['蘋果'] = (acc['蘋果'] || 0) + 1;
// 這裡等價於 acc['蘋果'] = (undefined || 0) + 1;
// 因為 undefined 是假值，所以 (undefined || 0) 返回 0
// 最終結果：acc['蘋果'] = 0 + 1 = 1
*/
const modernWay2 = arr => {
    const countMap = arr.reduce((acc, fruit) => {
		//console.log("acc[" + fruit + "] = " + acc[fruit]);
        acc[fruit] = (acc[fruit] || 0) + 1;
        //console.log("acc[" + fruit + "] = " + acc[fruit]);
        return acc;
    }, {}); // {} 是初始值是一個空物件, 所以預設 acc 是一個空物件
    return Object.keys(countMap).map(fruit => `${fruit}: ${countMap[fruit]}`).join(', ');
};

console.log("傳統寫法：" + traditionalWay(fruits));
console.log("現代寫法：" + modernWay(fruits));
console.log("現代寫法 reduce：" + number_reduce());
console.log("現代寫法：" + modernWay2(fruits));

