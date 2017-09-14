/**
 * 指令处理集合
 */

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
    }

}