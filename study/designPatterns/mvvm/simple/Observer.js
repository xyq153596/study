const Dep = require('./Dep')

/**
 * 1.数据劫持
 * 2.监听数据的属性变更
 * 3.变动时notify订阅者更新视图
 * 
 * @class Observer
 */
class Observer {

    constructor(value = {}) {

        this.value = value;
        this.dep = new Dep();
        this.walk(value);
    }

    /**
     * 监听对象数据
     * 
     * @param {any} obj 
     * @memberof Observer
     */
    walk(obj) {
        Object.keys(obj).forEach(key => {
            defineReactive(obj, key, obj[key]);
        })
    }
}

/**
 * 监听单个数据
 * 
 * @param {any} data 
 * @param {any} key 
 * @param {any} val 
 * @returns 
 */
function defineReactive(data, key, val) {
    // 实例化发布者
    let dep = new Dep();

    /**
     * 递归监听子属性
     */
    let childObj = observe(val);

    Object.defineProperty(data, key, {
        enumerable: true,
        configurable: false,
        get() {
            if (Dep.target) {
                // 添加订阅者
                dep.depend();
            }
            return val;
        },
        set(newVal) {
            if (newVal === val) {
                return;
            }
            val = newVal;
            childObj = observe(newVal);
            /**
             * 通知whaters更新视图
             */
            dep.notify();
        }
    })
}

function observe(val) {
    if (!val || typeof val !== 'object') {
        return;
    }
    return new Observer(val);
}

module.exports = Observer;