class Observer {
    constructor(obj) {

        
    }

    observerData(obj, key, val) {
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: false,
            ger() {
                return val;
            },
            set(newVal) {
                console.log('变成了', newVal);
                val = newVal;
            }
        })
        return obj;
    }
}

let o = new Observer()
let obj = {};
o.observerData(obj, 'a', 10);
console.log(obj.a)
module.exports = Observer;