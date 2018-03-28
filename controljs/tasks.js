class Tasks {
  constructor() {
    this.tasksQueue = [{
      name: 't1',
      orde: 1,
      handle(next) {
        console.log('加10')
        return next + 10;

      }
    }, {
      name: 't2',
      orde: 2,
      handle(next) {
        console.log('加20')
        return next + 20;
      }
    }]
  }



}