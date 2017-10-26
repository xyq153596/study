let babel = require('babel-core')
let path = require('path')
// let fs = require('fs')

// let code = fs.readFileSync('./test.js', 'utf-8');

let code = babel.transformFileSync(path.resolve(__dirname, './test.js'))
console.log("----code----", code.code)
console.log("----map----", code.map)
console.log("----ast----", code.ast)