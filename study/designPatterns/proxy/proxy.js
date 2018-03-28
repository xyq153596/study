let num = 0;
let time = undefined;
let state = true;
let result = document.getElementById('result');
document.getElementById('test').addEventListener('click', e => {
  proxyAddNum();
})

function addNum() {
  result.innerHTML = ++num;
}

function proxyAddNum() {
  if (state) {
    addNum();
    state = false;
    return;
  }
  if (time) return;
  time = window.setTimeout(() => {
    window.clearTimeout(time);
    state = true;
    time = null;
  }, 1000)

}