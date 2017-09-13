/**
 *  Promise.prototype.then()
 *  Promise.prototype.catch()
 *  Promise.prototype.done()
 *  Promise.all()
 *  Promise.race()
 *  Promise.resolve()
 *  Promise.reject()
 * 
 */

let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        let val = '123';
        resolve(val);
        reject(val + 'error');
    }, 2000)
})
promise.then((val) => {
    console.log(val);
}, (val) => {
    console.log(val)
})

function sleep(timeout = 0, now = false) {
    console.log(timeout / 1000, 's 后执行');
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            if (Math.random() > 0.5) {
                resolve()
            } else {
                reject('错了')
            }
        }, timeout);
    })
}

sleep(500).then(function () {
    console.log(123123);
}).catch((err) => {
    console.log(err)
})


/*  */
let p_all = Promise.all([1, 2, 3, 4, 5].map(function (val) {
    return new Promise((resolve, reject) => {

        resolve(val + 1);


    })
}))

p_all.then(val => {
    console.log(val)
})


/**
 * thenable对象,promise.resolve转换后直接执行thenable的then方法
 */
let thenable = {
    then(resolve, reject) {
        resolve('执行')
    }
}
Promise.resolve(thenable).then((val) => {
    console.log(val);
})

// 在末尾调用
Promise.prototype.done = (onFulfilled, onRejected) => {
    this.then(onFulfilled, onRejected).catch((reason) => {
        setTimeout(() => {
            throw reason
        }, 0)
    })
}

(async function t() {
    console.log(123123);

})().then(val => {
    console.log(val);
})