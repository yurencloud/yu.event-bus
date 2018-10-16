## yu.eventbus 事件订阅

#### 安装
```
npm install --save yu.event-bus
```

#### 使用
```
var eventBus = require('yu.event-bus');

var result = 0

// 创建事件
function count(event) {
    result++;
}

// 添加事件到event bus
eventBus.add("count", count);

// 触发事件
eventBus.emit("count");

// 判断事件是否存在
eventBus.has("count");

// 移除事件
eventBus.remove("count");

// 获取所有事件
var allListeners = eventBus.listeners;

// 打印所有事件
console.log(eventBus.get())
```

#### 方法
```
/*
* 所有事件
* */
EventBus.listeners

/**
 * 添加事件
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 */
EventBus.prototype.add = function (type, callback, scope) {}

/**
 * 移除事件
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 */
EventBus.prototype.remove = function (type, callback, scope) {}

/**
 * 判断事件是否存在
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 * @return {Boolean} exists [事件是否存在]
 */
EventBus.prototype.has = function (type, callback, scope) {}

/**
 * 触发事件
 * @param  {String} type [事件类型]
 * @param  {Function} target [事件调用者]
 * @param  {String...} args [其他参数]
 */
EventBus.prototype.emit = function (type, target) {}

/**
 * 获取事件信息
 * @return [String] events [获取事件信息]
 */
EventBus.prototype.get = function () {}
```
