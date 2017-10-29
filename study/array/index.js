let array = [1, 2, 5, 6, 3, 23, 53, 27, 1, 24, 5, 3]

/**
 * 取最大值
 */
let val = array.reduce((a, b) => {
  return a > b ? a : b;
})
console.log(val)
console.log(Math.max.apply(this, array))

/**
 * 排序
 */
console.log(array.sort((a, b) => {
  return a - b;
}))

/**
 * 数组去重
 */
console.log(Array.from(new Set(array)))
let obj = {}
array.forEach((val, index, array) => {
  obj[val] = val;
})
console.log(Object.keys(obj));