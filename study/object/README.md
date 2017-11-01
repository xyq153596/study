



* Object.getPrototyOf() -> 返回指定对象的原型。
* Object.prototype.toString() -> 返回一个对象的字符串表示。
* Object.prototype.toLocaleString() -> 返回一个该对象的字符串表示。
* Object.prototype.valueof() -> 返回指定对象的原始值。




# 总结归纳

## 对象的创建
* Object.assign() -> 复制新的对象到目标对象，返回目标对象
* Object.create() -> 使用指定的原型对象及其属性去创建一个新的对象。

## 对象的限制
* Object.freeze() -> 冻结一个对象。
* Object.seal() -> 密封一个对象，返回密封后的对象。
* Object.preventExtensions() -> 让一个对象变的不可扩展。

## 对象的判断
* Object.is() -> 判断两个值是否是相同的值。都是undefined,都是null,都是true或false，都是由相同个数的字符串按照相同的顺序组成的字符串，都是数字并且都是正零都是负零都是NaN。
* Object.isExtensible() -> 判断对象是否可以扩展。
* Object.isFrozen() -> 判断一个对象是否被冻结。
* Object.isSealed() -> 判断一个对象是否被密封。

## 对象属性的操作
* Object.defineProperties() -> 在一个对象上定义新的属性或修改现有属性， 并返回该对象。
* Object.defineProperty() -> 在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回这个对象。
* Object.entries() -> 返回一个给定对象自身可枚举属性的键值对数组。
* Object.getOwnPropertyDescriptor() -> 返回指定对象上一个自有属性对应的属性描述符。
* Object.getOwnPropertyDescriptors() -> 获取一个对象的所有自身属性的描述符。
* Object.getOwnPropertyNames() -> 返回一个由指定对象的所有自身属性的属性名组成的数组。(包括可枚举和不可枚举的属性)
* Object.getOwnPropertySymbols() -> 返回一个给定对象自身的所有Symbol属性的数组。
* Object.keys() -> 返回一个给定对象的自身可枚举属性组成的数组。(不包括不可枚举的属性)
* Object.values() -> 返回一个给定对象自己的所有可枚举属性值的数组。

## 对象属性的判断
* Object.prototype.hasOwnProperty() -> 对象是否具有指定的属性作为自身（不继承）属性
* Object.prototype.isPrototypeOf() -> 一个对象是否存在于另一个对象的原型链上。
* Object.prototype.propertyIsEnumerable() -> 表示指定的属性是否可以枚举。