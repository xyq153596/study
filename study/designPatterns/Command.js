/**
 * Command.js 模式
 * 优点:解耦api调用
 */
let CarManager = {
    requestInfo: function (model, id) {
        console.log(`为了${model},id为${id}`);
    },
    buyCar: function (model, id) {
        console.log(`我买了${model},id为${id}的车`);
    }
}

CarManager.execute = function (name) {
    return CarManager[name] && CarManager[name].apply(this, Array.prototype.slice.call(arguments, 1));
}

CarManager.execute('requestInfo', "sb", '1323');