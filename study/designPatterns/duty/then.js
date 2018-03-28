function t0(price) {
  let newPrice = 100;
  console.log('售价100')
  return newPrice;
}

function t1(price) {
  console.log('涨价10')
  return price + 10;
}

function t2(price) {
  console.log('降价20')
  return price - 20;
}

function t3(price) {
  console.log('免费了')
  return price * 0;
}


function test(defaultValue, tasks) {

  return new Promise((resolve, reject) => {
    let idx = 0;

    function next(data) {
      if (idx < tasks.length) {
        Promise.resolve(tasks[idx](data)).then(data => {
          idx++;
          next(data);
        });

      } else {
        resolve(data);
      }
    }
    next(defaultValue);
  })
}

// test([t0, t1, t2, t3]).then(res => {
//   console.log('最终价格：' + res);
// })

test(200, [t1, t2, t3]).then(res => {
  console.log('最终价格：' + res);
})