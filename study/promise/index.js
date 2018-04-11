Promise.prototype.finally = function (callback) {
  let P = this.constructor;
  return this.then(value => P.resolve(callback()).then(() => value), reason => P.resolve(callback()).then(() => {
    throw reason
  }))
}

Promise.resolve(2).finally(() => {console.log(111) })