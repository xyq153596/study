const compile = require('./Compile')
const observer = require('./Observer')
const watcher = require('./Watcher')

class Mvvm {
    constructor() {
        this.a = 1;
    }
    test() {
        console.log(this.a);
    }
}

new observer();


module.exports = Mvvm;