/**
 * 指令处理集合
 */
const Watcher = require('./Watcher')
class CompileUtil {

    text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    }

    html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    }

    model(node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        let self = this;
        let val = self._getVmVal(vm, exp);
        node.addEventListener('input', e => {
            let newVal = e.target.value;
            if (val === newVal) return;
            self._setVmVal(vm, exp, newVal);
            val = newVal;
        });
    }

    class(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    }

    bind(node, vm, exp, dir) {
        let updaterFn = updater[dir + 'Updater'];
        updaterFn && updaterFn(node, this._getVmVal(vm, exp));
        new Watcher(vm, exp, function (value, oldValue) {
            updaterFn && updaterFn(node, value, oldValue);
        })
    }

    /**
     * 事件处理
     * 
     * @param {any} node 
     * @param {VM} vm 
     * @param {any} exp 
     * @param {String} dir 
     * @memberof CompileUtil
     */
    eventHandler(node, vm, exp, dir) {
        const eventType = dir.split(':')[1];
        const fn = vm.$options.methods && vm.$options.methods[exp];
        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }

    _getVmVal(vm, exp) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k) {
            val = val[k];
        });
        return val;
    }

    _setVmVal(vm, exp, value) {
        var val = vm;
        exp = exp.split('.');
        exp.forEach(function (k, i) {
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
}

let updater = {
    textUpdater(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    htmlUpdater(node, value) {
        node.innerHTML = typeof value === 'undefined' ? '' : value;
    },
    classUpdater(node, value, oldValue) {
        let className = node.className;
        className = className.replace(oldValue, '').replace(/\s$/, '');

        let space = className && String(value) ? ' ' : '';
        node.className = className + space + value;
    },
    modelUpdater(node, value, oldValue) {
        node.value = typeof value === 'undefined' ? '' : value;
    }
}

module.exports = CompileUtil;