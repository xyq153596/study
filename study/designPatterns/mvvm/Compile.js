const CompileUtil = require('./CompileUtil')
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