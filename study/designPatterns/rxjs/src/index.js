const Rx = require('rxjs')

var observable = Rx.Observable.create(function subscribe(observer) {
  var id = setTimeout(() => {
    observer.next('hi')
  }, 1000);
  observer.next('hi11')
  observer.complete();
});

observable.subscribe(function (x) {
  console.log(x);
});