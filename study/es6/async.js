async function t1(params) {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {

      resolve(1)
    }, 2000);
  })
}
async function t2(params) {
  return await 2;
}
async function t3(params) {
  return await 3;
}

async function main(params) {

  let a1 = await t1();
  let a2 = await t2();
  let a3 = await t3();
  // console.log(t1())
  return a1 + a2 + a3;
}

main().then(val => {
  console.log(val);
})