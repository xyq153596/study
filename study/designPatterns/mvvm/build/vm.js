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

/***/ }),
/* 1 */
/***/ (function(module, exports) {

let uid = 0;
/**
 * 发布者类
 * 1.添加订阅者
 * 2.删除订阅者
 * 3.通知订阅者
 * @class Dep
 */
class Dep {
    constructor() {
        this.id = uid++;
        this.subs = []; //存放订阅者容器
    }
    getLength() {
        return this.subs.length;
    }
    //添加订阅者
    addSub(sub) {
        this.subs.push(sub)
    }
    // 添加watcher
    depend() {
        Dep.target.addDep(this);
    }
    // 删除订阅者
    removeSub(sub) {
        const index = this.subs.indexOf(sub);
        if (index !== -1) {
            this.subs.splice(index, 1);
        }
    }
    // 通知订阅者更新
    notify() {
        this.subs.forEach(sub => {
            sub.update();
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
        someStr2:'<p>傻逼</p>'
    }
});

window.vm = vm;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const Compile = __webpack_require__(4)
const Observer = __webpack_require__(5)
const Watcher = __webpack_require__(0)



class MVVM {
    constructor(options) {
        this.$options = options || {};
        let data = this._data = this.$options.data;
        let self = this;

        
        Object.keys(data).forEach(key => {
            self._proxyData(key);
        })

        this._initComputed();
        new Observer(data, this);

        new Compile(options.el || document.body, this);
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

const Watcher = __webpack_require__(0)
let $elm;
let timer = null;
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
            // this.init();
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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const Dep = __webpack_require__(1)

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

/***/ })
/******/ ]);