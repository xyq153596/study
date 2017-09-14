class Compile {
    constructor(el, vm) {
        this.$vm = vm;
        this.$el = this.isElementNode(el) ? el : document.querySelector(el);

        if (this.$el) {
            this.$fragment = this.nodeToFragment(this.$el);
            this.init();
            this.$el.appendChild(this.$fragment);
        }
    }
    init() {
        this.compileElement(this.$fragment);
    }
    nodeToFragment() {
        let fragment = document.createDocumentFragment();
        let child;
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }
        return fragment;
    }
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
    compileText(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    }
    isDirective(attr) {
        return attr.indexOf('v-') === 0
    }
    isEventDirective(dir) {
        return dir.indexOf('on') === 0
    }
    isTextNode(node) {
        return node.nodeType === 3;
    }
}