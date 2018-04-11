function throttle(fn) {
  let delay = 500;
  let timer;

  return function () {
    const _self = this;
    const args = arguments;
    if (!timer) {
      timer = setTimeout(function () {
        fn.apply(_self, args)
        timer = null;
      }, delay);

    }
  }
}

function isSameObject(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

var a = {
  a: 1,
  b: 3
}
var b = {
  a: 1,
  b: 2
}


console.log(isSameObject(a, b))

function cloneObject(obj) {
  if (typeof obj === "object") {
    if (obj.constructor === Array) {
      var newArr = [];
      for (var i = 0; i < obj.length; i++) newArr.push(cloneObject(obj[i]));
      return newArr;
    } else {
      var newObj = {};
      for (var key in obj) {
        newObj[key] = this.cloneObject(obj[key]);
      }
      return newObj;
    }
  } else {
    return obj;
  }
}

console.log(cloneObject({
  a: 1,
  b: function () {}
}))

var test = function () {
  console.log(this.a);
}


function testBind(target) {
  const _self = this;
  const args = Array.prototype.slice.apply(arguments, [1]);
  return function () {
    return _self.apply(target, args);
  }
}