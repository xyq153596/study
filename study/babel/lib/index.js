'use strict';

var babel = require('babel-core');

var generate = require('babel-generator');

var traverse = require('babel-traverse');

var type = require('babel-types');

var result = babel.transformFileSync('./main.js');
var index = 0;
traverse.default(result.ast, {
  Literal: function Literal(path) {
    if (path.node.value === 'ttt') {
      index++;
      path.parentPath.remove();
    }
  },
  CallExpression: function CallExpression(path) {
    if (path.scope.hasBinding("a")) {
      console.log('aaa被绑定了');
    }
  }
});

console.log('index:' + index);

console.log(generate.default(result.ast, {}));