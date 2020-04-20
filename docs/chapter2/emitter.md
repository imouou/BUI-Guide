# 发布订阅

?> 订阅发布模式定义了一种一对多的依赖关系，让多个订阅者对象同时监听某一个主题对象。这个主题对象在自身状态变化时，会通知所有订阅者对象，使它们能够自动更新自己的状态。


## 全局订阅

```js
  // dom初始化完毕就可以执行
  bui.on("pagereadybefore",function(){
    
  })
  // 页面准备完毕后触发
  bui.on("pageready",function(){
    // 不管是web,还是native 最终都会触发 pageready 事件.
  })

```

## 路由订阅

?> 具体查看 [bui.router API](http://www.easybui.com/demo/api/classes/bui.router.html)
```js
  // 监听后退事件,只要触发了后退, 不管通过按钮触发,还是通过物理后退
  router.on("back",function(e){
    // 执行 
    // e.target 跳转后的页面
    // e.prevTarget 跳转前的页面
  })
  // 每次跳转完成以后执行
  router.on("complete", function(e) {
    // 执行 
    // e.target 跳转后的页面
    // e.prevTarget 跳转前的页面
  })
```

## 控件订阅

例子1: 用得最多的Tab选项卡.

```js
  // 初始化一个控件
  var tab = bui.tab({
    id: "#id"
  })

  // tab有多种切换选项卡的方式, 所以只能在这里监听, 比方点击可以切换, 滑动可以切换, 直接调用to也可以触发. 
  tab.on("to",function(){
    var index = this.index();
    console.log(index);
  })


```

例子2: 
```js
  // 初始化一个控件
  var dialog = bui.dialog({
    id: "#id"
  })

  // 监听打开事件, 对话框默认是隐藏的, 隐藏的dom,在zepto.js 里面是拿不到宽高的, 
  // 如果对话框里面有一些用到计算的地方, 应该监听该实例打开以后才做控件初始化或计算.
  dialog.on("open",function(){
    // 对话框打开后才执行
  })

  // 监听关闭事件
  dialog.on("close",function(){
    // 对话框关闭后执行
  })

```



## 自定义全局订阅

?> 自定义的命名应该避免跟默认已有的冲突, 必须在`trigger`触发前先进行注册
```js
  // 在页面监听
  bui.on("page-list-refresh",function(e){
    console.log(e)
    // 传过去的参数
  })
```
```js
  // 在页面监听
  bui.trigger("page-list-refresh","传过去的参数")
```

例子: 假如进入列表需要权限, 进入列表就通过 `bui.page` 插入了一个登录页, 登录页点击校验通过就要触发关闭, 我们知道可以通过 `bui.history.getPageDialog(module.id)` 来获取到对话框进行关闭操作, 这种是在登录页的处理. 还有一些业务类, 之间交互比较复杂, 登录页需要不断的`require`之前的模块进行操作, 我们可以尝试另外一种方式. 登录只做登录该做的事. 

列表页: pages/list/index.js
```js
var uipage = bui.page({
  url:"pages/login/index.html"
})

// 如果登录成功, 
bui.on("loginsuccess",function(user){
  // 关闭掉对话框
  uipage.close();

  // 并且在这个模块可以方便的拿到当前模块相关信息处理.
})

```

登录页: pages/login/index.js
```js

$("#login").click(function(){
  // 校验帐号密码
  var user = {
    name: "",
    password: ""
  };
  // 请求去校验帐号密码, 正确就返回true
  if( check(user) ){
    bui.ajax({
      url: "http://api/login",
      success: function(){
        // 告诉那些订阅过 loginsuccess 的操作, 可以执行了, 并把用户信息传了过去.
        bui.trigger("loginsuccess",user)
      }
    })
  }
})

```


## 局部发布订阅

?> 像上面这些, 都是 `bui.emitter` 的一个实例, 为了避免冲突, 我们可以利用模块的独立作用域, 也常用于插件扩展. 更多使用请查看 [bui.emitter API](http://www.easybui.com/demo/api/classes/bui.emitter.html)

### 初始化

列表模块: page/list/index.js
```js
loader.define(function(require,export,module){
    var emitter = bui.emitter();

    // 内部监听.
    emitter.on("clickid",function(){
        
    })

    $("#id").click(function(e){
      // 触发了click事件
      emitter.trigger("clickid",e);
    })

    return {emitter: emitter};
})
```

其它模块调用: page/detail/index.js

```js
loader.define(["page/list/index"], function(list,require,export,module){
  // detail模块监听了list模块的点击事件, 那边点击了就会触发, 必须比它先执行.
    list.emitter.on("clickid",function(){
        
    })
})
```

