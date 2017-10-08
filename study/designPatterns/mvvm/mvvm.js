const Compile = require('./Compile')
const Observer = require('./Observer')
const Watcher = require('./Watcher')


class MVVM {
    constructor(options) {
        this.$options = options || {};
        let data = this._data = this.$options.data;
        let self = this;

        let observer = new Observer();
        Object.keys(data).forEach(key => {
            self._proxyData(key);
        })

        this._initComputed();
        observer.observe(data, this);

        this.$compile = new Compile(options.el || document.body, this);
    }


    /**
     * 监控数据
     * 
     * @param {any} key 
     * @param {any} cb 
     * @param {any} options 
     * @memberof Mvvm
     */
    $watch(key, cb, options) {
        new Watcher(this, key, cb);
    }

    _proxyData(key, setter, getter) {
        let self = this;
        setter = setter ||
            Object.defineProperty(self, key, {
                configurable: false,
                enumerable: true,
                get() {
                    return self._data[key];
                },
                set(newVal) {
                    self._data[key] = newVal;
                }
            })
    }

    /**
     * 初始化computed 属性
     * 
     * @memberof Mvvm
     */
    _initComputed() {
        let self = this;
        let computed = this.$options.computed;
        if (typeof computed === 'object') {
            Object.keys(computed).forEach(key => {
                Object.defineProperty(self, key, {
                    get: typeof computed[key] === 'function' ? computed[key] : computed[key].get,
                    set() {}
                })
            })
        }
    }
}

module.exports = MVVM;