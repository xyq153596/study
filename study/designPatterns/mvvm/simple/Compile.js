const Watcher = require('./Watcher')
let $elm;
let timer = null;

/**
 * 视图更新方法的绑定
 */
const CompilerUtils = {
    bind(node, vm, exp, dir) {
        let updaterFn = updater[dir + 'Updater'];
        let val = this._getVmVal(vm, exp);

        updaterFn && updaterFn(node, val);

        new Watcher(vm, exp, (value, oldValue) => {
            updaterFn && updaterFn(node, value, oldValue)
        })
    },
    html(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },
    text(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    model(node, vm, exp) {
        this.bind(node, vm, exp, 'model');
        let self = this;
        let val = this._getVmVal(vm, exp);
        node.addEventListener('input', event => {
            let newVal = event.target.value;
            $elm = event.target;

            if (val === newVal) return;

            clearTimeout(timer);
            timer = setTimeout(() => {
                self._setVmVal(vm, exp, newVal);
                val = newVal;
            })
        })
    },
    eventHandler(node, vm, exp, dir) {
        let eventType = dir.split(':')[1];
        let fn = vm.$options.methods && vm.$options.methods[exp];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },
    _getVmVal(vm, exp) {
        let val = vm;
        let exps = exp.split('.');
        exps.forEach(key => {
            key = key.trim();
            val = val[key];
        })
        return val;
    },
    _setVmVal(vm, exp, newVal) {
        let val = vm;
        let exps = exp.split('.');

        exps.forEach((key, index) => {
            key = key.trim();
            if (index < exps.length - 1) {
                val = val[key];
            } else {
                val[key] = newVal;
            }
        })
    }
}

/**
 * 更新方法类
 */
const updater = {
    htmlUpdater(node, value) {
        node.
        innerHTML = typeof value === 'undefined' ? '' : value;
    },
    textUpdater(node, value) {
        node.textContent = typeof value === 'undefined' ? '' : value;
    },
    modelUpdater(node, value, oldValue) {
        if ($elm === node) {
            return false;
        }
        $elm = undefined;
        node.value = typeof value === 'undefined' ? '' : value;
    }
}
/**
 * dom解析类
 * dom转化成fragment
 * 解析element节点
 * 解析text节点
 * 
 * @class Compile
 */
class Compile {
    /**
     * Creates an instance of Compile.
     * @param {element} el 
     * @param {any} vm 
     * @memberof Compile
     */
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);

        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el);
            this.compileElement(this.$fragment);
            this.$el.appendChild(this.$fragment);
        }
    }

    /**
     * 将node转换成Fragment
     * 
     * @returns 
     * @memberof Compile
     */
    nodeToFragment(el) {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }

    /**
     * 开始解析dom
     * 
     * @param {any} el 
     * @memberof Compile
     */
    compileElement(el) {
        let self = this;
        let childNodes = el.childNodes;

        [...childNodes].forEach(node => {
            let text = node.textContent; //得到文本节点
            let reg = /\{\{((?:.|\n)+?)\}\}/; //匹配{{}}
            if (self.isElementNode(node)) { //如果是元素节点
                self.compile(node)
            } else if (self.isTextNode(node) && reg.test(text)) { //如果是文本节点
                self.compileText(node, RegExp.$1); //RegExp.$1 匹配第一个括号的值
            }
            //如果有子节点，就递归解析
            if (node.childNodes && node.childNodes.length) {
                self.compileElement(node);
            }
        })
    }

    /**
     * 解析elementNode
     * 
     * @param {any} node 
     * @memberof Compile
     */
    compile(node) {
        let self = this;
        let nodeAttrs = node.attributes; //得到节点属性
        [...nodeAttrs].forEach((attr) => {
            let attrName = attr.name; //属性名 v-test
            let dir = attrName.substring(2);//得到 test

            if (self.isDirective(attrName)) {
                let exp = attr.value; //属性值

                if (self.isEventDirective(dir)) {
                    CompilerUtils.eventHandler(node, self.$vm, exp, dir);
                } else {
                    CompilerUtils[dir] && CompilerUtils[dir](node, self.$vm, exp);
                }

                node.removeAttribute(attrName);
            }
        })
    }
    /**
     * 解析textNode
     * 
     * @param {any} node 
     * @param {any} exp 
     * @memberof Compile
     */
    compileText(node, exp) {
        CompilerUtils.text(node, this.$vm, exp);
    }
    /**
     * 是否是指令
     * 
     * @param {any} attr 
     * @returns 
     * @memberof Compile
     */
    isDirective(attr) {
        return attr.indexOf('v-') === 0
    }
    /**
     * 是否是事件指令
     * 
     * @param {any} dir 
     * @returns 
     * @memberof Compile
     */
    isEventDirective(dir) {
        return dir.indexOf('on') === 0
    }
    /**
     * 是否是文本节点
     * 
     * @param {any} node 
     * @returns 
     * @memberof Compile
     */
    isTextNode(node) {
        return node.nodeType === 3;
    }

    /**
     * 是否是元素节点
     * 
     * @param {any} node 
     * @returns 
     * @memberof Compile
     */
    isElementNode(node) {
        return node.nodeType === 1;
    }
}

module.exports = Compile;