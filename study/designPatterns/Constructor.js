/**
 * Constructor 构造器模式
 */

function Car(model, year, miles) {
    this.model = model;
    this.year = year;
    this.miles = miles;
}
Car.prototype.toString = function () {
    return this.model + ' had done ' + this.miles + ' miles';
}

let ben = new Car('sb', 2012, 1000);
let ben2 = new Car('sb2', 2018, 10000);
console.log(ben.toString());
console.log(ben2.toString());