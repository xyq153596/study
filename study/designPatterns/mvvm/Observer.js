const dep = require('./Dep')
/**
 * 监控对象及子对象
 * @param {*} data 
 */
function Observe(data) {
    if (!data || typeof data !== 'object') {
        return;
    }
    // 取出所有属性遍历
    Object.keys(data).forEach(function (key) {
        defineReactive(data, key, data[key]);
    });
};

/**
 * 添加监控数据
 * @param {*} data 
 * @param {*} key 
 * @param {*} val 
 */
function defineReactive(data, key, val) {
    let dep = new dep();
    observe(val); // 监听子属性
    Object.defineProperty(data, key, {
        enumerable: true, // 可枚举
        configurable: false, // 不能再define
        get: function () {
            return val;
        },
        set: function (newVal) {
            if (val === newVal) return
            val = newVal;
            dep.notify(); //数据变动通知所有订阅者
        }
    });
}


// module.exports = Observe;