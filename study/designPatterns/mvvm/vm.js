/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const Dep = __webpack_require__(1)
class Watcher {
    constructor(vm, expOrFn, cb) {
        this.cb = cb;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.depIds = {};
        if (typeof expOrFn === 'function') {
            this.getter = expOrFn;
        } else {
            this.getter = this.parseGetter(expOrFn);
        }
        // this.update = this.update;
        this.value = this.get();
    }

    update() {
        this.run();
    }

    run() {
        const value = this.get();
        const oldVal = this.value;
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
        if (/[^\w.$]/.test(exp)) return;
        const exps = exp.split('.');
        return function (obj) {
            for (let i = 0, len = exp.length; i < len; i++) {
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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

let uid = 0;
class Dep {
    constructor() {

        this.id = uid++;
        this.subs = []; //存放订阅者容器
    }
    addSub(sub) {
        this.subs.push(sub) //添加订阅者
    }
    depend() {
        Dep.target.addDep(this);
    }
    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    }
    notify() {
        this.subs.forEach(sub => {
            if (sub.hasOwnProperty('update')) {
                sub.update();
            } else {
                console.error('sub has no update function.');
            }
        })
    }
}
Dep.target = null;
module.exports = Dep;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const MVVM = __webpack_require__(3)

var vm = new MVVM({
    el: '#mvvm-app',
    data: {
        someStr: 'hello ',
        className: 'btn',
        htmlStr: '<span style="color: #f00;">red</span>',
        child: {
            someStr: 'World !'
        }
    },
    computed: {
        getHelloWord: function () {
            return this.someStr + this.child.someStr;
        }
    },
    methods: {
        clickBtn: function (e) {
            var randomStrArr = ['childOne', 'childTwo', 'childThree'];
            this.child.someStr = randomStrArr[parseInt(Math.random() * 3)];
        }
    }
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Compile = __webpack_require__(4)
const Observer = __webpack_require__(6)
const Watcher = __webpack_require__(0)


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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const CompileUtil = __webpack_require__(5)
const compileUtil = new CompileUtil();
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
            this.init();
            this.$el.appendChild(this.$fragment);
        }
    }

    /**
     * 解析dom
     * 
     * @memberof Compile
     */
    init() {
        this.compileElement(this.$fragment);
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
        let childNodes = el.childNodes;
        let self = this;
        [...childNodes].forEach(node => {
            let text = node.textContent;
            let reg = /\{\{(.*)\}\}/;
            if (self.isElementNode(node)) {
                self.compile(node)
            } else if (self.isTextNode(node) && reg.test(text)) {
                self.compileText(node, RegExp.$1); //RegExp.$1 匹配第一个括号的值
            }
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
        let nodeAttrs = node.attributes;
        let self = this;
        [...nodeAttrs].forEach((attr) => {
            let attrName = attr.name;
            if (self.isDirective(attrName)) {
                let exp = attr.value;
                let dir = attrName.substring(2);
                if (self.isEventDirective(dir)) {
                    compileUtil.eventHandler(node, self.$vm, exp, dir);
                } else {
                    compileUtil[dir] && compileUtil[dir](node, self.$vm, exp);
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
        compileUtil.text(node, this.$vm, exp);
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

/**
 * 指令处理集合
 */
const Watcher = __webpack_require__(0)
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

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

const Dep = __webpack_require__(1)

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

/***/ })
/******/ ]);