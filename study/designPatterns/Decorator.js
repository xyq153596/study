/**
 * Decorator 装饰者模式
 */

function Book() {
    this.cost = function () {
        return 100;
    }
}

/**
 * 装饰者
 */
function addMoney(book) {
    let cost = book.cost();
    book.cost = function () {
        return cost + 10;
    }
}

function addMoney2(book) {
    let cost = book.cost();
    book.cost = function () {
        return cost + 20;
    }
}

const book = new Book();
addMoney(book);
addMoney2(book);

console.log(book.cost());

/**
 * 接口的实现
 */
function Interface(name) {
    if (arguments.length !== 2) throw new Error('创建的接口不符合标准,必须有两个参数,第二个参数是接口的方法!!!');
    this.name = name;
    this.methods = [...arguments[1]];
}

let Game = new Interface('game', ['play', 'stop', 'win']);

let P = function (name) {
    this.name = name;
}

P.prototype.play = function () {};
P.prototype.stop = function () {};
P.prototype.win = function () {};

let p = new P('傻逼');

Interface.checkImplements = function (objs) {
    let args = [...arguments];
    if (args < 2) throw new Error('参数要至少两个');
}