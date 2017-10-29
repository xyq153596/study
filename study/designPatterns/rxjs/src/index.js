const Rx = require('rxjs')

var observable = Rx.Observable.create(function subscribe(observer) {
  var id = setTimeout(function() {
    
  }, timeout);(() => {
    observer.next('hi')
  }, 1000);
});

observable.subscribe(function (x) {
  console.log(x);
});
