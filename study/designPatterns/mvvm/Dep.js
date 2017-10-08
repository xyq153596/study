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