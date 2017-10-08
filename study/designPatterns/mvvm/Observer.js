const Dep = require('./Dep')

class Observer {
    constructor(data) {
        if (!data || typeof data !== 'object') {
            return;
        }
        this.data = data;
        this.walk(data);
    }
    walk(data) {
        let self = this;
        Object.keys(data).forEach(key => {
            self.convert(key, data[key]);
        })
    }
    convert(key, val) {
        this.defineReactive(this.data, key, val);
    }
    defineReactive(data, key, val) {
        let self = this;
        let dep = new Dep();
        let childObj = self.observe(val);

        Object.defineProperty(data, key, {
            enumerable: true,
            configurable: false,
            get() {
                if (Dep.target) {
                    dep.depend();
                }
                return val;
            },
            set(newVal) {
                if (newVal === val) {
                    return;
                }
                val = newVal;
                childObj = self.observe(newVal);
                dep.notify();
            }
        })
    }
    observe(val) {
        if (!val || typeof val !== 'object') {
            return;
        }
        return new Observer(val);
    }
}
module.exports = Observer;