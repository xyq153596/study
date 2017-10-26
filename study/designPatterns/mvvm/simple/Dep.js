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