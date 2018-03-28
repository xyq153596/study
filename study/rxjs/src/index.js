var source = Rx.Observable.from([1, 2, 3]);

// 在底层使用了 `subject.subscribe({...})`:
source.subscribe({
  next: (v) => console.log('observerA: ' + v)
});
source.subscribe({
  next: (v) => console.log('observerB: ' + v)
});