# 总结归纳

##遍历数组
* (es6) Array.prototype.entries() -> 返回一个新的Array Iterator 对象
* Array.prototype.forEach() -> 遍历数组
> array.forEach(function(element, index, array){})
* Array.prototype.keys() -> 返回一个新的Array迭代器
> let iterator=[1,2,3,4].keys();
> iterator.next() => {value:1,done:false}

## 检测数组的值
* Array.prototype.every(callback(element, index, array)) -> 测试数组的所有元素是否都通过了指定函数的测试。
> array.every(function(element, index, array){});
* (es6) Array.prototype.includes(element,fromIndex) -> 判断一个数组是否包含一个指定的值。
* Array.prototype.some() -> 测试数组中的某元素是否通过由提供的函数实现的测试

## 查找数组里的值
* Array.prototype.find() -> 过滤数组返回数组中满足提供的测试函数的第一个元素的值。
* Array.prototype.findIndex() -> 过滤数组返回数组中满足提供的测试函数的第一个元素的值的索引。
* Array.prototype.indexOf() -> 返回在数组中可以找到一个给定元素的第一个索引。
* Array.prototype.lastIndexOf() -> 返回在数组中可以找到一个给定元素的最后一个索引。

## 改变数组里的值
* Array.prototype.fill() -> 改变数组里元素所有的值
* Array.prototype.map() -> 创建一个新的数组，结果是该数组中的每个元素都调用一个提供的函数后返回的结果。

## 添加或删除数组里的值
* Array.prototype.concat() -> 返回新的数组
> [1,2,3].concat([4,5,6]) => [1,2,3,4,5,6]
* (es6) Array.prototype.copyWithin() -> 复制数组的一部分到同一数组中的另一个位置， 并返回它，而不修改其大小。
* Array.prototype.filter() -> 过滤数组
> array.filter(function(element){})
* Array.prototype.pop() -> 删除最后一个元素，并返回该元素的值。
* Array.prototype.push() -> 添加一个或多个元素至数组的末尾，并且返回数组的新长度。
* Array.prototype.shift() -> 删除第一个元素，并且返回该元素的值。
* Array.prototype.splice() -> 删除或添加或替换一个数组的内容,返回被删除的元素组成的一个数组
> [1,2,3,4].splice(0,2,3,4)
* Array.prototype.unshift() -> 将一个或多个元素添加到数组的开头，并且返回新数组的长度。

## 数组的排序
* Array.prototype.reverse() -> 将数组中元素的位置颠倒。
* Array.prototype.sort() -> 数组的排序，默认排序顺序时工具字符串Unicode码。
> [1,2,3,4].sort(function(a,b){ return a-b; });

## 数组里的值的计算
* Array.prototype.reduce() -> 使用一个函数计算,其中第一个参数是上一次计算后的值。
> [100,1,2,3].reduce(function(a,b){return a-b}) => 100-1-2-3=96
* Array.prototype.reduceRight() -> 和reduce()的参数相反
> [100,1,2,3].reduceRight(function(a,b){return a-b}) => 3-2-1-100

## 数组转换
* Array.prototype.join() -> 将数组(或者类数组对象)的所有元素连接到一个字符串中。
> [1,2,3,4,5].join("-") => 1-2-3-4-5
* Array.prototype.toLocalString() -> 返回一个字符串表示数组中的元素。
* Array.from() -> 转换数组，Set，Map，String，Array-like等

## 复制数组
* Array.prototype.slice(beginIndex, endIndex) -> 复制数组.

# 题目
## 查找数组中最大的值
## 数组去重
