let s = '萨杜卡按都看2 i 去啊喂丢內肯起你i 去呢扽 儿女情饿电脑课禁区内可能企鹅看年轻肯去看你都看內可能请客你看见去年科技青年  框架内情况年轻困认可纪念卡能 👀内容框架内框架内口难开纪念卡句卡3卡把卡3不认可白开2白 4👀3白卡并 ';
console.log('indexOf', s.indexOf(4))
console.log('replace', s.replace(/卡/g, "--草泥马--"))

let o1 = JSON.parse('{"p":5}', function (k, v) {
  if (k === '') return v;
  return v * 2
});
console.log(o1);

/**
 * replacer方法必须要返回值
 */
let o2 = JSON.stringify({
  a: 1,
  b: 2
}, function (k, v) {
  if (v > 1) {
    return undefined;
  } else {
    return v;
  }
})
console.log(o2);