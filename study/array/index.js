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

let a = [];
let val = 2;

function test(a) {
  return function (a) {
    return a;
  };
}

function test1(a) {
  return function (a) {
    return a + 1;
  };
}

function test2(a) {
  return a + 2;
}

async function name(val) {
  val = await Promise.resolve(val);
  val = await Promise.resolve(val + 1);
  val = await Promise.resolve(val + 2);
  return val;
}
let i = name(2);
i.then(res => {
  console.log(res);
})

console.log(test2(test1(test(2))))

a.push(test);
// a.push(test1);
a.push(test2);

a.forEach(item => {
  val = item(val);
})



console.log(val);