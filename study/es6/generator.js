function* test() {
    console.log(1);
    console.log(2);
    yield console.log(3);
    yield console.log(4);
    return false;
}
let i = test();
var s=[1,2,3,4,5];
