'use strict';
/**
 * eventbus
 * @description 事件订阅
 * @author mack wang
 * @website yurencloud.com
 * @from https://github.com/krasimir/EventBus
 */
var EventBus = {}

EventBus = function () {
    this.listeners = []
}

/**
 * 添加事件
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 */
EventBus.prototype.add = function (type, callback, scope) {
    var args = []
    var numOfArgs = arguments.length
    for (var i = 0; i < numOfArgs; i++) {
        args.push(arguments[i])
    }
    args = args.length > 3 ? args.splice(3, args.length - 1) : []
    if (typeof this.listeners[type] != "undefined") {
        this.listeners[type].push({scope: scope, callback: callback, args: args})
    } else {
        this.listeners[type] = [{scope: scope, callback: callback, args: args}]
    }
}

/**
 * 移除事件
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 */
EventBus.prototype.remove = function (type, callback, scope) {
    if (typeof this.listeners[type] != "undefined") {
        var numOfCallbacks = this.listeners[type].length
        var newArray = []
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = this.listeners[type][i]
            if (listener.scope == scope && listener.callback == callback) {

            } else {
                newArray.push(listener)
            }
        }
        this.listeners[type] = newArray
    }
}

/**
 * 判断事件是否存在
 * @param  {String} type [事件类型]
 * @param  {Function} callback [事件回调函数]
 * @param  {Function} scope [事件作用域]
 * @return {Boolean} exists [事件是否存在]
 */
EventBus.prototype.has = function (type, callback, scope) {
    if (typeof this.listeners[type] != "undefined") {
        var numOfCallbacks = this.listeners[type].length
        if (callback === undefined && scope === undefined) {
            return numOfCallbacks > 0
        }
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = this.listeners[type][i]
            if ((scope ? listener.scope == scope : true) && listener.callback == callback) {
                return true
            }
        }
    }
    return false
}

/**
 * 触发事件
 * @param  {String} type [事件类型]
 * @param  {Function} target [事件调用者]
 * @param  {String...} args [其他参数]
 */
EventBus.prototype.emit = function (type, target) {
    var event = {
        type: type,
        target: target
    }
    var args = []
    var numOfArgs = arguments.length
    for (var i = 0; i < numOfArgs; i++) {
        args.push(arguments[i])
    }
    args = args.length > 2 ? args.splice(2, args.length - 1) : []
    args = [event].concat(args)


    if (typeof this.listeners[type] != "undefined") {
        var listeners = this.listeners[type].slice()
        var numOfCallbacks = listeners.length
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = listeners[i]
            if (listener && listener.callback) {
                var concatArgs = args.concat(listener.args)
                listener.callback.apply(listener.scope, concatArgs)
            }
        }
    }
}

/**
 * 获取事件信息
 * @return [String] events [获取事件信息]
 */
EventBus.prototype.get = function () {
    var str = ""
    for (var type in this.listeners) {
        var numOfCallbacks = this.listeners[type].length
        for (var i = 0; i < numOfCallbacks; i++) {
            var listener = this.listeners[type][i]
            str += listener.scope && listener.scope.className ? listener.scope.className : "anonymous"
            str += " listen for '" + type + "'\n"
        }
    }
    return str
}

var eventBus = new EventBus()

module.exports = eventBus
