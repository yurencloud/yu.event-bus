var eventBus = require('./src/index')

test('简单使用：创建事件，添加事件，触发事件测试', () => {
    var result = ""

    function say(event) {
        result = event.type;
    }

    eventBus.add("say", say);
    eventBus.emit("say");
    expect(result).toEqual("say");
})

test('指定事件作用域', () => {
    var result = ""
    var Event1 = function () {
        this.className = "Event3";
        this.callback = function (event) {
            result = this.className
        }
    };
    var Event2 = function () {
        this.className = "Event4";
        this.runOurEvent = function () {
            eventBus.emit("run", this);
        }
    };
    var t1 = new Event1();
    var t2 = new Event2();
    // 未指定作用域，this为undefined
    eventBus.add("run", t1.callback);
    t2.runOurEvent();
    expect(result).toBeUndefined();
    // 指定t1为作用域，所以结果为Event1
    eventBus.add("run", t1.callback, t1);
    t2.runOurEvent();
    expect(result).toEqual("Event3");
    // 指定t2为作用域，所以即使调用的是t1的callback，仍然是以t2为作用域，所以结果为Event2
    eventBus.add("run", t1.callback, t2);
    t2.runOurEvent();
    expect(result).toEqual("Event4");

})


test('给事件传递额外参数', () => {
    var result = ""
    var Event1 = function () {
        this.className = "Event5";
        this.callback = function (event, param1, param2) {
            console.log(event)
            result = this.className + param1 + param2
        }
    };
    var Event2 = function () {
        this.className = "Event6";
        this.runOurEvent = function () {
            eventBus.emit("run", this, "param1", "param2");
        }
    };
    var t1 = new Event1();
    var t2 = new Event2();
    // 指定t1为作用域，所以结果为Event1
    eventBus.add("run", t1.callback, t1);
    t2.runOurEvent();
    expect(result).toEqual("Event5param1param2");
    // 指定t2为作用域，所以即使调用的是t1的callback，仍然是以t2为作用域，所以结果为Event2
    eventBus.add("run", t1.callback, t2);
    t2.runOurEvent();
    expect(result).toEqual("Event6param1param2");

})


test('移除事件', () => {
    var result = 0

    function sing() {
        result++
    }

    eventBus.add('sing', sing);
    eventBus.emit('sing', sing);
    // 如果不移除，result就为2，移除后，result为1
    eventBus.remove('sing', sing);
    eventBus.emit('sing', sing);
    expect(result).toEqual(1);
})

test('判断事件是否存在', () => {
    function jump() {
        console.log('jump')
    }
    eventBus.add('jump', jump);
    expect(eventBus.has('jump')).toBeTruthy();
    expect(eventBus.has('jump', jump)).toBeTruthy();
    eventBus.remove('jump', jump);
    expect(eventBus.has('jump')).toBeFalsy();
})


test('打印当前所有的事件', () => {
    console.log(eventBus.listeners);
    console.log(eventBus.get());
    expect(eventBus.get()).toContain('anonymous listen for \'say\'');
    expect(eventBus.get()).toContain('Event3 listen for \'run\'');
})


