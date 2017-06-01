// 中间价
module.exports = (options) => {
  return function* test(next) {

    yield next;
  }
}