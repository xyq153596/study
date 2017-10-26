const Dep = require('./Dep')

/**
 * 订阅者类
 * 
 * @class Watcher
 */
class Watcher {
    /**
     * Creates an instance of Watcher.
     * @param {Vue} vue实例 
     * @param {any} expOrFn 
     * @param {Function} cb 回调方法
     * @memberof Watcher
     */
    constructor(vm, expOrFn, cb) {

        this.cb = cb;
        this.vm = vm;
        this.expOrFn = expOrFn; //todo
        this.depIds = {}; //todo
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn);
        }
        this.value = this.get();
    }

    update() {
        this.run();
    }

    run() {
        let value = this.get();
        let oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            this.cb.call(this.vm, value, oldVal);
        }
    }

    get() {
        Dep.target = this;
        const value = this.getter.call(this.vm, this.vm);
        Dep.target = null;
        return value;
    }

    parseGetter(exp) {
        /**
         * 匹配头部非字符，尾部任意字符
         * @te，*er 等
         */
        if (/[^\w.$]/.test(exp)) return;
        let exps = exp.split('.');
        return function (obj) {
            for (let i = 0, len = exps.length; i < len; i++) {
                if (!obj) return;
                obj = obj[exps[i]];
            }
            return obj;
        }
    }
    addDep(dep) {
        if (!this.depIds.hasOwnProperty(dep.id)) {
            dep.addSub(this);
            this.depIds[dep.id] = dep;
        }
    }
}
module.exports = Watcher;