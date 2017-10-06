/**
 * 定义观察者列表
 */
function ObserverList() {
    this.observerList = [];
}
ObserverList.prototype = {
    add: function (obj) {
        return this.observerList.push(obj);
    },
    empty: function () {
        this.observerList = [];
    },
    count: function () {
        return this.observerList.length;
    },
    get: function (index) {
        return index ? this.observerList[index] : this.observerList;
    }
}

/**
 * 定义被观察者
 */
function Subject() {
    this.observers = new ObserverList();
}
Subject.prototype = {
    addObserver: function (observer) {
        this.observers.add(observer)
    },
    notify: function () {
        let count = this.observers.count();
        this.observers.get().forEach(function (observer) {
            observer.update();
        })
    }
}


function testObserver(a) {
    this.update = function () {
        console.log('我是观察者1')
    }
}

let subject = new Subject();
subject.addObserver(new testObserver());
subject.notify()