// let list = [1, 2, 3, 4, 5];
let list = {
    a: 1,
    b: 2,
    c: 3,
    [Symbol.iterator]: function () {
        let self = this;
        let index = 0;
        return {
            next: function () {
                return {
                    value: Object.values(self)[index++],
                    done: true
                }
            }
        }
    }
};

for (var i of list) {
    console.log(1)
    console.log(1, i);
}

let set = new Set([1, 2, 2, 3, 4, 5])
for (let i of set) {
    console.log(i);
}