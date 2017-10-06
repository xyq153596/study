class Dep {
    constructor() {
        this.subs = []; //存放订阅者容器
    }
    addSub(sub) {
        this.subs.push(sub) //添加订阅者
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

module.exports = Dep;