# 弹窗加载组件

?> 弹窗加载组件把路由跳转的页面直接插入到当前页, 是组件的第3种表现形式. `bui.dialog`做的事情是自定义内容提醒, `bui.page`做的事情除了加载模板,还执行了模块.


## 初始化

**自动加载**
```js
var uiPage = bui.page({
  url:"pages/login/login.html",
  param: {}
})
```

**手动加载**
```js
var uiPage = bui.page({
  url:"pages/login/login.html",
  param: {},
  autoload: false
})

$(".bui-page").click(function(){
  uiPage.open();
})
```

## 参数说明

重要的几个参数说明下, 具体可以查看 [bui.page API](http://www.easybui.com/demo/api/classes/bui.page.html)

- `url` [string] 跳转的地址, 可以是模块名;
- `param` [object] 跳转的传参 {};
- `close` [boolean] 是否需要关闭的图标, 默认 false | true;
- `autoload` [boolean] 自动执行 默认 true | false;
- `syncHistory` [boolean] 是否需要同步历史记录, 默认 false | true  (如果为true, bui.back会退到上一个页面, false则跳过上一个页面);
- `cache` [boolean] 默认 true(只执行一次) | false(每次打开都重新执行);
- `iframe` [boolean] 默认 false | true  是否以iframe 的形式打开, 适合加载远程地址;
- `effect` [boolean] 默认 "fadeInRight" 跟路由一样打开, 还有一些其它效果, 请查看 [bui.toggle API](http://www.easybui.com/demo/api/classes/bui.toggle.html);
- `beforeClose` [function] 关闭前执行回调;
- `closed` [function] 关闭后执行回调;
- `beforeOpen` [function] 打开前执行回调;
- `opened` [function] 打开后执行回调;
- `loaded` [function] 第一次加载后执行;

## 接收参数

在登录页内部如何获取参数呢? 

** bui.history.getParams **

**pages/login/login.js**
```js
loader.define(function(require,export,module){

  // 方法1: 如果不确定该组件会被哪种方式使用, 则可以使用这种方式获取.
  var params = bui.history.getParams(module.id);

  // 方法2: 获取以bui.page({url:"",param:{}}) 加载的的参数, 通过以下方式获取
  var pageParams = bui.history.getParams("page");
})
```


## 获取弹窗加载的实例

?> 获取到的是加载的登录页 login.js 抛出来的实例.

** bui.history.getPage **

```js
// 可以拿到login实例抛出的方法
var login =  bui.history.getPage("pages/login/login");
// login 等于 login.js 抛出的form对象 { init:function(){} }
```

**pages/login/login.js**
```js
loader.define(function(require,export,module){
  var form = {
    init: function(){
      console.log("login init")
    }
  }
  // 执行
  form.init();
  return form;
})
```

## 获取弹窗的实例

?> 获取到的是外部`bui.page`创建的 `dialog`的实例. 等于 `uiPage` ;

**pages/login/login.js**
```js
loader.define(function(require,export,module){
  var form = {
    init: function(){
      // 内部可以拿到 module.id 来获取弹窗, 进行弹窗的操作.
      var dialog = bui.history.getPageDialog(module.id);
      // 关闭操作
          // dialog.close();
      
      console.log(dialog)
    }
  }
  // 执行
  form.init();
  return form;
})
```




