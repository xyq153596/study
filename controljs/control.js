class Control {
  constructor(source, tasks) {
    this.source = source;
    this.tasks = tasks;
  }

  _isArray(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  }
  /**
   * 把任务列队按排序值从大到小排序
   * @param {Array} tasks 
   */
  _order(tasks) {
    return tasks.sort((a, b) => {
      return b.order - a.order
    })
  }
  /**
   * 执行列队
   * 
   * @returns 
   * @memberof Control
   */
  run() {

    if (!this._isArray(this.tasks)) {
      throw new Error('任务列队必须是数组')
    }
    return new Promise((resolve, reject) => {
      let idx = 0;
      let _this = this;
      let _value = this.source;
      let tasks = this._order(this.tasks);

      function next(data) {
        if (idx < tasks.length) {
          if (!tasks[idx].install) {
            throw new Error('任务类必须有install方法')
          }
          if (tasks[idx].enable) {
            Promise.resolve(tasks[idx].install(data)).then(nextValue => {
              _value = nextValue;
              idx++;
              next(_value);
            });
          } else {
            idx++;
            next(_value);
          }

        } else {
          resolve(data);
        }
      }
      next(_value);
    })
  }
}

class Task {
  constructor(value, order, state) {
    this.value = value;
    this.order = order || 1;
    this.enable = typeof state === 'undefined' ? true : false;
  }
  install(newValue) {
    throw new Error('子类未实现该方法');
  }
}


class t0 extends Task {
  constructor(value, order) {
    super(value, order)
  }
  install(nextValue) {
    console.log('+' + this.value, '排序：' + this.order)
    return nextValue + this.value;
  }
}

class t1 extends Task {
  constructor(value, order) {
    super(value, 200)
  }
  install(nextValue) {
    console.log('-' + this.value, '排序：' + this.order)
    return nextValue - this.value;
  }
}

const test1 = new Control(5625, [new t0(200), new t1(100)]);
test1.run().then(res => {
  console.log('最终价格', res);
})

// const test2 = new Control(2000, [new t0(300), new t1(100)]);
// test2.run().then(res => {
//   console.log('最终价格', res);
// })